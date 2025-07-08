# AI-Powered Coding Assessment Platform - Implementation Details

## System Architecture Overview

### Backend Architecture (Node.js + Express + TypeScript)
- **Server Configuration**
  - Express server with TypeScript for type safety
  - CORS enabled for frontend communication
  - Body parser middleware for JSON and form data
  - Static file serving for resume uploads
  - Environment-based configuration using dotenv

- **Database Layer**
  - PostgreSQL as the primary database
  - Prisma ORM for type-safe database operations
  - Models:
    - User (id, email, password, role, createdAt)
    - Test (id, title, description, difficulty, language, createdAt)
    - Submission (id, testId, userId, code, status, createdAt)
    - Resume (id, email, filename, path, size, uploadedAt)

- **Authentication System**
  - JWT-based authentication
  - Password hashing using bcrypt
  - Protected route middleware
  - Token verification and validation
  - Role-based access control (Admin/User)

- **File Upload System**
  - Multer middleware for file handling
  - Support for PDF, DOC, DOCX formats
  - File size limit: 5MB
  - Unique filename generation
  - Secure file storage with proper permissions

### Frontend Architecture (React + Vite)

- **Project Structure**
  ```
  frontend/
  ├── src/
  │   ├── components/    # Reusable UI components
  │   ├── pages/        # Route components
  │   ├── services/     # API services
  │   ├── types/        # TypeScript interfaces
  │   ├── utils/        # Helper functions
  │   └── App.tsx       # Root component
  ```

- **UI Components**
  - Mantine UI framework for modern design
  - Responsive layout system
  - Custom theme configuration
  - Icon integration with Tabler Icons

- **State Management**
  - React Context for auth state
  - Local state with useState
  - Form state with Mantine form hooks
  - API state management with proper loading/error states

- **Routing System**
  - React Router v6
  - Protected route wrapper
  - Nested routes for dashboard
  - 404 handling

### API Endpoints

1. **Authentication**
   ```
   POST /api/auth/register
   POST /api/auth/login
   GET /api/auth/profile
   ```

2. **Tests**
   ```
   GET /api/tests
   GET /api/tests/:id
   POST /api/tests
   PUT /api/tests/:id
   ```

3. **Resume Upload**
   ```
   POST /api/resume/upload
   GET /api/resume/:id
   ```

### Security Measures

1. **Authentication & Authorization**
   - Secure password hashing with bcrypt
   - JWT with expiration
   - Protected API routes
   - Role-based access control

2. **File Upload Security**
   - File type validation
   - Size limits
   - Malware scanning (planned)
   - Secure file storage

3. **API Security**
   - CORS configuration
   - Rate limiting
   - Input validation
   - Error handling

### Testing Strategy

1. **Backend Tests**
   - Unit tests for utilities
   - Integration tests for API endpoints
   - Database operation tests
   - Authentication flow tests

2. **Frontend Tests**
   - Component unit tests
   - Integration tests for forms
   - Route protection tests
   - API integration tests

### Development Workflow

1. **Local Development**
   ```bash
   # Backend
   npm install
   cp .env.example .env
   npx prisma migrate dev
   npm run dev

   # Frontend
   cd frontend
   npm install
   npm run dev
   ```

2. **Database Management**
   ```bash
   # Create migration
   npx prisma migrate dev --name feature_name

   # Apply migrations
   npx prisma migrate deploy

   # Reset database
   npx prisma migrate reset
   ```

### Current Features

1. **User Management**
   - User registration with email/password
   - Secure login with JWT
   - Password hashing
   - Protected routes
   - User profile management

2. **Resume Processing**
   - File upload interface
   - Backend storage
   - File type validation
   - Size restrictions
   - Progress tracking

3. **Test Management**
   - Test creation
   - Test listing
   - Test details view
   - Basic CRUD operations

### Planned Features

1. **AI Integration**
   - Google Gemini API integration
   - Resume parsing and analysis
   - Skill extraction
   - Test generation based on skills

2. **Code Execution**
   - Monaco Editor integration
   - Secure code execution
   - Real-time output
   - Multiple language support

3. **Evaluation System**
   - Automated test case execution
   - AI-powered code review
   - Performance metrics
   - Detailed feedback generation

### Code Execution Service Architecture

#### Overview
The code execution service is built with Python Flask and deployed on Render. It's designed to handle code execution for multiple programming languages securely and efficiently.

#### Multi-Language Support Implementation
1. **Request Handling**
   ```python
   @app.route('/execute', methods=['POST'])
   def execute_code():
       language = request.json.get('language')
       code = request.json.get('code')
       return execute_in_language(language, code)
   ```

2. **Language-Specific Execution**
   ```python
   def execute_in_language(language: str, code: str) -> dict:
       LANGUAGE_CONFIGS = {
           'javascript': {
               'file_ext': '.js',
               'compile_cmd': None,
               'run_cmd': ['node', '{file}'],
               'runtime_req': 'node'
           },
           'python': {
               'file_ext': '.py',
               'compile_cmd': None,
               'run_cmd': ['python3', '{file}'],
               'runtime_req': 'python3'
           },
           'java': {
               'file_ext': '.java',
               'compile_cmd': ['javac', '{file}'],
               'run_cmd': ['java', '{class_name}'],
               'runtime_req': 'openjdk'
           }
       }
   ```

3. **Secure Execution Process**
   - Create temporary directory with unique ID
   - Write code to file with appropriate extension
   - Execute in subprocess with timeout
   - Capture stdout, stderr, and exit code
   - Clean up temporary files

4. **Runtime Requirements**
   The Render instance must have these installed:
   - Node.js (for JavaScript)
   - Python 3.x (already available)
   - OpenJDK (for Java)
   - GCC (for C/C++)
   - Additional runtimes as needed

#### Security Measures
1. **Isolation**
   - Each execution runs in a separate subprocess
   - Resource limits (CPU, memory, time)
   - Network access restrictions
   - File system restrictions

2. **Input Validation**
   - Code size limits
   - Language validation
   - Syntax checking before execution
   - Blacklisted operations detection

3. **Resource Management**
   - Execution timeouts
   - Memory usage limits
   - Concurrent execution limits
   - Automatic cleanup of temp files

#### API Interface
```typescript
interface ExecuteCodeRequest {
  language: string;       // Programming language
  code: string;          // Source code
  timeout?: number;      // Max execution time (ms)
  input?: string;        // stdin input if needed
}

interface ExecuteCodeResponse {
  success: boolean;      // Execution status
  output: string;        // stdout output
  error?: string;        // stderr if any
  exitCode: number;      // Process exit code
  executionTime: number; // Time taken in ms
  memory?: number;       // Memory used in MB
}
```

#### Implementation Plan

1. **Phase 1: Basic Execution (Current)**
   - [x] Python execution support
   - [x] Basic subprocess management
   - [x] Error handling
   - [x] Output capture

2. **Phase 2: Multi-Language Support**
   - [ ] JavaScript/Node.js support
   - [ ] Java support
   - [ ] Language configuration system
   - [ ] Runtime verification

3. **Phase 3: Security Enhancements**
   - [ ] Resource limiting
   - [ ] Code sanitization
   - [ ] Process isolation
   - [ ] Network restrictions

4. **Phase 4: Advanced Features**
   - [ ] Test case execution
   - [ ] Performance metrics
   - [ ] Memory profiling
   - [ ] Concurrent execution

#### Deployment Requirements

1. **Render Configuration**
   ```yaml
   buildCommand: pip install -r requirements.txt
   startCommand: gunicorn app:app
   envVars:
     - key: MAX_EXECUTION_TIME
       value: 30000
     - key: MAX_MEMORY_MB
       value: 512
   ```

2. **Runtime Installation**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install Java
   sudo apt-get install -y openjdk-17-jdk

   # Install GCC
   sudo apt-get install -y build-essential
   ```

3. **Monitoring**
   - Resource usage tracking
   - Error rate monitoring
   - Execution time metrics
   - Concurrent execution stats

### Environment Variables

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"

# File Upload
UPLOAD_DIR="uploads"
MAX_FILE_SIZE=5242880 # 5MB

# Frontend
VITE_API_URL="http://localhost:3001/api"
```

### Dependencies

**Backend:**
- express: Web framework
- prisma: ORM
- jsonwebtoken: Authentication
- bcrypt: Password hashing
- multer: File uploads
- cors: CORS support
- dotenv: Environment variables

**Frontend:**
- react: UI library
- @mantine/core: UI components
- @mantine/hooks: Utility hooks
- @mantine/form: Form handling
- axios: API client
- react-router-dom: Routing

This documentation provides a comprehensive overview of the current implementation and can be used for knowledge transfer or onboarding new team members.
