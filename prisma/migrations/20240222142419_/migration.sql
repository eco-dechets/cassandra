-- CreateTable
CREATE TABLE `TaskManagement` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `endDate` VARCHAR(191) NOT NULL,
    `type` ENUM('PARAMETRAGE', 'ACCES', 'REPORTING', 'OUTILS') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `state` ENUM('CREATED', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'CREATED',
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
    `from` VARCHAR(191) NOT NULL,
    `for` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskManagement` ADD CONSTRAINT `TaskManagement_from_fkey` FOREIGN KEY (`from`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
