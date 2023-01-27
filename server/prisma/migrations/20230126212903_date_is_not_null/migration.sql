/*
  Warnings:

  - Made the column `created_at` on table `habits` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `habits` MODIFY `created_at` DATETIME NOT NULL;
