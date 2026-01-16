// src/components/MappingModal.tsx
import React from "react";
import { Mapping } from "../services/ExcelService";

export interface MappingModalProps {
  columns: string[];
  internalFields: string[];
  mapping: Mapping;
  setMapping: React.Dispatch<React.SetStateAction<Mapping>>;
  onConfirm: () => void;
  onCancel: () => void;
}

const MappingModal: React.FC<MappingModalProps> = ({
  columns,
  internalFields,
  mapping,
  setMapping,
  onConfirm,
  onCancel
}) => {
  const handleSelect = (excelColumn: string, internalField: string) => {
    setMapping((prev) => ({
      ...prev,
      [excelColumn]: internalField
    }));
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onCancel}
      ></div>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mapping-modal-title"
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn border border-slate-200"
      >
        <h2
          id="mapping-modal-title"
          className="text-lg font-black text-navy uppercase tracking-tight"
        >
          Mapeamento de Colunas
        </h2>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
          {columns.map((col) => (
            <div
              key={col}
              className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl border"
            >
              <span className="font-bold text-navy">{col}</span>

              <select
                className="px-3 py-2 rounded-lg border bg-white text-sm"
                value={mapping[col] || ""}
                onChange={(e) => handleSelect(col, e.target.value)}
                aria-label={`Selecionar campo interno para ${col}`}
              >
                <option value="">— Ignorar —</option>
                {internalFields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-slate-200 text-navy font-bold hover:bg-slate-300 transition-all"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-moss text-white font-black hover:brightness-110 transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MappingModal;
