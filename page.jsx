"use html"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { LayoutDashboard, Fuel, ClipboardList, Truck, Users, BarChart3, ShieldAlert, Moon, Sun, Download, Plus } from 'lucide-react';

// Dados mockados sincronizados com a identidade da imagem enviada
const dadosGrafico = [
  { name: 'BRA-2E19', consumo: 3.8 },
  { name: 'CDE-3F25', status: 4.1 },
  { name: 'FGH-4G31', consumo: 3.2 },
  { name: 'IJK-5H37', consumo: 4.5 },
  { name: 'LMN-6I43', consumo: 3.9 },
];

export default function FleetDashboard() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${darkMode ? 'bg-[#0f1319] text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen flex font-sans transition-colors duration-300`}>
      
      {/* Menu Lateral Estilizado */}
      <aside className={`w-64 ${darkMode ? 'bg-[#161b22]' : 'bg-white'} border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'} p-5 flex flex-col gap-6`}>
        <div className="flex items-center gap-3 px-2">
          <div className="bg-orange-500 p-2 rounded-lg text-white font-bold text-xl">FF</div>
          <div>
            <h1 className="font-bold text-md tracking-wide">FleetFuel</h1>
            <p className="text-xs text-gray-500 uppercase font-semibold">Gestão de Frota</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 px-2">Principal</p>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-orange-500/10 text-orange-500 font-medium text-sm transition-all">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 font-medium text-sm transition-all">
            <Fuel size={18} /> Abastecimento
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 font-medium text-sm transition-all">
            <ClipboardList size={18} /> Listagem
          </a>

          <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-4 mb-2 px-2">Cadastros</p>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 font-medium text-sm transition-all">
            <Truck size={18} /> Veículos
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 font-medium text-sm transition-all">
            <Users size={18} /> Motoristas
          </a>

          <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-4 mb-2 px-2">Análise</p>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 font-medium text-sm transition-all">
            <BarChart3 size={18} /> Relatórios
          </a>
        </nav>

        <button onClick={() => setDarkMode(!darkMode)} className="flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all text-sm">
          {darkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} />} 
          {darkMode ? "Modo Claro" : "Modo Escuro"}
        </button>
      </aside>

      {/* Área Principal de Trabalho */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Topbar Dinâmico */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-sm text-gray-500">Junho 2025 • Transportadora FastCargo</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
              <Download size={16} /> Exportar
            </button>
            <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-orange-600/20">
              <Plus size={16} /> Novo Abastecimento
            </button>
          </div>
        </header>

        {/* Grid de Cards de Indicadores (Fidelidade ao Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className={`p-5 rounded-xl border ${darkMode ? 'bg-[#161b22] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-400">Total Abastecido (Mês)</span>
              <div className="bg-orange-500/10 text-orange-500 p-2 rounded-lg"><Fuel size={18} /></div>
            </div>
            <h3 className="text-2xl font-bold">8.420 L</h3>
            <span className="text-xs text-green-500 font-semibold mt-1 block">↑ +12% vs mês ant.</span>
          </div>

          <div className={`p-5 rounded-xl border ${darkMode ? 'bg-[#161b22] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-400">Valor Total Gasto</span>
              <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg"><span className="font-bold text-sm">$</span></div>
            </div>
            <h3 className="text-2xl font-bold">R$ 47.836</h3>
            <span className="text-xs text-green-500 font-semibold mt-1 block">↑ +8% vs mês ant.</span>
          </div>

          <div className={`p-5 rounded-xl border ${darkMode ? 'bg-[#161b22] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-400">Abastecimentos</span>
              <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-lg"><ClipboardList size={18} /></div>
            </div>
            <h3 className="text-2xl font-bold">143</h3>
            <span className="text-xs text-red-500 font-semibold mt-1 block">↓ -3% vs mês ant.</span>
          </div>

          <div className={`p-5 rounded-xl border ${darkMode ? 'bg-[#161b22] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-400">Consumo Médio Frota</span>
              <div className="bg-purple-500/10 text-purple-500 p-2 rounded-lg"><BarChart3 size={18} /></div>
            </div>
            <h3 className="text-2xl font-bold">3,8 km/L</h3>
            <span className="text-xs text-green-500 font-semibold mt-1 block">↑ +0.2 vs mês ant.</span>
          </div>
        </section>

        {/* Gráfico de Consumo */}
        <section className={`p-6 rounded-xl border ${darkMode ? 'bg-[#161b22] border-gray-800' : 'bg-white border-gray-200'} mb-8`}>
          <h4 className="text-md font-bold mb-6 text-gray-400">Consumo por Veículo (km/L)</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={[0, 5]} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="consumo" fill="#f97316" radius={[4, 4, 0, 0]} barSize={90} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Setor Inferior Bifurcado: Tabela de Últimos Lançamentos + Box de Alertas Rápidos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Tabela de Abastecimentos */}
          <div className={`lg:col-span-2 p-5 rounded-xl border ${darkMode ? 'bg-[#161b22] border-gray-800' : 'bg-white border-gray-200'}`}>
            <h4 className="text-md font-bold mb-4">Últimos Abastecimentos</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-3 px-2">Data</th>
                    <th className="py-3 px-2">Placa</th>
                    <th className="py-3 px-2">Motorista</th>
                    <th className="py-3 px-2">Litros</th>
                    <th className="py-3 px-2">Valor</th>
                    <th className="py-3 px-2">Consumo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  <tr>
                    <td className="py-3.5 px-2">15/06/25</td>
                    <td className="py-3.5 px-2 font-semibold">BRA-2E19</td>
                    <td className="py-3.5 px-2 text-gray-400">João Silva</td>
                    <td className="py-3.5 px-2">373 L</td>
                    <td className="py-3.5 px-2 text-orange-400 font-semibold">R$ 2.126,10</td>
                    <td className="py-3.5 px-2"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs font-semibold">3.8 km/L</span></td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-2">14/06/25</td>
                    <td className="py-3.5 px-2 font-semibold">CDE-3F25</td>
                                        <td className="py-3.5 px-2 text-gray-400">Pedro Oliveira</td>
                    <td className="py-3.5 px-2">391 L</td>
                    <td className="py-3.5 px-2 text-orange-400 font-semibold">R$ 2.251,71</td>
                    <td className="py-3.5 px-2"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs font-semibold">3.9 km/L</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Central Inteligente de Alertas */}
          <div className={`p-5 rounded-xl border ${darkMode ? 'bg-[#161b22] border-gray-800' : 'bg-white border-gray-200'}`}>
            <h4 className="text-md font-bold mb-4 flex items-center gap-2"><ShieldAlert size={18} className="text-amber-500" /> Alertas</h4>
            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
                ⚠️ <strong>FGH-4G31</strong> com consumo baixo observado (3.2 km/L).
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400">
                🔧 <strong>OPQ-7J51</strong> direcionado para manutenção preventiva.
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
