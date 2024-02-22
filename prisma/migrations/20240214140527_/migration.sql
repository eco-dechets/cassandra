/*
  Warnings:

  - You are about to drop the column `name` on the `Material` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Material_name_key` ON `Material`;

-- AlterTable
ALTER TABLE `Material` DROP COLUMN `name`;
