import React from 'react';
import { RequestRecord, RequestStatus } from '../types';

interface RequestTableProps {
  requests: RequestRecord[];
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: RequestStatus) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({ requests, onDelete, onStatusUpdate }) => {
  if (requests.length === 0) {
    return (
      <div className="py-20 text-center" role="region" aria-label="Nenhuma solicitação encontrada">
        <div className="text-gray-400 mb-4">
          <i className="fas fa-inbox text-6xl" aria-hidden="true"></i>
        </div>
        <p className="text-navy font-bold text-xl">Nenhuma solicitação registrada.</p>
        <p className="text-gray-500">Comece adicionando uma nova solicitação no botão acima.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto custom-scrollbar" role="region" aria-label="Tabela de solicitações">
      <table className="w-full text-left border-collapse min-w-[1200px]">
        <thead>
          <tr className="bg-navy text-white text-xs uppercase tracking-widest font-bold">
            <th className="p-4 rounded-tl-lg" scope="col">Caixa</th>
            <th className="p-4" scope="col">Cliente</th>
            <th className="p-4" scope="col">Localização (Origem/Atual)</th>
            <th className="p-4" scope="col">Sector/Solicitante</th>
            <th className="p-4" scope="col">Tratamento</th>
            <th className="p-4" scope="col">Operador</th>
            <th className="p-4" scope="col">Início</th>
            <th className="p-4" scope="col">Dias</th>
            <th className="p-4" scope="col">Estado</th>
            <th className="p-4 rounded-tr-lg" scope="col">Ações</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {requests.map((req, idx) => (
            <tr
              key={req.id}
              className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b hover:bg-moss/5 transition-colors`}
            >
              <td className="p-4 font-bold text-navy">{req.caixa}</td>
              <td className="p-4">{req.cliente}</td>

              <td className="p-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase">
                    Orig: {req.localizacaoOrigem}
                  </span>
                  <span className="font-medium">
                    Atual: {req.localizacaoAtual}
                  </span>
                </div>
              </td>

              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-medium">{req.sector}</span>
                  <span className="text-[10px] text-gray-500">{req.solicitante}</span>
                </div>
              </td>

              <td className="p-4">
                <span className="bg-navy/10 text-navy px-2 py-1 rounded text-[10px] font-bold">
                  {req.tratamento}
                </span>
              </td>

              <td className="p-4 italic text-gray-600">{req.operador}</td>

              <td className="p-4 text-xs">{req.dataInicio}</td>

              <td className="p-4 font-black text-moss">{req.dias}d</td>

              <td className="p-4">
                <span
                  className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                    req.estado === RequestStatus.FINISHED
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}
                  role="status"
                  aria-label={`Estado: ${req.estado}`}
                >
                  {req.estado}
                </span>
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDelete(req.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-all"
                    title="Excluir solicitação"
                    aria-label={`Excluir solicitação da caixa ${req.caixa}`}
                  >
                    <i className="fas fa-trash" aria-hidden="true"></i>
                  </button>

                  <button
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-all"
                    title="Ver detalhes"
                    aria-label={`Ver detalhes da solicitação da caixa ${req.caixa}`}
                  >
                    <i className="fas fa-eye" aria-hidden="true"></i>
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
