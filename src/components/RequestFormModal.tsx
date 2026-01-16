import React from 'react';
import RequestForm from './RequestForm';
import { RequestRecord } from '../types';

interface RequestFormModalProps {
  open: boolean;
  formData: RequestRecord;
  onChange: (field: keyof RequestRecord, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const RequestFormModal: React.FC<RequestFormModalProps> = ({
  open,
  formData,
  onChange,
  onSubmit,
  onCancel
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-navy/90 backdrop-blur-md"
        aria-hidden="true"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-form-modal-title"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-white rounded-[32px] shadow-2xl border border-white/20 animate-fadeIn"
      >
        {/* Header */}
        <div className="bg-navy p-6 flex justify-between items-center">
          <h2
            id="request-form-modal-title"
            className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3"
          >
            <i className="fas fa-file-signature text-moss" aria-hidden="true"></i>
            Nova Solicitação
          </h2>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Fechar formulário de solicitação"
            title="Fechar"
            className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-red-500 flex items-center justify-center transition-all"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        {/* Formulário */}
        <div className="p-8">
          <RequestForm
            formData={formData}
            onChange={onChange}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestFormModal;
