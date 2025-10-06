-- CreateIndex
CREATE INDEX "Candidate_jobDescriptionId_idx" ON "Candidate"("jobDescriptionId");

-- CreateIndex
CREATE INDEX "Candidate_status_idx" ON "Candidate"("status");

-- CreateIndex
CREATE INDEX "Candidate_createdAt_idx" ON "Candidate"("createdAt");

-- CreateIndex
CREATE INDEX "Candidate_suitabilityScore_idx" ON "Candidate"("suitabilityScore");

-- CreateIndex
CREATE INDEX "JobDescription_creatorId_idx" ON "JobDescription"("creatorId");

-- CreateIndex
CREATE INDEX "JobDescription_createdAt_idx" ON "JobDescription"("createdAt");

-- CreateIndex
CREATE INDEX "Resume_email_idx" ON "Resume"("email");

-- CreateIndex
CREATE INDEX "Resume_uploadedAt_idx" ON "Resume"("uploadedAt");

-- CreateIndex
CREATE INDEX "SubmissionEvent_candidateId_idx" ON "SubmissionEvent"("candidateId");

-- CreateIndex
CREATE INDEX "SubmissionEvent_testId_idx" ON "SubmissionEvent"("testId");

-- CreateIndex
CREATE INDEX "SubmissionEvent_receivedAt_idx" ON "SubmissionEvent"("receivedAt");

-- CreateIndex
CREATE INDEX "SubmissionEvent_eventType_idx" ON "SubmissionEvent"("eventType");

-- CreateIndex
CREATE INDEX "SubmissionEvent_repoName_idx" ON "SubmissionEvent"("repoName");

-- CreateIndex
CREATE INDEX "Test_jobDescriptionId_idx" ON "Test"("jobDescriptionId");

-- CreateIndex
CREATE INDEX "Test_createdAt_idx" ON "Test"("createdAt");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
