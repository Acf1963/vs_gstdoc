interface CardResumoProps {
  titulo: string;
  valor: number | string;
  cor?: string;
}

export function CardResumo({
  titulo,
  valor,
  cor = "bg-gray-200",
}: CardResumoProps) {
  return (
    <div className={`rounded-lg shadow-md p-4 text-white ${cor}`}>
      <h3 className="text-sm font-semibold opacity-90">{titulo}</h3>
      <p className="text-3xl font-bold mt-1">{valor}</p>
    </div>
  );
}
