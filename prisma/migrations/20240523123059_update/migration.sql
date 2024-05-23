/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropIndex
DROP INDEX "Product_storeId_categoryId_name_slug_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
DROP COLUMN "totalAmount",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER,
ALTER COLUMN "slug" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Product_storeId_category_name_slug_idx" ON "Product"("storeId", "category", "name", "slug");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
