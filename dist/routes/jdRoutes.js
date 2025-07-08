"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jdController_1 = require("../controllers/jdController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
const router = (0, express_1.Router)();
// All routes are protected
router.use(auth_1.authenticateUser);
// POST /api/jds - Create a new Job Description
router.post('/', jdController_1.jdController.createJd);
// GET /api/jds - Get all Job Descriptions
router.get('/', jdController_1.jdController.getJds);
// GET /api/jds/:id - Get a single Job Description by ID
router.get('/:id', jdController_1.jdController.getJdById);
// PUT /api/jds/:id - Update a Job Description by ID
router.put('/:id', jdController_1.jdController.updateJd);
// DELETE /api/jds/:id - Delete a Job Description by ID
router.delete('/:id', jdController_1.jdController.deleteJd);
// POST /api/jds/:id/resumes - Upload a resume for a specific JD
router.post('/:id/resumes', multer_1.upload.single('file'), jdController_1.jdController.uploadResumeForJd);
// POST /api/jds/:id/send-tests - Send test links to selected candidates
router.post('/:id/send-tests', jdController_1.jdController.sendTestsToCandiidates);
exports.default = router;
