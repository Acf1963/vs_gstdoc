interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export default function MetricCard({ title, value, subtitle }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center border border-slate-200">
      <h3 className="text-xs font-bold uppercase text-slate-500">{title}</h3>
      <p className="text-3xl font-black text-navy mt-2">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </div>
  );
}
