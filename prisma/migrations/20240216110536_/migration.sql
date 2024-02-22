/*
  Warnings:

  - Added the required column `groupCloud` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupDistribution` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenses` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `softwares` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `groupCloud` JSON NOT NULL,
    ADD COLUMN `groupDistribution` JSON NOT NULL,
    ADD COLUMN `licenses` JSON NOT NULL,
    ADD COLUMN `softwares` JSON NOT NULL,
    MODIFY `enteredAt` VARCHAR(191) NULL;
