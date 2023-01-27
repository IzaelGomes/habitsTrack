/*
  Warnings:

  - You are about to alter the column `created_at` on the `habits` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `habits` MODIFY `created_at` DATETIME(3) NOT NULL;
