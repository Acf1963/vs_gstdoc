import * as XLSX from "xlsx";
import { Entity, EntityType } from "../components/EntityModal";

/* -------------------------------------------------------
   TYPES
------------------------------------------------------- */

export type ExcelRow = Record<string, string>;
export type Mapping = Record<string, string>;

export interface ExcelReadResult {
  columns: string[];
  rows: ExcelRow[];
}

/* -------------------------------------------------------
   LER FICHEIRO EXCEL
------------------------------------------------------- */

export const readExcelFile = async (file: File): Promise<ExcelReadResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (!result) return reject("Erro ao ler ficheiro");

        const data = new Uint8Array(result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<ExcelRow>(sheet, { defval: "" });

        if (json.length === 0) {
          return reject("O ficheiro Excel está vazio");
        }

        resolve({
          columns: Object.keys(json[0]),
          rows: json
        });
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

/* -------------------------------------------------------
   APLICAR MAPEAMENTO
------------------------------------------------------- */

export const applyMapping = (
  rows: ExcelRow[],
  mapping: Mapping
): ExcelRow[] => {
  return rows.map((row) => {
    const obj: ExcelRow = {};
    for (const col of Object.keys(mapping)) {
      const field = mapping[col];
      if (field) obj[field] = row[col];
    }
    return obj;
  });
};

/* -------------------------------------------------------
   VALIDAR CAMPOS OBRIGATÓRIOS
------------------------------------------------------- */

export const validateRows = (
  mappedRows: ExcelRow[],
  requiredFields: string[]
): number[] => {
  return mappedRows
    .map((row, idx) =>
      requiredFields.some((field) => !row[field] || row[field] === "")
        ? idx
        : null
    )
    .filter((x): x is number => x !== null);
};

/* -------------------------------------------------------
   GERAR ENTIDADES FINAIS
------------------------------------------------------- */

export const generateEntities = (
  mappedRows: ExcelRow[],
  type: EntityType
): Entity[] => {
  return mappedRows.map((row) => ({
    id: `ent_${Date.now()}_${Math.random()}`,
    type,
    ...row
  })) as Entity[];
};
