/*
  Warnings:

  - You are about to drop the column `requirements` on the `JobDescription` table. All the data in the column will be lost.
  - Added the required column `maxExperience` to the `JobDescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minExperience` to the `JobDescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectContext` to the `JobDescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobDescription" DROP COLUMN "requirements",
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "maxExperience" INTEGER NOT NULL,
ADD COLUMN     "minExperience" INTEGER NOT NULL,
ADD COLUMN     "projectContext" TEXT NOT NULL;
