/*
  Warnings:

  - You are about to alter the column `price` on the `Element` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Element" ALTER COLUMN "price" SET DATA TYPE INTEGER;
