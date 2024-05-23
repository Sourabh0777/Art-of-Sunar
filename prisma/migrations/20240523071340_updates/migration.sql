/*
  Warnings:

  - You are about to drop the column `weightingrams` on the `Product` table. All the data in the column will be lost.
  - Added the required column `weightInGrams` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "weightingrams",
ADD COLUMN     "weightInGrams" INTEGER NOT NULL;
