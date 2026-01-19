import { prisma } from "@prisma/client";
import { errorHandler } from "@middlewares/errorHandler";
import utilizadorRoutes from "@modules/utilizador/utilizador.routes";

export const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});
