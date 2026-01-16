import React, { useRef, useState } from "react";
import MappingModal from "./MappingModal";
import PreviewModal from "./PreviewModal";

import {
  readExcelFile,
  applyMapping,
  validateRows,
  generateEntities,
  ExcelRow,
  Mapping
} from "../services/ExcelService";

import { Entity, EntityType } from "./EntityModal.types"; // opcional se quiseres separar tipos

interface EntityModalProps {
  open: boolean;
  onClose: () => void;
  activeType: EntityType;
  entities: Entity[];
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
}

const EntityModal: React.FC<EntityModalProps> = ({
  open,
  onClose,
  activeType,
  entities,
  setEntities
}) => {
  const excelInputRef = useRef<HTMLInputElement | null>(null);

  // Excel states
  const [excelColumns, setExcelColumns] = useState<string[]>([]);
  const [excelRows, setExcelRows] = useState<ExcelRow[]>([]);
  const [mapping, setMapping] = useState<Mapping>({});
  const [previewRows, setPreviewRows] = useState<ExcelRow[]>([]);
  const [invalidRows, setInvalidRows] = useState<number[]>([]);

  const [showMapping, setShowMapping] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Campos internos por entidade
  const internalFieldsByType: Record<EntityType, string[]> = {
    caixas: ["name"],
    clientes: ["name"],
    sectores: ["name"],
    solicitantes: ["name", "setor"],
    operadores: ["name"],
    armazens: ["name"],
    usuarios: ["name", "pass"],
    tratamentos: ["name"]
  };

  // Campos obrigatórios por entidade
  const requiredFieldsByType: Record<EntityType, string[]> = {
    caixas: ["name"],
    clientes: ["name"],
    sectores: ["name"],
    solicitantes: ["name", "setor"],
    operadores: ["name"],
    armazens: ["name"],
    usuarios: ["name", "pass"],
    tratamentos: ["name"]
  };

  /* -------------------------------------------------------
     IMPORTAR EXCEL (via ExcelService)
  ------------------------------------------------------- */

  const handleExcelImport = async (file: File) => {
    try {
      const { columns, rows } = await readExcelFile(file);

      setExcelColumns(columns);
      setExcelRows(rows);
      setShowMapping(true);
    } catch (err) {
      console.error("Erro ao importar Excel:", err);
    }
  };

  /* -------------------------------------------------------
     CONFIRMAR MAPEAMENTO → PREVIEW (via ExcelService)
  ------------------------------------------------------- */

  const confirmMapping = () => {
    const preview = applyMapping(excelRows, mapping);
    const required = requiredFieldsByType[activeType];
    const invalid = validateRows(preview, required);

    setPreviewRows(preview);
    setInvalidRows(invalid);
    setShowMapping(false);
    setShowPreview(true);
  };

  /* -------------------------------------------------------
     IMPORTAR DADOS FINAIS (via ExcelService)
  ------------------------------------------------------- */

  const importMappedData = () => {
    const finalEntities = generateEntities(previewRows, activeType);

    setEntities((prev) => [...prev, ...finalEntities]);
    setShowPreview(false);
  };

  if (!open) return null;

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-navy/90 backdrop-blur-md"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="entity-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-white rounded-[32px] shadow-2xl border border-white/20 animate-fadeIn"
      >
        {/* Header */}
        <div className="bg-navy p-6 flex justify-between items-center">
          <h2
            id="entity-modal-title"
            className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3"
          >
            <i className="fas fa-layer-group text-moss" aria-hidden="true"></i>
            Gerir {activeType}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-red-500 flex items-center justify-center transition-all"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-8 space-y-6">
          {/* Botão Importar Excel */}
          <button
            type="button"
            onClick={() => excelInputRef.current?.click()}
            className="w-full bg-moss text-white rounded-xl py-3 flex items-center justify-center gap-2 font-black text-xs uppercase shadow-lg hover:brightness-110 transition-all"
            aria-label="Importar ficheiro Excel"
          >
            <i className="fas fa-file-excel" aria-hidden="true"></i>
            Importar Excel
          </button>

          <input
            type="file"
            ref={excelInputRef}
            className="hidden"
            accept=".xlsx,.xls"
            aria-label="Selecionar ficheiro Excel"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleExcelImport(file);
            }}
          />

          {/* Lista de entidades */}
          <div className="space-y-2">
            {entities
              .filter((e) => e.type === activeType)
              .map((ent) => (
                <div
                  key={ent.id}
                  className="p-4 bg-slate-50 rounded-xl border font-bold text-navy"
                >
                  {ent.name}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Mapping Modal */}
      {showMapping && (
        <MappingModal
          columns={excelColumns}
          internalFields={internalFieldsByType[activeType]}
          mapping={mapping}
          setMapping={setMapping}
          onConfirm={confirmMapping}
          onCancel={() => setShowMapping(false)}
        />
      )}

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          previewRows={previewRows}
          invalidRows={invalidRows}
          onBack={() => {
            setShowPreview(false);
            setShowMapping(true);
          }}
          onImport={importMappedData}
        />
      )}
    </div>
  );
};

export default EntityModal;
