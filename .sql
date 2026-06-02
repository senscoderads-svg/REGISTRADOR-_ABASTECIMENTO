-- Criar Enums para status e perfis
CREATE TYPE perfil_usuario AS ENUM ('Administrador', 'Operador');
CREATE TYPE status_motorista AS ENUM ('Ativo', 'Inativo');

-- Tabela de Usuários (Controle de Acesso)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil perfil_usuario DEFAULT 'Operador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Motoristas
CREATE TABLE motoristas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    status status_motorista DEFAULT 'Ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Veículos
CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(8) UNIQUE NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    capacidade_tanque INT NOT NULL,
    combustivel VARCHAR(30) DEFAULT 'Diesel S10',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Abastecimentos
CREATE TABLE abastecimentos (
    id SERIAL PRIMARY KEY,
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    veiculo_id INT REFERENCES veiculos(id) ON DELETE RESTRICT,
    motorista_id INT REFERENCES motoristas(id) ON DELETE RESTRICT,
    hodometro_inicial INT NOT NULL,
    hodometro_final INT NOT NULL,
    litros DECIMAL(10,2) NOT NULL,
    frentista VARCHAR(100),
    preco_litro DECIMAL(10,2) NOT NULL,
    valor_total DECIMAL(10,2) GENERATED ALWAYS AS (litros * preco_litro) STORED,
    quilometros_percorridos INT GENERATED ALWAYS AS (hodometro_final - hodometro_inicial) STORED,
    consumo_medio DECIMAL(10,2) GENERATED ALWAYS AS (
        CASE WHEN litros > 0 THEN (hodometro_final - hodometro_inicial) / litros ELSE 0 END
    ) STORED,
    comprovante_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
