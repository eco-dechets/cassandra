/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Material` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inventoryNumber]` on the table `Material` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventoryNumber` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Material` DROP COLUMN `employeeId`,
    ADD COLUMN `inventoryNumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Material_inventoryNumber_key` ON `Material`(`inventoryNumber`);
