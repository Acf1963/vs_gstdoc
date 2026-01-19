import { EntityType } from "./EntityModal.types";

interface HeaderProps {
  openModalFor: (type: EntityType) => void;
}

export default function Header({ openModalFor }: HeaderProps) {
  return (
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

          <a href="/" className="hover:text-moss transition">Início</a>
          <a href="/solicitacao" className="hover:text-moss transition">Solicitação</a>
          <a href="/relatorios" className="hover:text-moss transition">Relatórios</a>

          {/* DROPDOWN DE CADASTROS */}
          <div className="relative group">
            <button className="hover:text-moss transition flex items-center gap-2">
              Cadastros
              <i className="fas fa-chevron-down text-xs"></i>
            </button>

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
  );
}
