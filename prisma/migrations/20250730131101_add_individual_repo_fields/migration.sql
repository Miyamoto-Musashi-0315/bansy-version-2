/*
  Warnings:

  - You are about to drop the `SubmissionSnapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubmissionSnapshot" DROP CONSTRAINT "SubmissionSnapshot_submissionId_fkey";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "individualRepoUrl" TEXT,
ADD COLUMN     "repoCreatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "SubmissionSnapshot";
