/*
  Warnings:

  - Added the required column `code` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `native` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "code" VARCHAR(2) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "native" TEXT NOT NULL;
