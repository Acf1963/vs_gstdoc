import { app } from "../../src/app";

const PORT = process.env.PORT || 3333;

app.listen({ port: Number(PORT), host: "0.0.0.0" })
  .then(() => console.log(`🚀 Gestdoc backend a correr na porta ${PORT}`));
