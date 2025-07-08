/*
  Warnings:

  - You are about to drop the column `analysis` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the `CodeServerInstance` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[jobDescriptionId]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobDescriptionId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CodeServerInstance" DROP CONSTRAINT "CodeServerInstance_testId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_resumeId_fkey";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "analysis";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "creatorId",
DROP COLUMN "resumeId",
ADD COLUMN     "jobDescriptionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CodeServerInstance";

-- CreateTable
CREATE TABLE "JobDescription" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "suitabilityScore" DOUBLE PRECISION,
    "suitabilityAnalysis" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobDescriptionId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_jobDescriptionId_resumeId_key" ON "Candidate"("jobDescriptionId", "resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_jobDescriptionId_key" ON "Test"("jobDescriptionId");

-- AddForeignKey
ALTER TABLE "JobDescription" ADD CONSTRAINT "JobDescription_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
