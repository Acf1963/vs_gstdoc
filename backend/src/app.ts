import Fastify from "fastify";
import { errorHandler } from "./middlewares/errorHandler";
import utilizadorRoutes from "../../src/modules/utilizador/utilizador.routes";
import solicitacaoRoutes from "./modules/solicitacao/solicitacao.routes";
import documentoRoutes from "./modules/documento/documento.routes";
import anexoRoutes from "./modules/anexo/anexo.routes";
import entregaRoutes from "./modules/entrega/entrega.routes";
import linhaRoutes from "./modules/linhaDoTempo/linha.routes";

export const app = Fastify({
  logger: true,
});

app.setErrorHandler(errorHandler);

app.register(utilizadorRoutes, { prefix: "/utilizadores" });
app.register(solicitacaoRoutes, { prefix: "/solicitacoes" });
app.register(documentoRoutes, { prefix: "/documentos" });
app.register(anexoRoutes, { prefix: "/anexos" });
app.register(entregaRoutes, { prefix: "/entregas" });
app.register(linhaRoutes, { prefix: "/linha" });
