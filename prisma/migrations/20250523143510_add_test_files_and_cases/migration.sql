/*
  Warnings:

  - You are about to drop the column `code` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `results` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `projectFiles` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `testCases` on the `Test` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CodeServerInstance" ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "code",
DROP COLUMN "results",
ADD COLUMN     "result" JSONB;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "projectFiles",
DROP COLUMN "testCases";

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "input" TEXT,
    "expectedOutput" TEXT NOT NULL,
    "testId" TEXT NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestFile" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "testId" TEXT NOT NULL,

    CONSTRAINT "TestFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestFile" ADD CONSTRAINT "TestFile_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
