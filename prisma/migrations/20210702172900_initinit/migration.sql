/*
  Warnings:

  - Added the required column `updatedAt` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "genre" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
