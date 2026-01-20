import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

// Importa os ícones como assets
import homeIcon from "@/assets/icons/home.svg";
import docsIcon from "@/assets/icons/docs.svg";
import novaIcon from "@/assets/icons/nova.svg";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      
      {/* Sidebar */}
      <aside className="md:w-56 w-full bg-blue-900 text-white flex md:flex-col flex-row justify-around items-center py-4 px-2 gap-4 md:gap-6">
        <NavLink to="/" className="hover:text-blue-300">
          <img src={homeIcon} alt="Home" className="w-6 h-6 object-contain" />
        </NavLink>

        <NavLink to="/documentos" className="hover:text-blue-300">
          <img src={docsIcon} alt="Documentos" className="w-6 h-6 object-contain" />
        </NavLink>

        <NavLink to="/nova" className="hover:text-blue-300">
          <img src={novaIcon} alt="Nova Solicitação" className="w-6 h-6 object-contain" />
        </NavLink>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
