import { FastifyRequest, FastifyReply } from "fastify";
import * as service from "./utilizador.service";

export async function criar(req: FastifyRequest, reply: FastifyReply) {
  const utilizador = await service.criar(req.body as any);
  reply.send(utilizador);
}

export async function listar(req: FastifyRequest, reply: FastifyReply) {
  const lista = await service.listar();
  reply.send(lista);
}

export async function obter(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as any;
  const utilizador = await service.obter(id);
  reply.send(utilizador);
}
