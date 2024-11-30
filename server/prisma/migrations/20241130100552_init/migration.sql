/*
  Warnings:

  - You are about to drop the column `stockQuantity` on the `Products` table. All the data in the column will be lost.
  - Added the required column `unit` to the `Bahan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bahan" ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "stockQuantity",
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 1;
