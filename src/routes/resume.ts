import { Router } from 'express';
import { upload } from '../middleware/multer';
import fs from 'fs';
import { Request, Response } from 'express';
import { getPrimaryLanguage } from '../utils/projectUtils';
import { prisma } from '../prismaClient';
import { GeminiService } from '../services/ai/geminiService';

const router = Router();
// Upload resume
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    console.log('Received resume upload request');
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Save resume details to database
    console.log('Creating resume record in database...');
    const resume = await prisma.resume.create({
      data: {
        email,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
      }
    });

    // Return success response with resume details
    console.log('Resume saved successfully:', resume);
    res.status(201).json({
      message: 'Resume uploaded successfully',
      resume
    });
  } catch (error) {
    console.error('Error uploading resume:', error instanceof Error ? error.message : error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace available');
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});

// Analyze resume
router.post('/:resumeId/analyze', async (req: Request, res: Response) => {
  const { resumeId } = req.params;
  console.log(`Starting resume analysis for resume ID: ${resumeId}`);

  try {
    // Get resume from database
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId }
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Read resume file content
    const resumeText = await fs.promises.readFile(resume.path, 'utf-8');

    // Initialize Gemini service
    const geminiService = new GeminiService();

    // Analyze resume
    const analysis = await geminiService.analyzeResume(resumeText);

    // Update resume with analysis
    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        analysis: analysis as any
      }
    });

    res.json({
      message: 'Resume analyzed successfully',
      analysis: updatedResume.analysis
    });
  } catch (error) {
    console.error('Error analyzing resume:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

/*
// Generate project based on resume analysis
router.post('/:resumeId/generate-project', async (req: Request, res: Response) => {
  const { resumeId } = req.params;
  console.log(`Starting project generation for resume ID: ${resumeId}`);

  try {
    // Get resume with analysis from database
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId }
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    if (!resume.analysis) {
      return res.status(400).json({ error: 'Resume must be analyzed first' });
    }

    // Initialize Gemini service
    const geminiService = new GeminiService();

    // Generate project
    const project = await geminiService.generateProject(resume.analysis as any);

    // Get system user
    const systemUser = await prisma.user.findUnique({
      where: { email: 'system@bansy.ai' }
    });

    if (!systemUser) {
      throw new Error('System user not found');
    }

    // Convert project files to array format with proper types
    const projectFilesArray = project.projectFiles.map(file => ({
      path: file.path,
      content: file.content
    }));

    // Save project to database with proper relations
    const savedProject = await prisma.test.create({
      data: {
        title: project.title,
        description: project.description,
        difficulty: project.difficulty,
        language: getPrimaryLanguage(project),
        requirements: project.requirements as any,
        // resumeId: resumeId, // TODO: Refactor for JD-centric workflow
        // creatorId: req.body.userId || systemUser.id, // TODO: Refactor for JD-centric workflow
        // Create test cases as related records
        testCases: {
          create: (project.testCases as Array<{
            description: string;
            input?: string;
            expectedOutput: string;
          }>).map(tc => ({
            description: tc.description,
            input: tc.input,
            expectedOutput: tc.expectedOutput
          }))
        },
        // Create files as related records using the converted array
        files: {
          create: projectFilesArray
        }
      },
      include: {
        testCases: true,
        files: true
      }
    });

    res.json({
      message: 'Project generated successfully',
      project: savedProject
    });
  } catch (error) {
    console.error('Error generating project:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Failed to generate project' });
  }
});
*/

export default router;
