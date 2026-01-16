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
      <header className="w-full bg-navy text-white py-4 shadow-lg">
        <nav className="max-w-6xl mx-auto flex items-center justify-center gap-6 text-sm font-bold uppercase tracking-wide">

          <button onClick={() => openModalFor("caixas")} className="hover:text-moss transition">
            Caixas
          </button>

          <button onClick={() => openModalFor("clientes")} className="hover:text-moss transition">
            Clientes
          </button>

          <button onClick={() => openModalFor("sectores")} className="hover:text-moss transition">
            Sectores
          </button>

          <button onClick={() => openModalFor("solicitantes")} className="hover:text-moss transition">
            Solicitantes
          </button>

          <button onClick={() => openModalFor("operadores")} className="hover:text-moss transition">
            Operadores
          </button>

          <button onClick={() => openModalFor("armazens")} className="hover:text-moss transition">
            Armazéns
          </button>

          <button onClick={() => openModalFor("usuarios")} className="hover:text-moss transition">
            Usuários
          </button>

          <button onClick={() => openModalFor("tratamentos")} className="hover:text-moss transition">
            Tratamentos
          </button>

        </nav>
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
