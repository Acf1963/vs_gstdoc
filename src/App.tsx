import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import RequestTable from './components/RequestTable';
import EntityModal from './components/EntityModal';
import LoginForm from './components/LoginForm';
import ConnectionStatus from './components/ConnectionStatus';
import { RequestRecord, RequestStatus, Entity } from './types';
import { INITIAL_ENTITIES } from './constants';

const App: React.FC = () => {
  // Autenticação
  const [currentUser, setCurrentUser] = useState<Entity | null>(() => {
    const saved = sessionStorage.getItem('gestdoc_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Dados da Aplicação
  const [requests, setRequests] = useState<RequestRecord[]>(() => {
    const saved = localStorage.getItem('gestdoc_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [entities, setEntities] = useState<Entity[]>(() => {
    const saved = localStorage.getItem('gestdoc_entities');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Garantir que admin sempre exista
      if (!parsed.some((e: Entity) => e.name === 'admin' && e.type === 'usuarios')) {
        parsed.push({ id: 'u_admin_fixed', name: 'admin', pass: '000000', type: 'usuarios' });
      }
      return parsed;
    }
    return [...INITIAL_ENTITIES, { id: 'u_admin_fixed', name: 'admin', pass: '000000', type: 'usuarios' }];
  });

  const [showEntityModal, setShowEntityModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'requests' | 'reports'>('home');
  const excelRef = React.useRef<HTMLInputElement>(null);

  // Persistência
  useEffect(() => {
    localStorage.setItem('gestdoc_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('gestdoc_entities', JSON.stringify(entities));
  }, [entities]);

  const handleLogin = (user: Entity) => {
    setCurrentUser(user);
    sessionStorage.setItem('gestdoc_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair do sistema?")) {
      setCurrentUser(null);
      sessionStorage.removeItem('gestdoc_session');
    }
  };

  const addRequest = (newReq: Omit<RequestRecord, 'id' | 'dataAtual' | 'dias' | 'estado'>) => {
    const now = new Date();
    const start = new Date(newReq.dataInicio);
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const record: RequestRecord = {
      ...newReq,
      id: `req_${Date.now()}`,
      dataAtual: now.toISOString().split('T')[0],
      dias: diffDays,
      estado: newReq.localizacaoOrigem === newReq.localizacaoAtual ? RequestStatus.FINISHED : RequestStatus.IN_PROGRESS
    };
    
    setRequests((prev: RequestRecord[]) => [record, ...prev]);
  };

  const deleteRequest = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este registro?")) {
      setRequests((prev: RequestRecord[]) => prev.filter(r => r.id !== id));
    }
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setRequests((prev: RequestRecord[]) => prev.map(r => r.id === id ? { ...r, estado: status } : r));
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} entities={entities} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slateBg">
      <ConnectionStatus />
      
      <Header 
        onEntityClick={() => setShowEntityModal(true)} 
        onNavChange={setActiveTab}
        onImport={(file) => console.log('Import requested:', file)}
        onLogout={handleLogout}
        userName={currentUser.name}
      />
      
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            <Hero onActionClick={() => setActiveTab('requests')} />
            <div className="container mx-auto px-4 -mt-16 relative z-10 mb-12">
              <Dashboard requests={requests} />
              
              <div className="mt-12 glass-card p-8 rounded-3xl shadow-2xl border-t-8 border-navy overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                  <h2 className="text-2xl font-black text-navy uppercase tracking-tighter">Fluxo Documental Recente</h2>
                  <div className="flex items-center gap-3">
                    <input 
                      type="file" 
                      ref={excelRef} 
                      className="hidden" 
                      accept=".xlsx, .xls, .csv"
                      title="Importar arquivo Excel"
                      aria-label="Importar arquivo Excel"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) alert(`Iniciando mapeamento do arquivo: ${file.name}`);
                      }}
                    />
                    <button 
                      onClick={() => excelRef.current?.click()}
                      className="bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-xl font-black text-xs uppercase transition-all flex items-center gap-2 shadow-lg transform hover:scale-105 border border-white/10"
                    >
                      <i className="fas fa-file-import"></i> Mapear & Importar
                    </button>
                    <button 
                      onClick={() => setActiveTab('requests')}
                      className="bg-moss hover:bg-moss/90 text-white px-6 py-3 rounded-xl font-black text-xs uppercase transition-all flex items-center gap-2 shadow-lg transform hover:scale-105"
                    >
                      <i className="fas fa-plus"></i> Nova Solicitação
                    </button>
                  </div>
                </div>
                <RequestTable 
                  requests={requests} 
                  onDelete={deleteRequest} 
                  onStatusUpdate={updateRequestStatus}
                />
              </div>

              <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
                {[
                  { icon: 'fa-clock', title: 'Disponibilidade Total', text: 'Seus dados são salvos localmente e estão disponíveis offline.' },
                  { icon: 'fa-star', title: 'Serviço Premium', text: 'Tratamento especializado e suporte dedicado ao seu arquivo.' },
                  { icon: 'fa-shield-alt', title: 'Segurança Total', text: 'Criptografia de ponta e controle de acesso rigoroso.' }
                ].map((feature, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl text-center border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                    <div className="w-16 h-16 bg-moss rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                      <i className={`fas ${feature.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-white font-black text-xl mb-2 uppercase tracking-tighter">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.text}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="container mx-auto px-4 py-12 animate-fadeIn">
            <div className="glass-card p-10 rounded-[40px] max-w-7xl mx-auto shadow-2xl border-t-[12px] border-navy relative overflow-hidden">
              <div className="flex items-center justify-between mb-10 border-b pb-6">
                <h2 className="text-3xl font-black text-navy uppercase tracking-tighter">Solicitação de Arquivo</h2>
                <button onClick={() => setActiveTab('home')} className="bg-moss text-white px-6 py-3 rounded-full font-black text-xs uppercase flex items-center gap-3 shadow-xl hover:bg-moss/80 transition-all">
                  <i className="fas fa-arrow-left"></i> Voltar
                </button>
              </div>
              <RequestForm 
                onSubmit={(req) => { addRequest(req); setActiveTab('home'); }} 
                entities={entities} 
              />
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="container mx-auto px-4 py-12 animate-fadeIn">
             <div className="glass-card p-10 rounded-[40px] shadow-2xl">
                <h2 className="text-3xl font-black text-navy mb-10 border-b pb-6 uppercase tracking-tighter">Relatórios Gerenciais</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100">
                      <h3 className="font-black text-navy uppercase text-xs mb-10 tracking-widest">Estatísticas de Fluxo</h3>
                      <div className="h-64 flex items-end justify-around gap-6 px-4">
                        {(() => {
                          // Helper function to get the height class based on percentage
                          const getHeightClass = (count: number, total: number) => {
                            const percentage = total === 0 ? 0 : Math.round((count / total) * 100 / 5) * 5;
                            const clampedPercentage = Math.max(0, Math.min(100, percentage));
                            return `chart-h-${clampedPercentage}`;
                          };
                          
                          const inProgressCount = requests.filter(r => r.estado === RequestStatus.IN_PROGRESS).length;
                          const finishedCount = requests.filter(r => r.estado === RequestStatus.FINISHED).length;
                          const total = requests.length;
                          
                          return (
                            <>
                              <div className="group relative w-1/2 flex flex-col items-center">
                                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-[10px] px-2 py-1 rounded font-bold">
                                  {inProgressCount}
                                </div>
                                <div className={`w-full bg-moss rounded-t-xl transition-all duration-500 shadow-lg hover:brightness-110 chart-bar-base ${getHeightClass(inProgressCount, total)}`}></div>
                                <span className="text-[10px] font-black text-moss uppercase mt-4">Em Curso</span>
                              </div>
                              <div className="group relative w-1/2 flex flex-col items-center">
                                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-[10px] px-2 py-1 rounded font-bold">
                                  {finishedCount}
                                </div>
                                <div className={`w-full bg-navy rounded-t-xl transition-all duration-500 shadow-lg hover:brightness-110 chart-bar-base ${getHeightClass(finishedCount, total)}`}></div>
                                <span className="text-[10px] font-black text-navy uppercase mt-4">Finalizado</span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                   </div>
                   <div className="space-y-6">
                      <button className="w-full bg-navy text-white p-6 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-3 shadow-xl hover:bg-navy/90 transition-all">
                        <i className="fas fa-file-excel"></i> Exportar Base Completa (XLSX)
                      </button>
                      <button className="w-full bg-moss text-white p-6 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-3 shadow-xl hover:bg-moss/90 transition-all">
                        <i className="fab fa-whatsapp"></i> Alerta Geral WhatsApp
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>

      <footer className="bg-navy text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-moss p-2 rounded-lg"><i className="fas fa-file-invoice text-xl"></i></div>
              <h4 className="text-2xl font-black tracking-tighter">GESTDOC</h4>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">Plataforma profissional para gestão logística de arquivos físicos e digitais com suporte offline.</p>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-moss mb-6">Navegação</h5>
            <ul className="space-y-3 text-gray-400 text-sm font-bold">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-moss transition-colors uppercase">Início</button></li>
              <li><button onClick={() => setActiveTab('requests')} className="hover:text-moss transition-colors uppercase">Solicitações</button></li>
              <li><button onClick={() => setActiveTab('reports')} className="hover:text-moss transition-colors uppercase">Relatórios</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-moss mb-6">Suporte</h5>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li><i className="fas fa-envelope mr-3 text-moss"></i> suporte@gestdoc.ao</li>
              <li><i className="fas fa-phone mr-3 text-moss"></i> +244 923 000 000</li>
              <li><i className="fab fa-whatsapp mr-3 text-moss"></i> Atendimento 24/7</li>
            </ul>
          </div>
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-moss mb-6">Social</h5>
            <div className="flex gap-4">
              {[{icon: 'fa-linkedin-in', label: 'LinkedIn'}, {icon: 'fa-instagram', label: 'Instagram'}, {icon: 'fa-facebook-f', label: 'Facebook'}].map(social => (
                <a key={social.icon} href="#" className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-moss hover:rotate-12 transition-all shadow-lg border border-white/5" title={social.label} aria-label={social.label}>
                  <i className={`fab ${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 border-t border-white/5 mt-16 pt-8 text-center text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
          GESTDOC ARQUIVO INTELIGENTE &copy; {new Date().getFullYear()} - TODOS OS DIREITOS RESERVADOS
        </div>
      </footer>

      {showEntityModal && (
        <EntityModal 
          onClose={() => setShowEntityModal(false)} 
          entities={entities} 
          setEntities={setEntities}
        />
      )}
    </div>
  );
};

// Internal Helper Components
const RequestForm: React.FC<{ onSubmit: (req: Omit<RequestRecord, 'id' | 'dataAtual' | 'dias' | 'estado'>) => void; entities: Entity[] }> = ({ onSubmit, entities }) => {
  const [formData, setFormData] = useState({
    caixa: '',
    cliente: '',
    localizacaoOrigem: '',
    localizacaoAtual: '',
    sector: '',
    solicitante: '',
    tratamento: 'Preparação Z1',
    operador: '',
    dataInicio: new Date().toISOString().split('T')[0]
  });

  const sectors = entities.filter(e => e.type === 'sectores');
  const clients = entities.filter(e => e.type === 'clientes');
  const operators = entities.filter(e => e.type === 'operadores');
  const boxes = entities.filter(e => e.type === 'caixas');
  const locations = entities.filter(e => e.type === 'localizacoes');
  const treatments = entities.filter(e => e.type === 'tratamentos');
  
  const filteredSolicitants = React.useMemo(() => {
    const selectedSectorEntity = sectors.find(s => s.name === formData.sector);
    if (!selectedSectorEntity) return [];
    return entities.filter(e => e.type === 'solicitantes' && e.parentId === selectedSectorEntity.id);
  }, [formData.sector, entities]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label htmlFor="select-caixa" className="text-[10px] font-black text-navy uppercase ml-1">Caixa (Ref.)</label>
        <select 
          id="select-caixa"
          required
          value={formData.caixa}
          onChange={e => setFormData({...formData, caixa: e.target.value})}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2"
          title="Selecionar caixa de arquivo"
          aria-label="Caixa de arquivo"
        >
          <option value="">Selecione a Caixa</option>
          {boxes.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="select-cliente" className="text-[10px] font-black text-navy uppercase ml-1">Cliente / Empresa</label>
        <select 
          id="select-cliente"
          required
          value={formData.cliente}
          onChange={e => setFormData({...formData, cliente: e.target.value})}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2"
          title="Selecionar cliente ou empresa"
          aria-label="Cliente ou empresa"
        >
          <option value="">Selecione o Cliente</option>
          {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="select-sector" className="text-[10px] font-black text-navy uppercase ml-1">Sector Responsável</label>
        <select 
          id="select-sector"
          required
          value={formData.sector}
          onChange={e => setFormData({...formData, sector: e.target.value, solicitante: ''})}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2"
          title="Selecionar sector responsável"
          aria-label="Sector responsável"
        >
          <option value="">Selecione o Sector</option>
          {sectors.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="select-solicitante" className="text-[10px] font-black text-navy uppercase ml-1">Solicitante</label>
        <select 
          id="select-solicitante"
          required
          value={formData.solicitante}
          onChange={e => setFormData({...formData, solicitante: e.target.value})}
          disabled={!formData.sector}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2 disabled:bg-slate-100 disabled:cursor-not-allowed"
          title="Selecionar solicitante"
          aria-label="Solicitante"
        >
          <option value="">{formData.sector ? "Selecione o Solicitante" : "Selecione primeiro o Sector"}</option>
          {filteredSolicitants.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="select-tratamento" className="text-[10px] font-black text-navy uppercase ml-1">Tipo de Tratamento</label>
        <select 
          id="select-tratamento"
          value={formData.tratamento}
          onChange={e => setFormData({...formData, tratamento: e.target.value})}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2"
          title="Selecionar tipo de tratamento"
          aria-label="Tipo de tratamento"
        >
          <option value="">Selecione o Tratamento</option>
          {treatments.map(t => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
          {/* Fallback caso não existam cadastros */}
          {treatments.length === 0 && (
            ['Preparação Z1', 'Preparação Z2', 'Consulta Z1', 'Consulta Z2', 'Digitalização', 'Indexação', 'Expurgo'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))
          )}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="select-origem" className="text-[10px] font-black text-navy uppercase ml-1">L. Origem</label>
        <select 
          id="select-origem"
          value={formData.localizacaoOrigem}
          onChange={e => setFormData({...formData, localizacaoOrigem: e.target.value})}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2"
          title="Selecionar localização de origem"
          aria-label="Localização de origem"
        >
          <option value="">Selecione Origem</option>
          {locations.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="select-atual" className="text-[10px] font-black text-navy uppercase ml-1">L. Atual</label>
        <select 
          id="select-atual"
          value={formData.localizacaoAtual}
          onChange={e => setFormData({...formData, localizacaoAtual: e.target.value})}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2"
          title="Selecionar localização atual"
          aria-label="Localização atual"
        >
          <option value="">Selecione Destino</option>
          {locations.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="select-operador" className="text-[10px] font-black text-navy uppercase ml-1">Operador Responsável</label>
        <select 
          id="select-operador"
          value={formData.operador}
          onChange={e => setFormData({...formData, operador: e.target.value})}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2"
          title="Selecionar operador responsável"
          aria-label="Operador responsável"
        >
          <option value="">Selecione o Operador</option>
          {operators.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="input-data-inicio" className="text-[10px] font-black text-navy uppercase ml-1">Data de Início</label>
        <input 
          id="input-data-inicio"
          type="date" 
          value={formData.dataInicio}
          onChange={e => setFormData({...formData, dataInicio: e.target.value})}
          className="w-full p-4 rounded-2xl font-bold text-lg border-2"
          title="Selecionar data de início"
          aria-label="Data de início"
        />
      </div>
      <div className="lg:col-span-3 pt-6">
        <button type="submit" className="w-full bg-navy text-white p-6 rounded-3xl font-black text-xl hover:bg-navy/90 transition-all shadow-2xl uppercase tracking-widest">
          Registrar Movimentação
        </button>
      </div>
    </form>
  );
};

export default App;