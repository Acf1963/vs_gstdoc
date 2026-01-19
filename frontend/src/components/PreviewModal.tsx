import React from "react";
import { ExcelRow } from "../services/ExcelService";

export interface PreviewModalProps {
  previewRows: ExcelRow[];
  invalidRows: number[];
  onBack: () => void;
  onImport: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  previewRows,
  invalidRows,
  onBack,
  onImport
}) => {
  const columns =
    previewRows.length > 0 ? Object.keys(previewRows[0]) : [];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onBack}
      ></div>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-modal-title"
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn border border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <h2
          id="preview-modal-title"
          className="text-lg font-black text-navy uppercase tracking-tight"
        >
          Pré‑visualização dos Dados
        </h2>

        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-navy font-bold">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-2 border-b">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {previewRows.map((row, idx) => {
                const isInvalid = invalidRows.includes(idx);

                return (
                  <tr
                    key={idx}
                    className={
                      isInvalid
                        ? "bg-red-50 text-red-700 font-semibold"
                        : "bg-white"
                    }
                  >
                    {columns.map((col) => (
                      <td key={col} className="px-4 py-2 border-b">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {invalidRows.length > 0 && (
          <div className="p-4 bg-red-100 text-red-700 rounded-xl font-bold">
            Existem {invalidRows.length} linhas com campos obrigatórios em
            falta. Corrija o Excel ou ajuste o mapeamento.
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-slate-200 text-navy font-bold hover:bg-slate-300 transition-all"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={onImport}
            disabled={invalidRows.length > 0}
            className={`px-4 py-2 rounded-lg font-black transition-all ${
              invalidRows.length > 0
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-moss text-white hover:brightness-110"
            }`}
          >
            Importar Dados
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
