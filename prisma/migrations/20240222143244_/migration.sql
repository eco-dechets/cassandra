/*
  Warnings:

  - You are about to drop the column `endDate` on the `TaskManagement` table. All the data in the column will be lost.
  - You are about to drop the column `for` on the `TaskManagement` table. All the data in the column will be lost.
  - Added the required column `assignedTo` to the `TaskManagement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `TaskManagement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TaskManagement` DROP COLUMN `endDate`,
    DROP COLUMN `for`,
    ADD COLUMN `assignedTo` VARCHAR(191) NOT NULL,
    ADD COLUMN `dueDate` VARCHAR(191) NOT NULL;
