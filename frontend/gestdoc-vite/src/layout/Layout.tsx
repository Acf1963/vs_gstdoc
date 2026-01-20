import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="md:w-64 w-full bg-blue-900 text-white flex md:flex-col flex-row justify-around items-center p-4">
        <NavLink to="/" className="hover:text-blue-300">
          <img src="/icons/home.svg" alt="Home" className="w-6 h-6" />
        </NavLink>
        <NavLink to="/documentos" className="hover:text-blue-300">
          <img src="/icons/docs.svg" alt="Documentos" className="w-6 h-6" />
        </NavLink>
        <NavLink to="/nova" className="hover:text-blue-300">
          <img src="/icons/nova.svg" alt="Nova Solicitação" className="w-6 h-6" />
        </NavLink>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}
