export function errorHandler(error, req, reply) {
  reply.status(400).send({
    erro: true,
    mensagem: error.message,
  });
}
