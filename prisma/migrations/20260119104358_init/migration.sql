-- CreateTable
CREATE TABLE `Utilizador` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Utilizador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitacao` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `tipo` ENUM('REQUISICAO', 'DEVOLUCAO', 'CONSULTA') NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `prioridade` ENUM('BAIXA', 'MEDIA', 'ALTA', 'URGENTE') NOT NULL,
    `estadoAtual` ENUM('PENDENTE', 'EM_ANALISE', 'EM_PROCESSAMENTO', 'CONCLUIDA', 'CANCELADA') NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,
    `concluidoEm` DATETIME(3) NULL,
    `solicitanteId` VARCHAR(191) NOT NULL,
    `responsavelId` VARCHAR(191) NULL,

    UNIQUE INDEX `Solicitacao_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Documento_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SolicitacaoDocumento` (
    `id` VARCHAR(191) NOT NULL,
    `solicitacaoId` VARCHAR(191) NOT NULL,
    `documentoId` VARCHAR(191) NOT NULL,
    `observacao` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SolicitacaoDocumento_solicitacaoId_documentoId_key`(`solicitacaoId`, `documentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinhaDoTempo` (
    `id` VARCHAR(191) NOT NULL,
    `solicitacaoId` VARCHAR(191) NOT NULL,
    `estado` ENUM('PENDENTE', 'EM_ANALISE', 'EM_PROCESSAMENTO', 'CONCLUIDA', 'CANCELADA') NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `responsavelId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anexo` (
    `id` VARCHAR(191) NOT NULL,
    `solicitacaoId` VARCHAR(191) NULL,
    `documentoId` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NOT NULL,
    `caminho` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entrega` (
    `id` VARCHAR(191) NOT NULL,
    `solicitacaoId` VARCHAR(191) NOT NULL,
    `dataEntrega` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recebidoPor` VARCHAR(191) NOT NULL,
    `observacao` VARCHAR(191) NULL,

    UNIQUE INDEX `Entrega_solicitacaoId_key`(`solicitacaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_solicitanteId_fkey` FOREIGN KEY (`solicitanteId`) REFERENCES `Utilizador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `Utilizador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitacaoDocumento` ADD CONSTRAINT `SolicitacaoDocumento_solicitacaoId_fkey` FOREIGN KEY (`solicitacaoId`) REFERENCES `Solicitacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitacaoDocumento` ADD CONSTRAINT `SolicitacaoDocumento_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `Documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LinhaDoTempo` ADD CONSTRAINT `LinhaDoTempo_solicitacaoId_fkey` FOREIGN KEY (`solicitacaoId`) REFERENCES `Solicitacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LinhaDoTempo` ADD CONSTRAINT `LinhaDoTempo_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `Utilizador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anexo` ADD CONSTRAINT `Anexo_solicitacaoId_fkey` FOREIGN KEY (`solicitacaoId`) REFERENCES `Solicitacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anexo` ADD CONSTRAINT `Anexo_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `Documento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entrega` ADD CONSTRAINT `Entrega_solicitacaoId_fkey` FOREIGN KEY (`solicitacaoId`) REFERENCES `Solicitacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
