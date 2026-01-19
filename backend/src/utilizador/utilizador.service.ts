import { prisma } from "../../prisma/client";

export function criar(data: any) {
  return prisma.utilizador.create({ data });
}

export function listar() {
  return prisma.utilizador.findMany();
}

export function obter(id: string) {
  return prisma.utilizador.findUnique({ where: { id } });
}
