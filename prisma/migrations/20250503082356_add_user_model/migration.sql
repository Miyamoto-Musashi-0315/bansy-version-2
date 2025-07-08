/*
  Warnings:

  - You are about to drop the column `submittedAt` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `submittedCode` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `projectDefinition` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the `Evaluation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectFiles` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCases` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('HR', 'CANDIDATE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'HR',
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create a temporary admin user
INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@example.com',
  'Admin User',
  '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9.m', -- This is a hash of "admin123"
  'HR',
  NOW(),
  NOW()
);

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_submissionId_fkey";

-- AlterTable
ALTER TABLE "Test" 
ADD COLUMN "creatorId" TEXT NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
ADD COLUMN "description" TEXT,
ADD COLUMN "title" TEXT NOT NULL DEFAULT 'Imported Test',
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "candidateEmail" TEXT,
ADD COLUMN "testCases" JSONB NOT NULL DEFAULT '{"tests": []}',
ALTER COLUMN "projectDefinition" TYPE JSONB;

ALTER TABLE "Test" RENAME COLUMN "projectDefinition" TO "projectFiles";

-- AlterTable
ALTER TABLE "Submission" 
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "results" JSONB,
ALTER COLUMN "submittedCode" TYPE JSONB;

ALTER TABLE "Submission" RENAME COLUMN "submittedCode" TO "code";
ALTER TABLE "Submission" DROP COLUMN "submittedAt";

-- DropTable
DROP TABLE "Evaluation";

-- AlterTable
ALTER TABLE "Submission" 
ALTER COLUMN "code" SET DATA TYPE JSONB,
ALTER COLUMN "results" SET DATA TYPE JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Remove the default values we added for migration
ALTER TABLE "Test" 
ALTER COLUMN "creatorId" DROP DEFAULT,
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "testCases" DROP DEFAULT;
