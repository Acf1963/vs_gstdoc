type Props = {
  status: "PENDENTE" | "APROVADO" | "ARQUIVADO";
};

const cores = {
  PENDENTE: "bg-yellow-500",
  APROVADO: "bg-green-600",
  ARQUIVADO: "bg-gray-500",
};

const StatusBadge = ({ status }: Props) => (
  <span className={`px-3 py-1 text-white rounded ${cores[status]}`}>
    {status}
  </span>
);

export default StatusBadge;
