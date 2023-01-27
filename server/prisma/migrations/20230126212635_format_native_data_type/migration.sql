/*
  Warnings:

  - You are about to alter the column `created_at` on the `habits` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `habits` MODIFY `created_at` DATETIME NULL;
