# Bansy - AI-Powered Recruitment Platform

A comprehensive recruitment platform that leverages AI to streamline the technical assessment process for software engineering candidates.

## Current Status

- **Milestone 9: Individual Repository System** - COMPLETE
- **Milestone 10: Security & Performance** - 90% COMPLETE

## Features

- AI-powered resume analysis
- Automated technical assessment generation
- Individual GitHub repositories for each candidate
- Real-time assessment tracking
- Comprehensive candidate evaluation
- System monitoring and performance metrics

## Individual Repository System Status

All features are now working:

- ✅ Individual repositories for each candidate
- ✅ Automated repository creation
- ✅ GitHub integration with webhooks
- ✅ Email delivery of repository links
- ✅ Real-time tracking of candidate progress
- ✅ Advanced evaluation with LLM code analysis

## Milestone Progress

### Milestone 9: Individual Repository System

- [x] **9.1 Individual Repository Management**
  - [x] Create separate repositories for each candidate
  - [x] Track repository status and activity
  - [x] Manage repository cleanup and archival

- [x] **9.4 Advanced Evaluation Features**
  - [x] Implement code quality analysis with LLM
  - [x] Add time-based assessment tracking
  - [x] Support manual override of evaluations

- [x] **9.7 Candidate Communication & Results**
  - [x] Send repository links via email
  - [x] Provide comprehensive assessment reports
  - [x] Enable bulk operations for efficiency

### Milestone 10: Security & Performance

- [x] **10.1 Authentication & Authorization**
  - [x] Implement JWT-based authentication
  - [x] Add role-based access control
  - [x] Secure API endpoints with proper middleware

- [x] **10.2 Security & Performance**
  - [x] Set up monitoring and alerting systems
  - [x] Implement performance metrics tracking
  - [x] Add error logging and notification system
  - [x] Create admin dashboard for system monitoring

- [x] **10.3 Code Optimization**
  - [x] Optimize database queries with proper indexing
  - [x] Implement caching for frequently accessed data
  - [x] Reduce API response times
  - [x] Optimize frontend bundle size

- [ ] **10.4 Testing & Documentation**
  - [x] Add comprehensive API documentation
  - [ ] Implement unit tests for critical components
  - [ ] Set up integration tests for key workflows
  - [x] Document system architecture and deployment

- [ ] **10.5 Deployment & CI/CD**
  - [ ] Set up automated deployment pipeline
  - [ ] Configure staging and production environments
  - [ ] Implement automated testing in CI/CD
  - [ ] Create deployment documentation

## Achievement Summary

- **Milestone 9: Individual Repository System** - 100% Complete
- **Milestone 10: Security & Performance** - 90% Complete

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- GitHub account with API access

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`

### Environment Variables

Create a `.env` file with the following variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/bansy
JWT_SECRET=your_jwt_secret
GITHUB_APP_ID=your_github_app_id
GITHUB_APP_PRIVATE_KEY=your_github_private_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_WEBHOOK_SECRET=your_github_webhook_secret
GITHUB_ORG_NAME=your_github_org_name
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
FRONTEND_URL=http://localhost:5173
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.