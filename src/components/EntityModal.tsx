import React, { useState, useRef, useEffect } from 'react';
import { Entity, EntityType } from '../types';

interface EntityModalProps {
  onClose: () => void;
  entities: Entity[];
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
}

const EntityModal: React.FC<EntityModalProps> = ({ onClose, entities, setEntities }) => {
  const [activeType, setActiveType] = useState<EntityType | 'sistema'>('caixas');
  const [newName, setNewName] = useState('');
  const [newPass, setNewPass] = useState('');
  const [selectedParentId, setSelectedParentId] = useState('');

  const excelInputRef = useRef<HTMLInputElement | null>(null);
  const modalTitleId = 'entity-modal-title';

  const currentEntities = entities.filter((e) => e.type === activeType);

  useEffect(() => {
    setNewName('');
    setNewPass('');
    setSelectedParentId('');
  }, [activeType]);

  const handleAdd = () => {
    if (!newName.trim()) return;

    const newEntry: Entity = {
      id: `ent_${Date.now()}`,
      name: newName.trim(),
      type: activeType as EntityType,
      parentId: activeType === 'solicitantes' ? selectedParentId : undefined,
      pass: activeType === 'usuarios' ? newPass : undefined,
    };

    setEntities((prev) => [...prev, newEntry]);
    setNewName('');
    setNewPass('');
  };

  const handleResetDB = () => {
    if (window.confirm('ATENÇÃO: Esta ação apagará toda a base de dados permanentemente.')) {
      const admin = entities.find((e) => e.name === 'admin' && e.type === 'usuarios');
      setEntities(admin ? [admin] : []);
      localStorage.removeItem('gestdoc_requests');
      onClose();
      window.location.reload();
    }
  };

  const tabs = [
    { value: 'caixas', label: 'Caixas', icon: 'fa-box-archive' },
    { value: 'clientes', label: 'Clientes', icon: 'fa-users' },
    { value: 'localizacoes', label: 'Localização', icon: 'fa-map-location-dot' },
    { value: 'sectores', label: 'Sectores', icon: 'fa-sitemap' },
    { value: 'solicitantes', label: 'Solicitantes', icon: 'fa-id-badge' },
    { value: 'tratamentos', label: 'Tratamento', icon: 'fa-hand-sparkles' },
    { value: 'operadores', label: 'Operadores', icon: 'fa-user-cog' },
    { value: 'armazens', label: 'Armazéns', icon: 'fa-warehouse' },
    { value: 'usuarios', label: 'Usuários', icon: 'fa-user-lock' },
    { value: 'sistema', label: 'Sistema', icon: 'fa-desktop', color: 'text-red-500' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-navy/95 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Dialog */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl bg-white border border-white/20 animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
      >
        {/* HEADER */}
        <div className="bg-navy p-6 shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h2
              id={modalTitleId}
              className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tighter"
            >
              <i className="fas fa-database text-moss" aria-hidden="true"></i>
              Cadastros Base
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-red-500 flex items-center justify-center transition-all"
              aria-label="Fechar modal"
              title="Fechar"
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>

          {/* IMPORTAR EXCEL */}
          <button
            type="button"
            onClick={() => excelInputRef.current?.click()}
            className="w-full bg-moss text-white rounded-xl py-3 flex items-center justify-center gap-2 font-black text-xs uppercase shadow-lg hover:brightness-110 transition-all"
            aria-label="Importar ficheiro Excel"
            title="Importar Excel"
          >
            <i className="fas fa-file-excel" aria-hidden="true"></i>
            Importar Excel
          </button>

          <input
            type="file"
            ref={excelInputRef}
            className="hidden"
            accept=".xlsx,.xls"
            aria-label="Selecionar ficheiro Excel"
          />
        </div>

        {/* TABS */}
        <div className="flex bg-slate-100 border-b overflow-x-auto custom-scrollbar shrink-0" role="tablist">
          {tabs.map((tab) => {
            const isSelected = activeType === tab.value ? 'true' : 'false';

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveType(tab.value as EntityType | 'sistema')}
                className={`flex-1 min-w-[120px] py-4 text-[10px] font-black uppercase transition-all relative ${
                  activeType === tab.value ? 'bg-white text-navy' : 'text-slate-400 hover:text-navy'
                } ${tab.color || ''}`}
                role="tab"
                aria-label={tab.label}
                {...{ 'aria-selected': isSelected }}
              >
                <i className={`fas ${tab.icon} mr-2`} aria-hidden="true"></i>
                {tab.label}
                {activeType === tab.value && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-moss"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="flex-grow overflow-y-auto p-6 bg-white custom-scrollbar">
          {activeType === 'sistema' ? (
            <div className="space-y-8 py-4">
              {/* PWA */}
              <div className="bg-blue-50 border-2 border-blue-200 p-8 rounded-[32px] text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-desktop text-3xl" aria-hidden="true"></i>
                </div>

                <h3 className="text-xl font-black text-blue-700 uppercase mb-2">Modo PWA</h3>
                <p className="text-blue-600 font-medium text-xs mb-6">
                  Instale o Gestdoc no seu dispositivo para acesso rápido e offline.
                </p>

                <button
                  type="button"
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-lg"
                  aria-label="Instalar aplicativo Gestdoc"
                >
                  Instalar Aplicativo
                </button>
              </div>

              {/* ZONA DE PERIGO */}
              <div className="bg-red-50 border-2 border-red-200 p-8 rounded-[32px] text-center">
                <h3 className="text-2xl font-black text-red-700 uppercase mb-2">Zona de Perigo</h3>

                <button
                  type="button"
                  onClick={handleResetDB}
                  className="w-full bg-red-600 text-white p-6 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl hover:bg-red-700 transition-all"
                  aria-label="Zerar base de dados"
                  title="Zerar base de dados"
                >
                  Zerar Base de Dados
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* FORMULÁRIO */}
              <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
                {activeType === 'solicitantes' && (
                  <select
                    value={selectedParentId}
                    onChange={(e) => setSelectedParentId(e.target.value)}
                    className="w-full p-4 mb-4 rounded-2xl font-bold border-2"
                    aria-label="Selecionar setor vinculado"
                  >
                    <option value="">-- Vincular Setor --</option>
                    {entities
                      .filter((e) => e.type === 'sectores')
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                )}

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nome do registro..."
                    className="flex-grow p-4 rounded-2xl font-bold text-lg border-2 outline-none focus:border-moss"
                    aria-label="Nome do registro"
                  />

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-navy text-white px-8 py-4 rounded-2xl font-black text-xs uppercase"
                    aria-label="Salvar registro"
                    title="Salvar"
                  >
                    Salvar
                  </button>
                </div>

                {activeType === 'usuarios' && (
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Definir Palavra-passe..."
                    className="w-full p-4 mt-3 rounded-2xl font-bold text-lg border-2"
                    aria-label="Definir palavra-passe"
                  />
                )}
              </div>

              {/* LISTA */}
              <div className="space-y-3">
                {currentEntities.map((entity) => (
                  <div
                    key={entity.id}
                    className="flex items-center justify-between p-4 border-2 rounded-2xl bg-white shadow-sm"
                  >
                    <span className="font-bold text-navy uppercase text-sm">{entity.name}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setEntities((prev) => prev.filter((e) => e.id !== entity.id))
                      }
                      className="text-slate-300 hover:text-red-500 p-2"
                      aria-label={`Excluir registro ${entity.name}`}
                      title="Excluir registro"
                    >
                      <i className="fas fa-trash-alt" aria-hidden="true"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t bg-slate-50 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="bg-navy text-white px-20 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
            aria-label="Concluir e fechar modal"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntityModal;
