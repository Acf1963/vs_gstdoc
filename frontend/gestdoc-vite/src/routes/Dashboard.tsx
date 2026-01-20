import { motion } from "framer-motion";
import {
  DocumentIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const cards = [
    {
      title: "Documentos Processados",
      value: "1 248",
      change: "+12%",
      positive: true,
      icon: DocumentIcon,
    },
    {
      title: "Pendentes",
      value: "87",
      change: "-4%",
      positive: false,
      icon: ClockIcon,
    },
    {
      title: "Tempo Médio",
      value: "2.4 dias",
      change: "+8%",
      positive: false,
      icon: ClockIcon,
    },
    {
      title: "Solicitações Hoje",
      value: "32",
      change: "+5%",
      positive: true,
      icon: DocumentIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h2 className="text-2xl font-semibold mt-1">{card.value}</h2>
              </div>

              <div className="p-3 bg-gray-100 rounded-lg">
                <Icon className="h-6 w-6 text-gray-700" />
              </div>
            </div>

            <div className="flex items-center mt-4">
              {card.positive ? (
                <ArrowUpIcon className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-600" />
              )}

              <span
                className={`ml-1 text-sm ${
                  card.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.change}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
