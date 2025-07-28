"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiController_1 = require("../controllers/aiController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
const router = express_1.default.Router();
// All AI routes are protected
router.use(auth_1.authenticateUser);
// Analyze a resume for a given Job Description
router.post('/jds/:jdId/analyze-resume', multer_1.upload.single('file'), aiController_1.aiController.analyzeResumeForJd);
// Generate a coding project from a Job Description
router.post('/jds/:jdId/generate-project', aiController_1.aiController.generateProjectForJd);
// Create individual candidate repositories with CI/CD workflows
router.post('/jds/:jdId/create-candidate-repos', aiController_1.aiController.createCandidateRepositories);
/*
// Test case generation endpoint - This functionality is not yet implemented in the JD-centric workflow
router.post('/project/:projectId/generate-tests', aiController.generateTestCases);
*/
exports.default = router;
