import { useEffect, useState } from "react";
import CardResumo from "@components/CardResumo";
import { api } from "@services/api";


const Dashboard = () => {
  const [resumo, setResumo] = useState({
    solicitacoes: 0,
    documentos: 0,
    entregas: 0,
  });

  useEffect(() => {
    api.get("/dashboard").then((res) => setResumo(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardResumo titulo="Solicitações" valor={resumo.solicitacoes} cor="bg-indigo-600" />
      <CardResumo titulo="Documentos" valor={resumo.documentos} cor="bg-teal-600" />
      <CardResumo titulo="Entregas" valor={resumo.entregas} cor="bg-rose-600" />
    </div>
  );
};

export default Dashboard;
