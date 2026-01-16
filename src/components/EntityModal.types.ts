/* -------------------------------------------------------
   ENTITY TYPES
------------------------------------------------------- */

export type EntityType =
  | "caixas"
  | "clientes"
  | "sectores"
  | "solicitantes"
  | "operadores"
  | "armazens"
  | "usuarios"
  | "tratamentos";

/* Base comum a todas as entidades */
export interface BaseEntity {
  id: string;
  type: EntityType;
  name: string;
}

/* Entidades com campos adicionais */
export interface SolicitanteEntity extends BaseEntity {
  setor: string;
}

export interface UsuarioEntity extends BaseEntity {
  pass: string;
}

/* União final de todas as entidades possíveis */
export type Entity =
  | BaseEntity
  | SolicitanteEntity
  | UsuarioEntity;
