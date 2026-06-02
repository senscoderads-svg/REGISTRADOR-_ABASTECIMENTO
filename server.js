const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:senha@localhost:5432/fleetfuel'
});

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_fleet_key';

// Middleware de Autenticação e Perfil
const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rotas de Autenticação
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  const user = result.rows[0];

  if (user && await bcrypt.compare(password, user.senha)) {
    const token = jwt.sign({ id: user.id, perfil: user.perfil }, JWT_SECRET);
    return res.json({ token, nome: user.nome, perfil: user.perfil });
  }
  res.status(401).json({ error: 'Credenciais inválidas' });
});

// Registrar Abastecimento com Validação e Alerta Automático
app.post('/api/abastecimentos', autenticarToken, async (req, res) => {
  const { veiculo_id, motorista_id, hodometro_inicial, hodometro_final, litros, frentista, preco_litro } = req.body;
  
  try {
    const query = `
      INSERT INTO abastecimentos (veiculo_id, motorista_id, hodometro_inicial, hodometro_final, litros, frentista, preco_litro)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [veiculo_id, motorista_id, hodometro_inicial, hodometro_final, litros, frentista, preco_litro];
    const result = await pool.query(query, values);
    const novoAbastecimento = result.rows[0];

    // Lógica interna para disparo de alerta de eficiência crítica (< 3.5 km/L)
    let alerta = null;
    if (novoAbastecimento.consumo_medio < 3.5) {
      alerta = `Alerta: Veículo ID ${veiculo_id} registrou consumo crítico de ${novoAbastecimento.consumo_medio} km/L.`;
    }

    res.status(201).json({ dados: novoAbastecimento, alerta });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint do Dashboard unificado
app.get('/api/dashboard', autenticarToken, async (req, res) => {
  const litrosMes = await pool.query("SELECT COALESCE(SUM(litros), 0) as total FROM abastecimentos WHERE data >= DATE_TRUNC('month', CURRENT_DATE)");
  const totalGasto = await pool.query("SELECT COALESCE(SUM(valor_total), 0) as total FROM abastecimentos WHERE data >= DATE_TRUNC('month', CURRENT_DATE)");
  const qtdAbastecimentos = await pool.query("SELECT COUNT(*) as total FROM abastecimentos WHERE data >= DATE_TRUNC('month', CURRENT_DATE)");
  const consumoMedio = await pool.query("SELECT COALESCE(AVG(consumo_medio), 0) as media FROM abastecimentos");
  
  const graficoConsumo = await pool.query(`
    SELECT v.placa, AVG(a.consumo_medio) as consumo 
    FROM abastecimentos a 
    JOIN veiculos v ON v.id = a.veiculo_id 
    GROUP BY v.placa LIMIT 5
  `);

  res.json({
    cards: {
      litros: litrosMes.rows[0].total,
      gasto: totalGasto.rows[0].total,
      qtd: qtdAbastecimentos.rows[0].total,
      consumo: consumoMedio.rows[0].media
    },
    grafico: graficoConsumo.rows
  });
});

app.listen(3001, () => console.log('Servidor FleetFuel rodando na porta 3001'));
