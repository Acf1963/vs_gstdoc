import { useState } from "react";
import EntityModal from "./components/EntityModal";
import { Entity, EntityType } from "./components/EntityModal.types";

function App() {
  /* -------------------------------------------------------
     ESTADOS GLOBAIS
  ------------------------------------------------------- */

  // Lista de entidades (caixas, clientes, sectores, usuários, etc.)
  const [entities, setEntities] = useState<Entity[]>([]);

  // Controla se o modal está aberto
  const [showEntityModal, setShowEntityModal] = useState(false);

  // Tipo ativo (define qual entidade está a ser gerida)
  const [activeType, setActiveType] = useState<EntityType>("caixas");

  /* -------------------------------------------------------
     HANDLERS
  ------------------------------------------------------- */

  const openModalFor = (type: EntityType) => {
    setActiveType(type);
    setShowEntityModal(true);
  };

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-100">

      {/* -------------------------------------------------------
         MENU SUPERIOR
      ------------------------------------------------------- */}
      <header className="w-full bg-navy text-white shadow-xl border-b border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* LOGO */}
    <div className="flex items-center gap-3">
      <i className="fas fa-archive text-moss text-2xl"></i>
      <span className="text-xl font-black tracking-tight uppercase">
        Gestdoc
      </span>
    </div>

    {/* MENU SUPERIOR */}
    <nav className="flex items-center gap-8 text-sm font-bold uppercase tracking-wide">

      <button className="hover:text-moss transition">
        Início
      </button>

      <button className="hover:text-moss transition">
        Solicitação
      </button>

      <button className="hover:text-moss transition">
        Relatórios
      </button>

      {/* DROPDOWN DE CADASTROS */}
      <div className="relative group">
        <button className="hover:text-moss transition flex items-center gap-2">
          Cadastros
          <i className="fas fa-chevron-down text-xs"></i>
        </button>

        {/* MENU DROPDOWN */}
        <div className="absolute hidden group-hover:block bg-white text-navy shadow-xl rounded-xl border border-moss/30 mt-3 w-48 z-50">

          {[
            ["caixas", "Caixas"],
            ["clientes", "Clientes"],
            ["sectores", "Sectores"],
            ["solicitantes", "Solicitantes"],
            ["operadores", "Operadores"],
            ["armazens", "Armazéns"],
            ["usuarios", "Usuários"],
            ["tratamentos", "Tratamentos"],
          ].map(([type, label]) => (
            <button
              key={type}
              onClick={() => openModalFor(type as EntityType)}
              className="w-full text-left px-4 py-3 hover:bg-moss/10 transition"
            >
              {label}
            </button>
          ))}

        </div>
      </div>

    </nav>
  </div>
</header>

      {/* -------------------------------------------------------
         MODAL DE ENTIDADES
      ------------------------------------------------------- */}
      {showEntityModal && (
        <EntityModal
          open={showEntityModal}
          onClose={() => setShowEntityModal(false)}
          activeType={activeType}
          entities={entities}
          setEntities={setEntities}
        />
      )}

      {/* -------------------------------------------------------
         CONTEÚDO PRINCIPAL (placeholder)
      ------------------------------------------------------- */}
      <main className="max-w-6xl mx-auto p-8 text-center text-slate-600">
        <h1 className="text-3xl font-black text-navy mb-4">GESTDOC</h1>
        <p className="text-lg">Arquivo Inteligente — Gestão de Registos</p>
      </main>

    </div>
  );
}

export default App;
