export type EntityType =
  | "caixas"
  | "clientes"
  | "sectores"
  | "solicitantes"
  | "operadores"
  | "armazens"
  | "usuarios"
  | "tratamentos";

export interface BaseEntity {
  id: string;
  type: EntityType;
  name: string;
}

export interface SolicitanteEntity extends BaseEntity {
  setor: string;
}

export interface UsuarioEntity extends BaseEntity {
  pass: string;
}

export type Entity =
  | BaseEntity
  | SolicitanteEntity
  | UsuarioEntity;
