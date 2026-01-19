import { FastifyInstance } from "fastify";
import * as controller from "./utilizador.controller";

export default async function routes(app: FastifyInstance) {
  app.post("/", controller.criar);
  app.get("/", controller.listar);
  app.get("/:id", controller.obter);
}
