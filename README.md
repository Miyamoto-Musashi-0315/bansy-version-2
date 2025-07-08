# AI-Powered Coding Assessment Platform

## Project Overview
This platform streamlines the technical screening process by generating custom coding challenges based on a single Job Description (JD). It then evaluates candidates against that JD, allowing recruiters to efficiently identify top talent.

**The New Workflow:**
1.  **Define a Role**: A recruiter inputs a detailed Job Description, specifying the role, responsibilities, required tech stack, and experience level.
2.  **Generate a Standardized Test**: The AI analyzes the JD and generates one comprehensive coding project tailored to the position. This becomes the standard test for all candidates applying for that role.
3.  **Score Candidates**: Recruiters upload resumes for interested candidates. The AI analyzes each resume *in the context of the JD* and produces a suitability score (e.g., 9/10), highlighting how well the candidate's skills align with the role.
4.  **Select and Send**: Based on the scores, the recruiter selects the most promising candidates and sends them a link to the coding assessment.
5.  **Assess and Evaluate**: Each candidate receives a link to a private GitHub repository containing the standardized project. Future milestones will focus on automating the evaluation of their submitted solutions.

## Tech Stack
- **Frontend**: React (Vite) with Mantine UI
- **Backend**: Node.js with Express & TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI**: Google Gemini API
- **Source Control**: GitHub API (via GitHub Apps)
- **Authentication**: JWT with bcrypt

## Key Features

- **JD-Centric Workflow**: The entire platform now revolves around Job Descriptions. A single JD is used to generate a standardized coding test for all candidates for that role.
- **Structured JD Input**: Recruiters can now input detailed, structured information for each JD, including experience range, required languages, and specific project context, leading to higher-quality AI-generated projects.
- **AI-Powered Resume Analysis**: The system can analyze an uploaded resume and score its suitability against a specific Job Description, allowing recruiters to quickly identify the most promising candidates.
- **Automated Project Generation**: The platform uses the Google Gemini API to automatically generate a complete coding project, including source files and test cases, based on the structured JD.
- **GitHub Integration**: Generated projects are automatically committed to a new, private GitHub repository, and the link is stored for sending to candidates.

## Project Status and Milestones

### Milestone 1: Core Backend & DB Setup (Complete)
- [x] Initialize Node.js project with TypeScript & Express.
- [x] Set up PostgreSQL with Prisma ORM.
- [x] Establish and test database connectivity.
- [x] Configure environment variables.
- [x] Implement basic middleware (CORS, etc.).

### Milestone 2: User & Auth System (Complete)
- [x] Define User schema in Prisma.
- [x] Implement JWT-based authentication with password hashing.
- [x] Create secure registration and login endpoints.
- [x] Set up frontend auth context and protected routes.
- [x] Build basic login/register pages.

### Milestone 3: Job Description Management (Complete)
- [x] **(New)** Design a `JobDescription` model in the Prisma schema with structured fields (experience, languages, etc.).
- [x] **(New)** Create API endpoints (CRUD) for managing JDs.
- [x] **(New)** Build a frontend interface for recruiters to create, view, and manage JDs with the new structured fields.
- [x] **(Rework)** Update the main dashboard to be JD-centric.
- [x] Run new database migrations for the updated JD schema.

### Milestone 4: AI Project Generation from JD (Complete)
- [x] **(Rework)** Modify the `geminiService` to accept a JD as input.
- [x] **(Rework)** Adapt the `Test` model to link to a `JobDescription` instead of a `Resume`.
- [x] **(Rework)** Refactor the `aiController` to handle the new JD-to-Project flow.
- [x] **(Rework)** Update the AI prompt to generate a standardized project and test cases from the new structured JD fields.
- [x] Ensure the generated project is stored correctly in the database.

### Milestone 5: GitHub Integration (Complete)
- [x] GitHub App is configured for programmatic API access.
- [x] `githubService` can create private repositories and commit files.
- [x] **(Rework)** Trigger repository creation *after* a project is generated from a JD.
- [x] **(Rework)** Ensure the single repository URL is correctly associated with the parent JD/Test.
- [x] The core logic for pushing files to a repo is complete and reusable.

### Milestone 6: Candidate & Resume Management (Complete)
- [x] **(Rework)** Update the resume upload functionality to associate resumes with a specific JD.
- [x] **(New)** Create a new `Candidate` model, linking a resume to a JD.
- [x] Update the database schema and API endpoints accordingly.
- [x] Store uploaded resumes with a clear link to the JD they are being evaluated for.
- [x] **(New)** Design the recruiter's dashboard to show a list of candidates per JD.

### Milestone 7: AI-Powered Resume-to-JD Scoring (Complete)
- [x] **(New)** Create a new AI service function to analyze a resume *against* a JD.
- [x] **(New)** Create an API endpoint to trigger this analysis.
- [x] **(New)** Store the score and analysis in the `Candidate` record.
- [x] **(New)** Develop a prompt that instructs the AI to return a suitability score and a brief rationale.
- [x] **(New)** Display the scores and rationale on the recruiter's dashboard.

### Milestone 8: Candidate Assessment Workflow (Complete)
- [x] **(New)** Build the UI for recruiters to select candidates from the scored list.
- [x] **(New)** Implement a button/action to "Send Test" to selected candidates.
- [x] **(New)** The backend logic sends the pre-generated GitHub link for that JD to the selected candidates.
- [x] Create a view to track which candidates have been sent the test.
- [x] **(New)** Smart candidate filtering - only show eligible candidates (score ≥ 5.0) for test sending.
- [x] **(New)** Visual status indicators - show "Test Sent" badges for candidates who have already received tests.
- [x] **(New)** Prevent duplicate test sending - candidates who have already been sent tests cannot be selected again.
- [x] **(New)** Real-time analysis display - show AI scoring results immediately after resume upload.
- [x] **(New)** Enhanced candidate selection UI with checkboxes and bulk operations.
- [x] **(New)** Automatic navigation flow from resume upload back to JD details page.

### Milestone 9: Submission Handling & Evaluation (Not Started)
**Sub-milestones:**
- [ ] **9.1: GitHub Webhook Integration**
  - [ ] Set up webhook endpoints to receive repository push notifications
  - [ ] Configure GitHub App webhook settings for assessment repositories
  - [ ] Implement webhook validation and security measures
  - [ ] Create database schema for tracking submission events

- [ ] **9.2: Code Retrieval System**
  - [ ] Develop service to fetch final code from candidate repositories
  - [ ] Implement branch detection and final submission identification
  - [ ] Add file extraction and parsing capabilities
  - [ ] Create submission snapshot storage system

- [ ] **9.3: Automated Code Evaluation**
  - [ ] Design AI prompts for code review and scoring
  - [ ] Implement test case execution against submitted code
  - [ ] Create scoring rubric based on JD requirements
  - [ ] Develop feedback generation system

- [ ] **9.4: Evaluation Dashboard**
  - [ ] Build UI for viewing candidate submissions
  - [ ] Display AI evaluation results and scores
  - [ ] Implement manual override and additional feedback features
  - [ ] Create comparison views for multiple candidates

- [ ] **9.5: Notification & Communication**
  - [ ] Send evaluation completion notifications to recruiters
  - [ ] Implement candidate feedback delivery system
  - [ ] Create status tracking for the entire evaluation pipeline
  - [ ] Add email templates for various evaluation stages

### Milestone 10: Finalization & Deployment (Not Started)
**Sub-milestones:**
- [ ] **10.1: Repository Management**
  - [ ] Implement cleanup system for post-assessment repositories
  - [ ] Add archival functionality for completed assessments
  - [ ] Create data retention policies and automated cleanup
  - [ ] Develop repository access management features

- [ ] **10.2: Security & Performance**
  - [ ] Conduct comprehensive security audit
  - [ ] Implement rate limiting and abuse prevention
  - [ ] Optimize database queries and API performance
  - [ ] Add monitoring and alerting systems

- [ ] **10.3: UI/UX Polish**
  - [ ] Conduct user experience testing and refinement
  - [ ] Implement responsive design for mobile compatibility
  - [ ] Add accessibility features and WCAG compliance
  - [ ] Create onboarding flows and help documentation

- [ ] **10.4: Deployment & Infrastructure**
  - [ ] Set up production environment configurations
  - [ ] Implement CI/CD pipelines for automated deployment
  - [ ] Configure load balancing and scaling capabilities
  - [ ] Set up backup and disaster recovery procedures

- [ ] **10.5: Documentation & Testing**
  - [ ] Write comprehensive API documentation
  - [ ] Create user guides and admin documentation
  - [ ] Implement end-to-end testing suite
  - [ ] Conduct final integration testing across all workflows

## Current Status

**🎉 8 out of 10 Milestones Complete!**

The platform is now fully functional for the complete JD-to-candidate workflow:

**✅ Core Features Working:**
- **JD Management** - Create and manage structured job descriptions
- **AI Project Generation** - Automatically generate coding projects from JDs
- **GitHub Integration** - Automatic repository creation with project files
- **Resume Analysis** - AI-powered resume scoring against specific JDs (0-10 scale)
- **Candidate Management** - Track applicants with suitability scores and analysis summaries
- **Test Distribution** - Select eligible candidates and send test links via email
- **Status Tracking** - Visual indicators for test distribution status
- **Smart Filtering** - Only candidates with score ≥ 5.0 can receive tests
- **Real-time Analysis** - Immediate AI scoring and feedback on resume uploads
- **Bulk Operations** - Select multiple candidates for test distribution

**🚀 Ready for Production Use:**
The platform can now handle the complete recruitment workflow from JD creation to test distribution. The remaining milestones focus on automating submission evaluation, final polish, and production deployment.

**📊 Detailed Progress Tracking:**
Each major milestone now includes detailed sub-milestones for better project management and progress tracking. This granular approach ensures no critical features are overlooked during development.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL

### Installation
1.  Clone the repository.
2.  Install dependencies for both backend and frontend:
    ```bash
    # Backend
    npm install
    
    # Frontend
    cd frontend
    npm install
    ```
3.  Set up your environment variables by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Then, edit `.env` with your database connection string, Gemini API key, and GitHub App credentials.
4.  Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

### Development
1.  Start the backend server:
    ```bash
    npm run dev
    ```
2.  In a new terminal, start the frontend development server:
    ```bash
    cd frontend
    npm run dev
    ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
