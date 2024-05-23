/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `discount` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `gst` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `makingCharges` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `metalAmount` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "productPrice" INTEGER,
ADD COLUMN     "xPercentageMetalAmount" INTEGER,
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "discount" SET DATA TYPE INTEGER,
ALTER COLUMN "gst" DROP NOT NULL,
ALTER COLUMN "gst" SET DATA TYPE INTEGER,
ALTER COLUMN "makingCharges" DROP NOT NULL,
ALTER COLUMN "makingCharges" SET DATA TYPE INTEGER,
ALTER COLUMN "metalAmount" DROP NOT NULL,
ALTER COLUMN "metalAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "rating" SET DEFAULT 5,
ALTER COLUMN "weightInGrams" DROP NOT NULL;
