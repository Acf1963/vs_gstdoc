import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Solicitacao from "./pages/Solicitacao";
import Relatorios from "./pages/Relatorios";
import Cadastros from "./pages/Cadastros";

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/solicitacao", element: <Solicitacao /> },
  { path: "/relatorios", element: <Relatorios /> },
  { path: "/cadastros", element: <Cadastros /> },
]);
