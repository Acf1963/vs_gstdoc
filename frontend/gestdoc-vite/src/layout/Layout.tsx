import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      
      {/* Sidebar */}
      <aside className="md:w-56 w-full bg-blue-900 text-white flex md:flex-col flex-row justify-around items-center py-4 px-2 gap-4 md:gap-6">
        <NavLink to="/" className="hover:text-blue-300">
          <img src="/icons/home.svg" alt="Home" className="w-5 h-5 md:w-6 md:h-6" />
        </NavLink>

        <NavLink to="/documentos" className="hover:text-blue-300">
          <img src="/icons/docs.svg" alt="Documentos" className="w-5 h-5 md:w-6 md:h-6" />
        </NavLink>

        <NavLink to="/nova" className="hover:text-blue-300">
          <img src="/icons/nova.svg" alt="Nova Solicitação" className="w-5 h-5 md:w-6 md:h-6" />
        </NavLink>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
