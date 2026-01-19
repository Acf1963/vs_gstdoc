type Props = {
  titulo: string;
  valor: number;
  icone?: React.ReactNode;
  cor?: string;
};

const CardResumo = ({ titulo, valor, icone, cor = "bg-blue-900" }: Props) => (
  <div className={`p-4 rounded shadow text-white ${cor} flex items-center justify-between`}>
    <div>
      <h3 className="text-sm">{titulo}</h3>
      <p className="text-2xl font-bold">{valor}</p>
    </div>
    {icone && <div className="text-3xl">{icone}</div>}
  </div>
);

export default CardResumo;
