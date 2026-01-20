import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./routes/Dashboard";
import Documentos from "./routes/Documentos";
import NovaSolicitacao from "./routes/NovaSolicitacao";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/nova" element={<NovaSolicitacao />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
