import React from 'react';
import { RequestRecord, RequestStatus } from '../types';

interface RequestFormProps {
  formData: RequestRecord;
  onChange: (field: keyof RequestRecord, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ formData, onChange, onSubmit, onCancel }) => {
  return (
    <form
      role="form"
      aria-labelledby="request-form-title"
      className="space-y-10 p-8 bg-white rounded-[32px] shadow-xl border border-slate-200"
    >
      {/* TÍTULO */}
      <h2
        id="request-form-title"
        className="text-2xl font-black text-navy uppercase tracking-tight flex items-center gap-3"
      >
        <i className="fas fa-file-signature text-moss" aria-hidden="true"></i>
        Nova Solicitação
      </h2>

      {/* IDENTIFICAÇÃO */}
      <section aria-labelledby="sec-identificacao" className="space-y-6">
        <h3 id="sec-identificacao" className="text-lg font-black text-navy uppercase tracking-wide">
          Identificação
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="caixa" className="font-bold text-sm text-gray-700">
              Caixa
            </label>
            <input
              id="caixa"
              type="text"
              value={formData.caixa}
              onChange={(e) => onChange('caixa', e.target.value)}
              className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="cliente" className="font-bold text-sm text-gray-700">
              Cliente
            </label>
            <input
              id="cliente"
              type="text"
              value={formData.cliente}
              onChange={(e) => onChange('cliente', e.target.value)}
              className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
              aria-required="true"
            />
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section aria-labelledby="sec-localizacao" className="space-y-6">
        <h3 id="sec-localizacao" className="text-lg font-black text-navy uppercase tracking-wide">
          Localização
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="origem" className="font-bold text-sm text-gray-700">
              Localização de Origem
            </label>
            <input
              id="origem"
              type="text"
              value={formData.localizacaoOrigem}
              onChange={(e) => onChange('localizacaoOrigem', e.target.value)}
              className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
            />
          </div>

          <div>
            <label htmlFor="atual" className="font-bold text-sm text-gray-700">
              Localização Atual
            </label>
            <input
              id="atual"
              type="text"
              value={formData.localizacaoAtual}
              onChange={(e) => onChange('localizacaoAtual', e.target.value)}
              className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
            />
          </div>
        </div>
      </section>

      {/* SECTOR / SOLICITANTE */}
      <section aria-labelledby="sec-sector" className="space-y-6">
        <h3 id="sec-sector" className="text-lg font-black text-navy uppercase tracking-wide">
          Sector / Solicitante
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="sector" className="font-bold text-sm text-gray-700">
              Sector
            </label>
            <input
              id="sector"
              type="text"
              value={formData.sector}
              onChange={(e) => onChange('sector', e.target.value)}
              className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
            />
          </div>

          <div>
            <label htmlFor="solicitante" className="font-bold text-sm text-gray-700">
              Solicitante
            </label>
            <input
              id="solicitante"
              type="text"
              value={formData.solicitante}
              onChange={(e) => onChange('solicitante', e.target.value)}
              className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
            />
          </div>
        </div>
      </section>

      {/* TRATAMENTO */}
      <section aria-labelledby="sec-tratamento" className="space-y-6">
        <h3 id="sec-tratamento" className="text-lg font-black text-navy uppercase tracking-wide">
          Tratamento
        </h3>

        <div>
          <label htmlFor="tratamento" className="font-bold text-sm text-gray-700">
            Tipo de Tratamento
          </label>
          <input
            id="tratamento"
            type="text"
            value={formData.tratamento}
            onChange={(e) => onChange('tratamento', e.target.value)}
            className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
          />
        </div>
      </section>

      {/* OPERAÇÃO */}
      <section aria-labelledby="sec-operacao" className="space-y-6">
        <h3 id="sec-operacao" className="text-lg font-black text-navy uppercase tracking-wide">
          Operação
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="operador" className="font-bold text-sm text-gray-700">
              Operador
            </label>
            <input
              id="operador"
              type="text"
              value={formData.operador}
              onChange={(e) => onChange('operador', e.target.value)}
              className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
            />
          </div>

          <div>
            <label htmlFor="dataInicio" className="font-bold text-sm text-gray-700">
              Data de Início
            </label>
            <input
              id="dataInicio"
              type="date"
              value={formData.dataInicio}
              onChange={(e) => onChange('dataInicio', e.target.value)}
              className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
            />
          </div>
        </div>
      </section>

      {/* ESTADO */}
      <section aria-labelledby="sec-estado" className="space-y-6">
        <h3 id="sec-estado" className="text-lg font-black text-navy uppercase tracking-wide">
          Estado
        </h3>

        <div>
          <label htmlFor="estado" className="font-bold text-sm text-gray-700">
            Estado da Solicitação
          </label>
          <select
            id="estado"
            value={formData.estado}
            onChange={(e) => onChange('estado', e.target.value)}
            className="w-full p-4 rounded-2xl border-2 font-bold text-lg outline-none focus:ring-4 focus:ring-moss/40"
          >
            <option value={RequestStatus.IN_PROGRESS}>Em Tratamento</option>
            <option value={RequestStatus.FINISHED}>Finalizado</option>
          </select>
        </div>
      </section>

      {/* BOTÕES */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-4 rounded-2xl bg-slate-200 text-navy font-black uppercase tracking-wide hover:bg-slate-300 transition-all"
          aria-label="Cancelar criação da solicitação"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="px-10 py-4 rounded-2xl bg-moss text-white font-black uppercase tracking-wide shadow-lg hover:brightness-110 transition-all"
          aria-label="Salvar solicitação"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
