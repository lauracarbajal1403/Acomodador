
import React, { useState, useMemo, useEffect } from 'react';
import { 
  DASHBOARD_STATS, 
  WORKLOAD_DATA, 
  OLD_TASKS, 
  URGENT_TASKS, 
  HIGH_PRIORITY_TASKS 
} from './constants';
import { Priority, Task, MemberWorkload } from '../types';

// --- Sub-components ---

const PriorityBadge: React.FC<{ type: Priority; count: number }> = ({ type, count }) => {
  if (count === 0) return null;
  const colors = {
    URGENTE: 'bg-rose-500/20 text-rose-500 border-rose-500/50',
    ALTA: 'bg-orange-500/20 text-orange-500 border-orange-500/50',
    MEDIA: 'bg-cyan-500/20 text-cyan-500 border-cyan-500/50',
    BAJA: 'bg-violet-500/20 text-violet-500 border-violet-500/50'
  };
  return (
    <div className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colors[type]}`}>
      {count} {type}
    </div>
  );
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6 group"
  >
    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
    <span className="text-sm font-semibold uppercase tracking-wider">Regresar</span>
  </button>
);

const SearchBar: React.FC<{ value: string; onChange: (v: string) => void; placeholder: string }> = ({ value, onChange, placeholder }) => (
  <div className="relative group flex-grow">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-4 w-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full pl-10 pr-3 py-2 border border-gray-800 rounded-xl bg-[#22272e] text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
      placeholder={placeholder}
    />
  </div>
);

const AssigneeSelector: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <select 
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-[#22272e] border border-gray-800 text-[10px] font-bold uppercase text-gray-300 rounded-lg px-3 py-2 outline-none hover:border-gray-600 transition-colors shrink-0"
  >
    <option value="all">Todos los Colaboradores</option>
    {WORKLOAD_DATA.map(m => (
      <option key={m.name} value={m.name}>{m.name}</option>
    ))}
  </select>
);

// --- View: Home ---

const Home: React.FC<{ onNavigate: (view: 'dashboard' | 'improvements' | 'classify') => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <button 
          onClick={() => onNavigate('improvements')}
          className="aspect-square bg-transparent border-2 border-gray-800 rounded-[40px] flex items-center justify-center p-8 hover:scale-105 transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_40px_rgba(0,150,255,0.4)] group"
        >
          <span className="text-white text-3xl md:text-4xl font-bold text-center leading-tight group-hover:text-blue-300 transition-colors">
            Mejoras<br />Nommy
          </span>
        </button>
        <button 
          onClick={() => onNavigate('dashboard')}
          className="aspect-square bg-transparent border-2 border-gray-800 rounded-[40px] flex items-center justify-center p-8 hover:scale-105 transition-all duration-300 hover:border-green-400 hover:shadow-[0_0_40px_rgba(100,255,100,0.4)] group"
        >
          <span className="text-white text-3xl md:text-4xl font-bold text-center leading-tight group-hover:text-green-300 transition-colors">
            Actividades<br />del ciclo
          </span>
        </button>
        <button 
          onClick={() => onNavigate('classify')}
          className="aspect-square bg-transparent border-2 border-gray-800 rounded-[40px] flex items-center justify-center p-8 hover:scale-105 transition-all duration-300 hover:border-pink-400 hover:shadow-[0_0_40px_rgba(255,100,200,0.4)] group"
        >
          <span className="text-white text-3xl md:text-4xl font-bold text-center leading-tight group-hover:text-pink-300 transition-colors">
            Clasificar<br />tareas
          </span>
        </button>
      </div>
    </div>
  );
};

// --- View: Nommy Improvements ---

const NommyImprovements: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const improvements = [
    { title: "Rotación de horarios", desc: "Modificar el cómo funciona la rotación de horarios para que se asigne de manera automática.", status: "Planeación", color: "text-cyan-400" },
    { title: "Conectar puestos y reclutamiento", desc: "Nommy te permite elegir un puesto que tienes registrado en la plataforma para contratar a un empleado para ese puesto", status: "Planeación", color: "text-cyan-400" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-[1200px] mx-auto">
      <BackButton onClick={onBack} />
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Mejoras Nommy
        </h1>
        <p className="text-gray-400 mt-2">Futuras implementaciones y roadmap tecnológico</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {improvements.map((item, i) => (
          <div key={i} className="bg-[#1c2128] p-8 rounded-3xl border border-gray-800/50 hover:border-purple-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{item.title}</h3>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-gray-800 rounded-lg ${item.color}`}>
                {item.status}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- View: Cycle Dashboard ---

type SortMode = 'total' | 'urgent' | 'alpha';
type PriorityFilter = 'all' | Priority;

const CycleDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sortBy, setSortBy] = useState<SortMode>('total');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [urgentSearch, setUrgentSearch] = useState('');
  const [highPrioritySearch, setHighPrioritySearch] = useState('');
  const [urgentAssignee, setUrgentAssignee] = useState('all');
  const [highPriorityAssignee, setHighPriorityAssignee] = useState('all');

  const filteredAndSortedWorkload = useMemo(() => {
    let list = [...WORKLOAD_DATA];

    if (priorityFilter !== 'all') {
      list = list.filter(m => m.breakdown[priorityFilter] > 0);
    }

    list.sort((a, b) => {
      if (sortBy === 'total') return b.totalTasks - a.totalTasks;
      if (sortBy === 'urgent') return b.breakdown.URGENTE - a.breakdown.URGENTE;
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [sortBy, priorityFilter]);

  const filteredUrgentTasks = useMemo(() => {
    let list = URGENT_TASKS;
    
    if (urgentAssignee !== 'all') {
      list = list.filter(t => t.assignee === urgentAssignee);
    }

    if (urgentSearch) {
      const lowerSearch = urgentSearch.toLowerCase();
      list = list.filter(t => 
        t.title.toLowerCase().includes(lowerSearch) || 
        t.assignee.toLowerCase().includes(lowerSearch) ||
        t.id.toString().includes(lowerSearch)
      );
    }
    
    return list;
  }, [urgentSearch, urgentAssignee]);

  const filteredHighPriorityTasks = useMemo(() => {
    let list = HIGH_PRIORITY_TASKS;

    if (highPriorityAssignee !== 'all') {
      list = list.filter(t => t.assignee === highPriorityAssignee);
    }

    if (highPrioritySearch) {
      const lowerSearch = highPrioritySearch.toLowerCase();
      list = list.filter(t => 
        t.title.toLowerCase().includes(lowerSearch) || 
        t.assignee.toLowerCase().includes(lowerSearch) ||
        t.id.toString().includes(lowerSearch)
      );
    }

    return list;
  }, [highPrioritySearch, highPriorityAssignee]);

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-10 max-w-[1600px] mx-auto overflow-x-hidden">
      <BackButton onClick={onBack} />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Ciclo 34
          </h1>
          <p className="text-gray-400 mt-2 font-medium">
            Dashboard Ejecutivo — Actualizado Febrero 2026
          </p>
        </div>
        <div className="flex space-x-12">
          <div className="text-right">
            <div className="text-4xl font-black text-cyan-400">{DASHBOARD_STATS.totalTasks}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Total Tareas</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-cyan-400">{DASHBOARD_STATS.inProgressPercent}%</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">En Progreso</div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1c2128] rounded-2xl p-8 border border-gray-800/50 shadow-xl border-t-2 border-t-cyan-400 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">Development</h3>
            <span className="bg-gray-800/80 text-[10px] px-2 py-1 rounded-full text-gray-300 font-bold">13 tareas</span>
          </div>
          <div className="text-5xl font-black mb-8">13</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2d333b]/40 p-4 rounded-xl text-center">
              <div className="text-[11px] font-bold text-emerald-400">Toño: 40%</div>
              <div className="text-[11px] font-bold text-emerald-400">Mau: 38%</div>
              <div className="text-[11px] font-bold text-emerald-400">Alan: 12%</div>
            </div>
            <div className="bg-[#2d333b]/40 p-4 rounded-xl text-center">
              <div className="text-xl font-bold text-cyan-400">{DASHBOARD_STATS.development.percentage}</div>
              <div className="text-[10px] text-gray-500 font-medium">del total</div>
            </div>
          </div>
        </div>

        <div className="bg-[#1c2128] rounded-2xl p-8 border border-gray-800/50 shadow-xl border-t-2 border-t-cyan-500 relative">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">In Progress</h3>
            <span className="bg-gray-800/80 text-[10px] px-2 py-1 rounded-full text-gray-300 font-bold">8 tareas</span>
          </div>
          <div className="text-5xl font-black mb-8">8</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2d333b]/40 p-4 rounded-xl text-center">
              <div className="text-xl font-bold text-cyan-400">{DASHBOARD_STATS.inProgress.membersCount}</div>
              <div className="text-[10px] text-gray-500 font-medium">Miembros</div>
            </div>
            <div className="bg-[#2d333b]/40 p-4 rounded-xl text-center">
              <div className="text-xl font-bold text-cyan-400">{DASHBOARD_STATS.inProgress.percentage}</div>
              <div className="text-[10px] text-gray-500 font-medium">del total</div>
            </div>
          </div>
        </div>

        <div className="bg-[#1c2128] rounded-2xl p-8 border border-gray-800/50 shadow-xl border-t-2 border-t-violet-500 relative">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">To do</h3>
            <span className="bg-gray-800/80 text-[10px] px-2 py-1 rounded-full text-gray-300 font-bold">77 tareas</span>
          </div>
          <div className="text-5xl font-black mb-8">77</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2d333b]/40 p-4 rounded-xl text-center">
              <div className="text-xl font-bold text-violet-400">6</div>
              <div className="text-[10px] text-gray-500 font-medium">Miembros</div>
            </div>
            <div className="bg-[#2d333b]/40 p-4 rounded-xl text-center">
              <div className="text-xl font-bold text-violet-400">{DASHBOARD_STATS.reviewBacklog.percentage}</div>
              <div className="text-[10px] text-gray-500 font-medium">del total</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-[#1c2128]/40 rounded-3xl p-8 border border-gray-800/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <h2 className="text-2xl font-bold">Carga de Trabajo</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-[#22272e] border border-gray-800 rounded-lg p-1 flex">
                <button 
                  onClick={() => setSortBy('total')} 
                  className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-colors ${sortBy === 'total' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Total
                </button>
                <button 
                  onClick={() => setSortBy('urgent')} 
                  className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-colors ${sortBy === 'urgent' ? 'bg-rose-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Urgentes
                </button>
                <button 
                  onClick={() => setSortBy('alpha')} 
                  className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-colors ${sortBy === 'alpha' ? 'bg-cyan-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  ABC
                </button>
              </div>

              <select 
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
                className="bg-[#22272e] border border-gray-800 text-[10px] font-bold uppercase text-gray-300 rounded-lg px-3 py-2 outline-none hover:border-gray-600 transition-colors"
              >
                <option value="all">Filtrar Estado</option>
                <option value="URGENTE">Urgente</option>
                <option value="ALTA">Alta</option>
                <option value="MEDIA">Media</option>
                <option value="BAJA">Baja</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredAndSortedWorkload.length > 0 ? (
              filteredAndSortedWorkload.map((member, idx) => (
                <div key={idx} className="bg-[#22272e] p-5 rounded-2xl border border-gray-800/50 flex flex-col md:flex-row md:items-center justify-between transition-all hover:bg-[#2d333b]/60 group">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-transform ${member.avatarColor}`}>
                      {member.initial}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{member.name}</h4>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-tight">{member.totalTasks} tareas totales</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <PriorityBadge type="URGENTE" count={member.breakdown.URGENTE} />
                    <PriorityBadge type="ALTA" count={member.breakdown.ALTA} />
                    <PriorityBadge type="MEDIA" count={member.breakdown.MEDIA} />
                    <PriorityBadge type="BAJA" count={member.breakdown.BAJA} />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-gray-500 font-medium">
                No se encontraron colaboradores con este criterio.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#1c2128]/40 rounded-3xl p-8 border border-gray-800/40">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              </div>
              <h2 className="text-2xl font-bold">Alertas Críticas</h2>
            </div>
            
            <div className="bg-[#22272e] p-6 rounded-3xl border-l-4 border-rose-500 border border-gray-800/50 space-y-6">
              <h4 className="text-rose-500 font-bold text-sm flex items-center">
                <span className="mr-2">🔥</span> Tareas Viejas (+30 días)
              </h4>
              <div className="space-y-6">
                {OLD_TASKS.map((alert, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-sm">{alert.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase">{alert.totalOld} tareas antiguas</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-rose-500/10 text-rose-500 border border-rose-500/30 text-[9px] font-black px-2 py-0.5 rounded-full">{alert.buckets['90d']} × +90d</span>
                      <span className="bg-orange-500/10 text-orange-500 border border-orange-500/30 text-[9px] font-black px-2 py-0.5 rounded-full">{alert.buckets['60-90d']} × 60-90d</span>
                      <span className="bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 text-[9px] font-black px-2 py-0.5 rounded-full">{alert.buckets['30-60d']} × 30-60d</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <h4 className="text-cyan-400 font-bold text-sm flex items-center">
                <span className="mr-2">📊</span> Distribución de Prioridades
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#22272e] border border-gray-800/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-rose-500">6</div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Urgentes</div>
                </div>
                <div className="bg-[#22272e] border border-gray-800/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-orange-500">15</div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Alta</div>
                </div>
                <div className="bg-[#22272e] border border-gray-800/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-cyan-500">21</div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Media</div>
                </div>
                <div className="bg-[#22272e] border border-gray-800/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-black text-violet-500">28</div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Baja</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
        {/* Urgent Tasks Section */}
        <div className="bg-[#1c2128]/40 rounded-3xl p-8 border border-gray-800/40">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
                 <span className="text-xl">🚨</span>
              </div>
              <h2 className="text-2xl font-bold">Tareas Urgentes</h2>
            </div>
            <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              {filteredUrgentTasks.length} resultados
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <SearchBar 
              value={urgentSearch} 
              onChange={setUrgentSearch} 
              placeholder="Buscar por título, ID o asignado..." 
            />
            <AssigneeSelector value={urgentAssignee} onChange={setUrgentAssignee} />
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredUrgentTasks.length > 0 ? (
              filteredUrgentTasks.map((task, idx) => (
                <div key={idx} className="bg-[#22272e] p-5 rounded-2xl border-l-4 border-rose-500 border border-gray-800/50 flex justify-between items-start group hover:bg-[#2d333b]/60 transition-colors">
                  <div className="space-y-2">
                    <h5 className="font-bold text-sm pr-4 line-clamp-2 group-hover:text-rose-400 transition-colors">{task.title}</h5>
                    <p className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">ID: {task.id} · {task.date}</p>
                  </div>
                  <span className="bg-[#2d333b] border border-gray-700 text-gray-300 text-[10px] font-bold px-3 py-1 rounded-md min-w-[60px] text-center shrink-0">
                    {task.assignee}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm italic">No se encontraron tareas urgentes.</div>
            )}
          </div>
        </div>

        {/* High Priority Tasks Section */}
        <div className="bg-[#1c2128]/40 rounded-3xl p-8 border border-gray-800/40">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                 <span className="text-xl">⚡</span>
              </div>
              <h2 className="text-2xl font-bold">Tareas Alta Prioridad</h2>
            </div>
            <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              {filteredHighPriorityTasks.length} resultados
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <SearchBar 
              value={highPrioritySearch} 
              onChange={setHighPrioritySearch} 
              placeholder="Buscar por título, ID o asignado..." 
            />
            <AssigneeSelector value={highPriorityAssignee} onChange={setHighPriorityAssignee} />
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredHighPriorityTasks.length > 0 ? (
              filteredHighPriorityTasks.map((task, idx) => (
                <div key={idx} className="bg-[#22272e] p-5 rounded-2xl border-l-4 border-cyan-400 border border-gray-800/50 flex justify-between items-start group hover:bg-[#2d333b]/60 transition-colors">
                  <div className="space-y-2">
                    <h5 className="font-bold text-sm pr-4 line-clamp-2 group-hover:text-cyan-400 transition-colors">{task.title}</h5>
                    <p className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">ID: {task.id} · {task.date}</p>
                  </div>
                  <span className="bg-[#2d333b] border border-gray-700 text-gray-300 text-[10px] font-bold px-3 py-1 rounded-md min-w-[60px] text-center shrink-0">
                    {task.assignee}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500 text-sm italic">No se encontraron tareas de alta prioridad.</div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2d333b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444c56; }
      `}</style>
    </div>
  );
};


// --- View: Task Classifier ---
interface ClassifiedTask {
  id: string;
  description: string;
  torre: 'SOPORTE' | 'CLIENTES' | 'PRODUCTO';
  criticidad: 'P0' | 'P1' | 'P2' | 'P3';
  timestamp: number;
}

const CRITICIDAD_ORDER = { P0: 0, P1: 1, P2: 2, P3: 3 };

const TaskClassifier: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const [tasks, setTasks] = useState<ClassifiedTask[]>([]);
  const [selectedTorre, setSelectedTorre] = useState<'SOPORTE' | 'CLIENTES' | 'PRODUCTO' | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [criticidadFilter, setCriticidadFilter] = useState<'P0' | 'P1' | 'P2' | 'P3' | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleClassify = async () => {
    if (!input.trim() || isClassifying) return;
    setIsClassifying(true);
    try {
      const classifyRes = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: input }),
      });
      const result = await classifyRes.json();

      const newTask: ClassifiedTask = {
        id: Math.random().toString(36).substr(2, 9),
        description: input,
        torre: result.torre,
        criticidad: result.criticidad,
        timestamp: Date.now(),
      };

      const saveResponse = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (saveResponse.ok) {
        setTasks(prev => [newTask, ...prev]);
        setInput('');
      }
    } catch (error) {
      console.error("Error classifying task:", error);
      alert("Error al clasificar la tarea. Por favor intenta de nuevo.");
    } finally {
      setIsClassifying(false);
    }
  };

  const updateTaskCriticidad = async (taskId: string, newLevel: 'P0' | 'P1' | 'P2' | 'P3') => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ criticidad: newLevel }),
      });
      if (response.ok) {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, criticidad: newLevel } : t));
      }
    } catch (error) {
      console.error("Error updating criticidad:", error);
    }
  };

  const moveTask = async (taskId: string, newTorre: 'SOPORTE' | 'CLIENTES' | 'PRODUCTO') => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ torre: newTorre }),
      });
      if (response.ok) {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, torre: newTorre } : t));
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  const onDragStart = (taskId: string) => setDraggedTaskId(taskId);

  const onDrop = (newTorre: 'SOPORTE' | 'CLIENTES' | 'PRODUCTO') => {
    if (draggedTaskId) {
      moveTask(draggedTaskId, newTorre);
      setDraggedTaskId(null);
    }
  };

  const getFilteredSortedTasks = (torre: 'SOPORTE' | 'CLIENTES' | 'PRODUCTO') => {
    return tasks
      .filter(t => t.torre === torre)
      .filter(t => criticidadFilter === null || t.criticidad === criticidadFilter)
      .sort((a, b) => CRITICIDAD_ORDER[a.criticidad] - CRITICIDAD_ORDER[b.criticidad]);
  };

  const sections = [
    {
      id: 'SOPORTE' as const,
      title: "SOPORTE",
      categories: ["Clientes existentes", "Equipo interno"],
      types: ["Incidentes (caídas, errores)", "Ajustes de configuración", "Dudas técnicas"],
      highlight: false
    },
    {
      id: 'CLIENTES' as const,
      title: "CLIENTES",
      categories: ["Requerimientos Go-Live", "Operación inicial"],
      types: ["Cargas iniciales", "Parametrización", "Integración IMSS/IDSE/PAC"],
      highlight: false
    },
    {
      id: 'PRODUCTO' as const,
      title: "PRODUCTO",
      categories: ["Nuevos features", "Mejoras a módulos", "Cambios normativos"],
      types: ["Desarrollo + QA + release", "Refactors / performance"],
      highlight: true
    }
  ];

  const getCriticidadColor = (level: string) => {
    switch (level) {
      case 'P0': return 'text-rose-500 border-rose-500/30 bg-rose-500/10';
      case 'P1': return 'text-orange-500 border-orange-500/30 bg-orange-500/10';
      case 'P2': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10';
      case 'P3': return 'text-violet-400 border-violet-400/30 bg-violet-400/10';
      default: return 'text-gray-400 border-gray-800 bg-gray-900';
    }
  };

  const getCriticidadDot = (level: string) => {
    switch (level) {
      case 'P0': return 'bg-rose-500';
      case 'P1': return 'bg-orange-500';
      case 'P2': return 'bg-cyan-400';
      case 'P3': return 'bg-violet-400';
      default: return 'bg-gray-600';
    }
  };

  const TaskCard = ({ task }: { task: ClassifiedTask }) => (
    <div
      draggable
      onDragStart={() => onDragStart(task.id)}
      className="bg-[#161616] border border-gray-800/50 p-4 rounded-2xl group hover:border-gray-700 transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex space-x-1">
          {(['P0', 'P1', 'P2', 'P3'] as const).map(level => (
            <button
              key={level}
              onClick={(e) => { e.stopPropagation(); updateTaskCriticidad(task.id, level); }}
              className={`text-[8px] font-black px-1.5 py-0.5 rounded border transition-all ${
                task.criticidad === level
                  ? getCriticidadColor(level)
                  : 'text-gray-600 border-gray-800 hover:border-gray-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <span className="text-[9px] text-gray-600 font-mono">
          {new Date(task.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <p className="text-sm text-gray-300 leading-snug line-clamp-3 group-hover:text-white transition-colors">
        {task.description}
      </p>
    </div>
  );

  // Criticidad filter bar — shared across all towers
  const CriticidadFilterBar = () => (
    <div className="flex items-center gap-2">
      <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">Filtrar:</span>
      <div className="flex gap-1.5">
        {(['P0', 'P1', 'P2', 'P3'] as const).map(level => {
          const isActive = criticidadFilter === level;
          return (
            <button
              key={level}
              onClick={(e) => { e.stopPropagation(); setCriticidadFilter(isActive ? null : level); }}
              className={`text-[9px] font-black px-2.5 py-1 rounded-lg border transition-all duration-150 ${
                isActive
                  ? getCriticidadColor(level) + ' scale-105'
                  : 'text-gray-600 border-gray-800 hover:border-gray-600 hover:text-gray-400'
              }`}
            >
              {level}
            </button>
          );
        })}
        {criticidadFilter && (
          <button
            onClick={(e) => { e.stopPropagation(); setCriticidadFilter(null); }}
            className="text-[9px] font-black px-2 py-1 rounded-lg border border-gray-800 text-gray-600 hover:text-white hover:border-gray-600 transition-all"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black p-6 md:p-10 max-w-[1400px] mx-auto relative">
      <BackButton onClick={onBack} />

      <div className="mb-12 max-w-4xl mx-auto">
        <div className="bg-[#161616] border border-gray-800 rounded-3xl p-4 flex items-center shadow-2xl focus-within:border-cyan-500/50 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleClassify()}
            placeholder="Ingresa la descripción del problema..."
            className="flex-grow bg-transparent border-none outline-none text-gray-300 px-4 py-2 text-lg placeholder-gray-700"
            disabled={isClassifying}
          />
          <button
            onClick={handleClassify}
            disabled={isClassifying}
            className={`bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-wider text-sm flex items-center space-x-2 ${isClassifying ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isClassifying ? (
              <>
                <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Clasificando...</span>
              </>
            ) : (
              <span>Clasificar</span>
            )}
          </button>
        </div>
      </div>

      {/* Global filter bar */}
      <div className="mb-6 flex items-center justify-between max-w-4xl">
        <CriticidadFilterBar />
        {criticidadFilter && (
          <span className="text-[10px] text-gray-600 italic">
            Mostrando solo <span className={`font-black ${getCriticidadColor(criticidadFilter).split(' ')[0]}`}>{criticidadFilter}</span> en todas las torres
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section, i) => {
          const allSectionTasks = tasks.filter(t => t.torre === section.id);
          const filteredTasks = getFilteredSortedTasks(section.id);
          const isActive = selectedTorre === section.id;

          // Count by criticidad for the badge chips
          const counts = { P0: 0, P1: 0, P2: 0, P3: 0 };
          allSectionTasks.forEach(t => counts[t.criticidad]++);

          return (
            <div
              key={i}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(section.id)}
              onClick={() => setSelectedTorre(isActive ? null : section.id)}
              className={`bg-[#0a0a0a] p-10 rounded-[40px] border-2 transition-all duration-500 flex flex-col min-h-[500px] cursor-pointer group ${
                isActive
                  ? 'border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.2)] scale-[1.02]'
                  : section.highlight
                    ? 'border-gray-800 hover:border-cyan-400/50'
                    : 'border-gray-900 hover:border-gray-700'
              } ${draggedTaskId ? 'border-dashed border-gray-700' : ''}`}
            >
              <div className="flex items-center space-x-6 mb-6">
                <div className={`w-16 h-16 rounded-full bg-[#1a1a1a] flex flex-col items-center justify-center border transition-colors ${isActive ? 'border-cyan-400' : 'border-gray-800 group-hover:border-cyan-500/50'}`}>
                  <span className="text-xl font-black text-white leading-none">
                    {criticidadFilter ? filteredTasks.length : allSectionTasks.length}
                  </span>
                  <span className="text-[8px] font-bold text-gray-500 uppercase mt-1">Tareas</span>
                </div>
                <h2 className={`text-4xl font-black italic tracking-tighter uppercase transition-colors ${isActive ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'}`}>
                  {section.title}
                </h2>
              </div>

              {/* Criticidad mini-breakdown */}
              <div className="flex gap-1.5 mb-8" onClick={(e) => e.stopPropagation()}>
                {(['P0', 'P1', 'P2', 'P3'] as const).map(level => (
                  counts[level] > 0 && (
                    <button
                      key={level}
                      onClick={() => setCriticidadFilter(criticidadFilter === level ? null : level)}
                      className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-md border transition-all ${
                        criticidadFilter === level
                          ? getCriticidadColor(level)
                          : 'text-gray-600 border-gray-800 hover:border-gray-700 hover:text-gray-400'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${getCriticidadDot(level)}`} />
                      {level} <span className="opacity-70">·{counts[level]}</span>
                    </button>
                  )
                ))}
              </div>

              {/* Categories */}
              <div className="space-y-4 mb-10">
                {section.categories.map((cat, j) => (
                  <div key={j} className="flex items-center space-x-3">
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-cyan-400' : 'bg-white'}`} />
                    <span className="text-xl font-bold text-white">{cat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-900/50">
                <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4">
                  Tipos de tareas
                </h4>
                <div className="space-y-3">
                  {section.types.map((type, k) => (
                    <div key={k} className="flex items-start space-x-2 text-gray-400">
                      <span className="font-bold">-</span>
                      <span className="text-sm font-medium leading-tight">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-page Task List Section */}
      {selectedTorre && (
        <div className="mt-16 bg-[#0a0a0a] rounded-[40px] border-2 border-cyan-400/30 p-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex flex-col items-center justify-center border border-cyan-400/50">
                <span className="text-xl font-black text-white leading-none">
                  {getFilteredSortedTasks(selectedTorre).length}
                </span>
                <span className="text-[8px] font-bold text-gray-500 uppercase mt-1">Tareas</span>
              </div>
              <div>
                <h2 className="text-5xl font-black italic text-white tracking-tighter uppercase leading-none">
                  {selectedTorre}
                </h2>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Actividades Clasificadas</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div onClick={(e) => e.stopPropagation()}>
                <CriticidadFilterBar />
              </div>
              <button
                onClick={() => setSelectedTorre(null)}
                className="px-6 py-3 rounded-2xl bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition-all font-bold text-xs uppercase tracking-widest"
              >
                Cerrar Lista
              </button>
            </div>
          </div>

          {/* P0 first — group headers when no filter is active */}
          {criticidadFilter === null ? (
            <div className="space-y-8">
              {(['P0', 'P1', 'P2', 'P3'] as const).map(level => {
                const levelTasks = tasks
                  .filter(t => t.torre === selectedTorre && t.criticidad === level);
                if (levelTasks.length === 0) return null;
                return (
                  <div key={level}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-black px-3 py-1 rounded-lg border ${getCriticidadColor(level)}`}>
                        {level}
                      </span>
                      <div className="flex-1 h-px bg-gray-900" />
                      <span className="text-[10px] text-gray-700 font-bold">{levelTasks.length} tarea{levelTasks.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {levelTasks.map(task => <TaskCard key={task.id} task={task} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSortedTasks(selectedTorre).map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {getFilteredSortedTasks(selectedTorre).length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-900 rounded-[30px]">
                  <p className="text-gray-600 italic text-lg">No hay tareas con criticidad {criticidadFilter} en esta torre.</p>
                  <button
                    onClick={() => setCriticidadFilter(null)}
                    className="mt-4 text-gray-700 text-xs uppercase font-bold hover:text-gray-500 transition-colors"
                  >
                    Quitar filtro
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <span className="ml-4 text-[10px] text-white bg-[#0a0a0a] border border-gray-800 px-3 py-1 rounded-full">
              💡 Haz clic en una torre para ver sus tareas · Arrastra para mover entre torres
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App Entry ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'improvements' | 'classify'>('home');

  const navigateTo = (view: 'dashboard' | 'improvements' | 'classify') => setCurrentView(view);
  const goBack = () => setCurrentView('home');

  return (
    <div className="min-h-screen bg-black text-[#e6edf3]">
      {currentView === 'home' && <Home onNavigate={navigateTo} />}
      {currentView === 'dashboard' && <CycleDashboard onBack={goBack} />}
      {currentView === 'improvements' && <NommyImprovements onBack={goBack} />}
      {currentView === 'classify' && <TaskClassifier onBack={goBack} />}
    </div>
  );
};

export default App;
