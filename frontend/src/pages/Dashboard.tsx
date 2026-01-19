import MetricCard from "../components/MetricCard";
import DocumentFlow from "../components/DocumentFlow";

export default function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <MetricCard title="Solicitações Totais" value="0" subtitle="Visão geral" />
        <MetricCard title="Em Tratamento" value="0" subtitle="Ajustes em curso" />
        <MetricCard title="Tempo Médio" value="0.0d" subtitle="Média de dias" />
        <MetricCard title="Alertas Críticos" value="0" subtitle="Alerta de SLA" />
        <MetricCard title="Finalizado" value="0" subtitle="Concluídas" />
        <MetricCard title="Consulta" value="0" subtitle="Arquivos em consulta" />
        <MetricCard title="Indicação" value="0" subtitle="Catalogação" />
        <MetricCard title="Digitalização" value="0" subtitle="Documentos capturados" />
      </section>

      <div className="flex flex-col md:flex-row gap-4 mt-10">
        <button className="bg-moss text-white font-bold py-3 px-6 rounded-xl shadow hover:brightness-110 transition">
          <i className="fas fa-user-cog mr-2"></i>
          Mapear Arquivista
        </button>

        <button className="bg-navy text-white font-bold py-3 px-6 rounded-xl shadow hover:brightness-110 transition">
          <i className="fas fa-plus mr-2"></i>
          Nova Solicitação
        </button>
      </div>

      <DocumentFlow />
    </main>
  );
}

