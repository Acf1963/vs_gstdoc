export enum RequestStatus {
  IN_PROGRESS = 'Em Curso',
  FINISHED = 'Finalizado'
}

export interface RequestRecord {
  id: string;
  caixa: string;
  cliente: string;
  localizacaoOrigem: string;
  localizacaoAtual: string;
  sector: string;
  solicitante: string;
  tratamento: string;
  operador: string;
  dataInicio: string;
  dataAtual: string;
  dias: number;
  estado: RequestStatus;
}

export type EntityType = 'caixas' | 'clientes' | 'localizacoes' | 'sectores' | 'solicitantes' | 'tratamentos' | 'operadores' | 'usuarios' | 'armazens';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  parentId?: string; // Para vincular Solicitante ao Sector
  pass?: string;     // Para credenciais de usuários
}