import { Entity } from './types';

export const INITIAL_ENTITIES: Entity[] = [
  // Caixas (sample boxes)
  { id: 'box_001', name: 'CX-2024-001', type: 'caixas' },
  { id: 'box_002', name: 'CX-2024-002', type: 'caixas' },
  { id: 'box_003', name: 'CX-2024-003', type: 'caixas' },
  
  // Clientes (sample clients)
  { id: 'cli_001', name: 'Empresa ABC', type: 'clientes' },
  { id: 'cli_002', name: 'Corporação XYZ', type: 'clientes' },
  { id: 'cli_003', name: 'GESTDOC Interno', type: 'clientes' },
  
  // Localizações (sample locations)
  { id: 'loc_001', name: 'Armazém Principal', type: 'localizacoes' },
  { id: 'loc_002', name: 'Sala de Digitalização', type: 'localizacoes' },
  { id: 'loc_003', name: 'Arquivo Morto', type: 'localizacoes' },
  { id: 'loc_004', name: 'Recepção', type: 'localizacoes' },
  
  // Sectores (sample sectors)
  { id: 'sec_001', name: 'Recursos Humanos', type: 'sectores' },
  { id: 'sec_002', name: 'Contabilidade', type: 'sectores' },
  { id: 'sec_003', name: 'Jurídico', type: 'sectores' },
  { id: 'sec_004', name: 'Administração', type: 'sectores' },
  
  // Solicitantes (sample requesters - linked to sectors)
  { id: 'sol_001', name: 'João Silva', type: 'solicitantes', parentId: 'sec_001' },
  { id: 'sol_002', name: 'Maria Santos', type: 'solicitantes', parentId: 'sec_001' },
  { id: 'sol_003', name: 'Pedro Costa', type: 'solicitantes', parentId: 'sec_002' },
  { id: 'sol_004', name: 'Ana Ferreira', type: 'solicitantes', parentId: 'sec_003' },
  { id: 'sol_005', name: 'Carlos Neto', type: 'solicitantes', parentId: 'sec_004' },
  
  // Operadores (sample operators)
  { id: 'op_001', name: 'Operador 1', type: 'operadores' },
  { id: 'op_002', name: 'Operador 2', type: 'operadores' },
  { id: 'op_003', name: 'Operador 3', type: 'operadores' },
  
  // Armazéns (sample warehouses)
  { id: 'arm_001', name: 'Armazém A', type: 'armazens' },
  { id: 'arm_002', name: 'Armazém B', type: 'armazens' },
];
