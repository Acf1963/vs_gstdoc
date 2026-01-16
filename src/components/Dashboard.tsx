import React from 'react';
import { RequestRecord, RequestStatus } from '../types';

interface DashboardProps {
  requests: RequestRecord[];
}

// Map color classes to their corresponding stat-card CSS classes
const colorToStatClass: Record<string, string> = {
  'bg-navy': 'stat-card-navy',
  'bg-moss': 'stat-card-moss',
  'bg-amber-600': 'stat-card-amber',
  'bg-green-600': 'stat-card-green',
  'bg-blue-500': 'stat-card-blue',
  'bg-purple-600': 'stat-card-purple',
  'bg-cyan-600': 'stat-card-cyan',
  'bg-red-600': 'stat-card-red',
};

const Dashboard: React.FC<DashboardProps> = ({ requests }) => {
  const totalDays = requests.reduce((acc, curr) => acc + curr.dias, 0);
  const avgDaysNum = requests.length > 0 ? totalDays / requests.length : 0;
  const avgDays = avgDaysNum.toFixed(1);

  const alertedRequests = requests.filter(r => r.dias > avgDaysNum);
  const alertCount = alertedRequests.length;

  const stats = [
    { 
      label: 'Solicitações Totais', 
      value: requests.length, 
      icon: 'fa-list-check', 
      color: 'bg-navy', 
      detail: 'Volume geral' 
    },
    { 
      label: 'Em Tratamento', 
      value: requests.filter(r => r.estado === RequestStatus.IN_PROGRESS).length, 
      icon: 'fa-sync-alt', 
      color: 'bg-moss', 
      detail: 'Ações em curso' 
    },
    { 
      label: 'Tempo Médio', 
      value: `${avgDays}d`, 
      icon: 'fa-hourglass-half', 
      color: 'bg-amber-600', 
      detail: 'Média de dias' 
    },
    { 
      label: 'Alertas Críticos', 
      value: alertCount, 
      icon: 'fa-triangle-exclamation', 
      color: 'bg-red-600', 
      detail: `Acima de ${avgDays}d` 
    },
    { 
      label: 'Finalizado', 
      value: requests.filter(r => r.estado === RequestStatus.FINISHED).length, 
      icon: 'fa-check-double', 
      color: 'bg-green-600', 
      detail: 'Concluídos' 
    },
    { 
      label: 'Consulta', 
      value: requests.filter(r => r.tratamento.toLowerCase().includes('consulta')).length, 
      icon: 'fa-search', 
      color: 'bg-blue-500', 
      detail: 'Arquivos em consulta' 
    },
    { 
      label: 'Indexação', 
      value: requests.filter(r => 
        r.tratamento.toLowerCase().includes('indexação') || 
        r.tratamento.toLowerCase().includes('indexacao')
      ).length, 
      icon: 'fa-folder-tree', 
      color: 'bg-purple-600', 
      detail: 'Catalogação' 
    },
    { 
      label: 'Digitalização', 
      value: requests.filter(r => 
        r.tratamento.toLowerCase().includes('digitalização') || 
        r.tratamento.toLowerCase().includes('digitalizacao')
      ).length, 
      icon: 'fa-file-pdf', 
      color: 'bg-cyan-600', 
      detail: 'Documentos capturados' 
    }
  ];

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="region"
      aria-label="Painel de estatísticas do sistema"
    >
      {stats.map((stat, idx) => (
        <div 
          key={idx}
          role="group"
          aria-label={`${stat.label}: ${stat.value}`}
          tabIndex={0}
          className={`glass-card p-6 rounded-2xl shadow-xl flex items-center gap-6 group hover:-translate-y-1 transition-all border-l-8 focus:outline-none focus:ring-4 focus:ring-moss/40 ${colorToStatClass[stat.color] || ''}`}
        >
          <div 
            className={`w-16 h-16 shrink-0 ${stat.color} text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 transition-transform`}
          >
            <i className={`fas ${stat.icon}`} aria-hidden="true"></i>
          </div>

          <div className="text-left">
            <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
              {stat.label}
            </div>

            <div className="text-4xl font-black text-navy leading-none">
              {stat.value}
            </div>

            <div className="text-xs text-gray-400 mt-2 font-medium">
              {stat.detail}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
