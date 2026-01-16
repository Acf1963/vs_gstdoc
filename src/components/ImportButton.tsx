import React, { useRef, useState } from "react";

interface ImportButtonProps {
  label?: string;
  onImport: (file: File) => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ label = "Importar Excel", onImport }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileSelected, setFileSelected] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(true);
      onImport(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileRef}
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFile}
        aria-label="Selecionar ficheiro Excel"
      />

      <button
        onClick={() => fileRef.current && fileRef.current.click()}
        className="bg-moss text-white rounded-xl px-4 py-2 flex items-center gap-2 font-black text-xs uppercase shadow-lg hover:brightness-110 transition-all"
        aria-label={label}
      >
        <i
          className={`fas fa-file-excel text-lg transition-all ${
            fileSelected ? "text-green-400 scale-110" : "text-white"
          }`}
          aria-hidden="true"
        ></i>

        {fileSelected ? "Ficheiro Selecionado" : label}
      </button>
    </>
  );
};

export default ImportButton;
