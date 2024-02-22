/*
  Warnings:

  - Added the required column `who` to the `TaskManagement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TaskManagement` ADD COLUMN `who` VARCHAR(191) NOT NULL;
