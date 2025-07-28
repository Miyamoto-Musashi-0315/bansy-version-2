import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { UserRequest } from '../types';
import { GeminiService } from '../services/ai/geminiService';
import pdf from 'pdf-parse';
import fs from 'fs';
import GithubService from '../services/githubService';
import { config } from '../config';

// Initialize AI service
const geminiService = new GeminiService();

// Map the orgName from config to the expected organizationName for the service
const githubConfig = {
  ...config.github,
  organizationName: config.github.orgName,
};
const githubService = new GithubService(githubConfig);

export const jdController = {
  /**
   * Creates a new Job Description
   */
  async createJd(req: UserRequest, res: Response) {
    console.log('jdController.createJd: START');
    try {
      const {
        title,
        description,
        minExperience,
        maxExperience,
        languages,
        projectContext,
      } = req.body;
      const creatorId = req.user?.id;

      if (!creatorId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (
        !title ||
        !description ||
        minExperience === undefined ||
        maxExperience === undefined ||
        !languages
      ) {
        return res
          .status(400)
          .json({ error: 'All required fields must be provided.' });
      }

      const newJd = await prisma.jobDescription.create({
        data: {
          title,
          description,
          minExperience: parseInt(minExperience, 10),
          maxExperience: parseInt(maxExperience, 10),
          languages,
          projectContext,
          creator: {
            connect: { id: creatorId },
          },
        },
      });

      console.log('jdController.createJd: END - JD created successfully');
      res.status(201).json(newJd);
    } catch (error) {
      console.error('jdController.createJd: ERROR creating JD:', error);
      res.status(500).json({ error: 'Failed to create job description' });
    }
  },

  /**
   * Gets all Job Descriptions
   */
  async getJds(req: Request, res: Response) {
    console.log('jdController.getJds: START');
    try {
      const jds = await prisma.jobDescription.findMany({
        include: {
          _count: {
            select: { candidates: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      console.log('jdController.getJds: END - Fetched all JDs');
      res.json(jds);
    } catch (error) {
      console.error('jdController.getJds: ERROR fetching JDs:', error);
      res.status(500).json({ error: 'Failed to fetch job descriptions' });
    }
  },

  /**
   * Gets a single Job Description by ID
   */
  async getJdById(req: Request, res: Response) {
    console.log('jdController.getJdById: START');
    try {
      const { id } = req.params;
      const jd = await prisma.jobDescription.findUnique({
        where: { id },
        include: {
          test: true,
          candidates: {
            include: {
              resume: true,
            },
          },
        },
      });

      if (!jd) {
        return res.status(404).json({ error: 'Job description not found' });
      }

      console.log('jdController.getJdById: END - Fetched JD by ID');
      res.json(jd);
    } catch (error) {
      console.error('jdController.getJdById: ERROR fetching JD:', error);
      res.status(500).json({ error: 'Failed to fetch job description' });
    }
  },

  /**
   * Updates a Job Description by ID
   */
  async updateJd(req: UserRequest, res: Response) {
    console.log('jdController.updateJd: START');
    try {
      const { id } = req.params;
      const {
        title,
        description,
        minExperience,
        maxExperience,
        languages,
        projectContext,
      } = req.body;
      const creatorId = req.user?.id;

      const existingJd = await prisma.jobDescription.findUnique({
        where: { id },
      });

      if (!existingJd) {
        return res.status(404).json({ error: 'Job description not found' });
      }

      if (existingJd.creatorId !== creatorId) {
        return res
          .status(403)
          .json({ error: 'Forbidden: You can only update your own job descriptions' });
      }

      const updatedJd = await prisma.jobDescription.update({
        where: { id },
        data: {
          title,
          description,
          minExperience:
            minExperience !== undefined
              ? parseInt(minExperience, 10)
              : undefined,
          maxExperience:
            maxExperience !== undefined
              ? parseInt(maxExperience, 10)
              : undefined,
          languages,
          projectContext,
        },
      });

      console.log('jdController.updateJd: END - JD updated successfully');
      res.json(updatedJd);
    } catch (error) {
      console.error('jdController.updateJd: ERROR updating JD:', error);
      res.status(500).json({ error: 'Failed to update job description' });
    }
  },

  /**
   * Deletes a Job Description by ID
   */
  async deleteJd(req: UserRequest, res: Response) {
    console.log('jdController.deleteJd: START');
    try {
      const { id } = req.params;
      const creatorId = req.user?.id;

      const existingJd = await prisma.jobDescription.findUnique({
        where: { id },
      });

      if (!existingJd) {
        return res.status(404).json({ error: 'Job description not found' });
      }

      if (existingJd.creatorId !== creatorId) {
        return res.status(403).json({ error: 'Forbidden: You can only delete your own job descriptions' });
      }

      await prisma.jobDescription.delete({
        where: { id },
      });

      console.log('jdController.deleteJd: END - JD deleted successfully');
      res.status(204).send();
    } catch (error) {
      console.error('jdController.deleteJd: ERROR deleting JD:', error);
      res.status(500).json({ error: 'Failed to delete job description' });
    }
  },

  /**
   * Uploads a resume for a specific Job Description
   */
  async uploadResumeForJd(req: UserRequest, res: Response) {
    console.log('jdController.uploadResumeForJd: START');
    try {
      const { id: jdId } = req.params;
      const { email } = req.body;
      const file = req.file;

      if (!jdId) {
        return res.status(400).json({ error: 'Job Description ID is required.' });
      }
      if (!file) {
        return res.status(400).json({ error: 'Resume file is required.' });
      }
      if (!email) {
        return res.status(400).json({ error: 'Candidate email is required.' });
      }

      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
      });

      if (!jobDescription) {
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      // Parse the resume PDF to extract text
      const fileBuffer = fs.readFileSync(file.path);
      const pdfData = await pdf(fileBuffer);
      const resumeText = pdfData.text;

      // Analyze the resume against the JD using AI
      console.log('jdController.uploadResumeForJd: Starting AI analysis...');
      const analysis = await geminiService.analyzeResumeForJd(resumeText, jobDescription);
      console.log('jdController.uploadResumeForJd: AI analysis completed. Score:', analysis.suitabilityScore);

      // Create the resume record with analysis
      const resume = await prisma.resume.create({
        data: {
          email: analysis.candidateEmail || email,
          filename: file.originalname,
          path: file.path || 'temporary-path',
          size: file.size,
          analysis: analysis as any,
        },
      });

      // Create the candidate record with suitability score
      const newCandidate = await prisma.candidate.create({
        data: {
          status: 'PendingReview',
          suitabilityScore: analysis.suitabilityScore,
          suitabilityAnalysis: analysis.analysis as any,
          jobDescription: {
            connect: { id: jdId },
          },
          resume: {
            connect: { id: resume.id },
          },
        },
        include: {
          resume: true,
        },
      });

      console.log('jdController.uploadResumeForJd: END - Resume uploaded, analyzed, and candidate created');
      res.status(201).json({
        message: 'Resume uploaded and analyzed successfully',
        candidate: newCandidate,
        analysis: {
          suitabilityScore: analysis.suitabilityScore,
          summary: analysis.analysis.summary,
        },
      });
    } catch (error) {
      console.error('jdController.uploadResumeForJd: ERROR uploading resume:', error);
      // Check for Prisma's unique constraint violation error
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        return res.status(409).json({
          error: 'This candidate has already applied for this job description.',
        });
      }
      res.status(500).json({ error: 'Failed to upload and analyze resume' });
    }
  },

  /**
   * Sends test links to selected candidates for a specific Job Description
   */
  async sendTestsToCandiidates(req: UserRequest, res: Response) {
    console.log('jdController.sendTestsToCandiidates: START');
    try {
      const { id: jdId } = req.params;
      const { candidateIds } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!candidateIds || !Array.isArray(candidateIds) || candidateIds.length === 0) {
        return res.status(400).json({ error: 'Candidate IDs are required.' });
      }

      // Verify the JD exists and has a test
      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
        include: {
          test: true,
        },
      });

      if (!jobDescription) {
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      if (!jobDescription.test) {
        return res.status(400).json({ error: 'No test project has been generated for this JD yet.' });
      }

      // Get the selected candidates
      const candidates = await prisma.candidate.findMany({
        where: {
          id: { in: candidateIds },
          jobDescriptionId: jdId,
        },
        include: {
          resume: true,
        },
      });

      if (candidates.length === 0) {
        return res.status(404).json({ error: 'No eligible candidates found.' });
      }

      // Create individual repositories with CI/CD workflows for each candidate
      console.log(`Creating individual repositories for ${candidates.length} candidates...`);
      
      // Generate fresh project template with CI/CD components
      const projectTemplate = await geminiService.generateProjectFromJd({
        title: jobDescription.title,
        description: jobDescription.description,
        minExperience: jobDescription.minExperience,
        maxExperience: jobDescription.maxExperience,
        languages: jobDescription.languages,
        projectContext: jobDescription.projectContext,
      });

      console.log(`Generated project with ${projectTemplate.githubWorkflows?.length || 0} workflows and ${projectTemplate.githubIssues?.length || 0} issues`);

      // Create individual repositories for each candidate
      const candidateResults: Array<{
        candidateId: string;
        email: string;
        repoUrl: string;
        success: boolean;
        error?: string;
      }> = [];

      for (const candidate of candidates) {
        try {
          console.log(`Creating repository for candidate: ${candidate.resume.email}`);
          
          // Create individual repository with CI/CD and issues
          const { repoUrl, cloneUrl } = await githubService.createCandidateRepo(
            jobDescription.test.id,
            candidate.id,
            projectTemplate.projectFiles,
            projectTemplate.githubWorkflows || [],
            projectTemplate.githubIssues || []
          );

          candidateResults.push({
            candidateId: candidate.id,
            email: candidate.resume.email,
            repoUrl,
            success: true,
          });

          // Update candidate status to 'TestSent'
          await prisma.candidate.update({
            where: { id: candidate.id },
            data: {
              status: 'TestSent',
            },
          });

          console.log(`✅ Repository created for ${candidate.resume.email}: ${repoUrl}`);
        } catch (candidateError: any) {
          console.error(`❌ Failed to create repository for candidate ${candidate.id}:`, candidateError);
          candidateResults.push({
            candidateId: candidate.id,
            email: candidate.resume.email,
            repoUrl: '',
            success: false,
            error: candidateError.message,
          });
        }
      }

      const successfulRepos = candidateResults.filter(r => r.success);
      const failedRepos = candidateResults.filter(r => !r.success);

      console.log(`jdController.sendTestsToCandiidates: END - ${successfulRepos.length} successful, ${failedRepos.length} failed`);
      
      // TODO: In a real application, you would send emails here with individual repository links
      console.log('Individual repository links would be sent to:');
      successfulRepos.forEach(result => {
        console.log(`- ${result.email}: ${result.repoUrl}`);
      });

      if (failedRepos.length > 0) {
        console.warn('Failed to create repositories for:');
        failedRepos.forEach(result => {
          console.warn(`- ${result.email}: ${result.error}`);
        });
      }

      res.status(200).json({
        message: `Individual repositories created for ${successfulRepos.length}/${candidateResults.length} candidates`,
        successful: successfulRepos.length,
        failed: failedRepos.length,
        results: candidateResults.map(r => ({
          candidateId: r.candidateId,
          email: r.email,
          testUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/test/${jobDescription.test?.id}`,
          githubRepository: r.repoUrl,
          success: r.success,
          error: r.error,
        })),
        projectInfo: {
          title: projectTemplate.title,
          difficulty: projectTemplate.difficulty,
          cicdWorkflows: projectTemplate.githubWorkflows?.length || 0,
          githubIssues: projectTemplate.githubIssues?.length || 0,
        },
      });
    } catch (error) {
      console.error('jdController.sendTestsToCandiidates: ERROR sending tests:', error);
      res.status(500).json({ error: 'Failed to create individual repositories for candidates' });
    }
  },

  /**
   * Get real-time assessment tracking data for a Job Description
   */
  async getAssessmentTracking(req: UserRequest, res: Response) {
    const { id: jdId } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      console.log(`[Assessment Tracking] Fetching tracking data for JD: ${jdId}`);

      // Get the Job Description with all related data
      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
        include: {
          test: {
            include: {
              submissions: {
                include: {
                  user: true
                }
              },
              submissionEvents: {
                include: {
                  candidate: {
                    include: {
                      resume: true
                    }
                  }
                },
                orderBy: {
                  receivedAt: 'desc'
                }
              }
            }
          },
          candidates: {
            include: {
              resume: true,
              submissionEvents: {
                orderBy: {
                  receivedAt: 'desc'
                }
              }
            }
          }
        }
      });

      if (!jobDescription) {
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      // Calculate real-time tracking metrics
      const trackingData = {
        overview: {
          totalCandidates: jobDescription.candidates.length,
          testsSent: jobDescription.candidates.filter(c => c.status === 'TestSent' || c.status === 'InProgress' || c.status === 'Completed').length,
          inProgress: jobDescription.candidates.filter(c => c.status === 'InProgress').length,
          completed: jobDescription.candidates.filter(c => c.status === 'Completed').length,
          avgSuitabilityScore: jobDescription.candidates.reduce((sum, c) => sum + (c.suitabilityScore || 0), 0) / jobDescription.candidates.length || 0
        },
        candidates: jobDescription.candidates.map(candidate => {
          // Get latest activity from submission events
          const latestEvent = candidate.submissionEvents[0];
          const totalEvents = candidate.submissionEvents.length;
          const pushEvents = candidate.submissionEvents.filter(e => e.eventType === 'push').length;
          const workflowEvents = candidate.submissionEvents.filter(e => e.eventType.startsWith('workflow_')).length;
          const lastActivityAt = latestEvent?.receivedAt || candidate.updatedAt;

          // Calculate progress percentage based on activity
          let progressPercentage = 0;
          if (candidate.status === 'TestSent') {
            progressPercentage = 10; // Just sent
          } else if (candidate.status === 'InProgress') {
            // Base progress of 25% for starting, plus additional based on activity
            progressPercentage = 25 + Math.min(50, pushEvents * 10); // Up to 75% for activity
          } else if (candidate.status === 'Completed') {
            progressPercentage = 100;
          }

          return {
            id: candidate.id,
            email: candidate.resume.email,
            status: candidate.status,
            suitabilityScore: candidate.suitabilityScore,
            progressPercentage,
            activity: {
              totalEvents,
              pushEvents,
              workflowEvents,
              lastActivityAt,
              timeElapsed: lastActivityAt ? Date.now() - new Date(lastActivityAt).getTime() : null
            },
            timeline: candidate.submissionEvents.slice(0, 10).map(event => ({
              type: event.eventType,
              timestamp: event.receivedAt,
              details: {
                repoName: event.repoName,
                branch: event.branch,
                pusher: event.pusher
              }
            }))
          };
        }),
        recentActivity: jobDescription.test?.submissionEvents.slice(0, 20).map(event => ({
          type: event.eventType,
          timestamp: event.receivedAt,
          candidate: event.candidate ? {
            id: event.candidate.id,
            email: event.candidate.resume?.email || 'Unknown'
          } : null,
          details: {
            repoName: event.repoName,
            branch: event.branch,
            pusher: event.pusher,
            commitSha: event.commitSha?.substring(0, 7) || 'N/A'
          }
        })) || []
      };

      console.log(`[Assessment Tracking] Returning tracking data for ${trackingData.overview.totalCandidates} candidates`);
      res.json(trackingData);

    } catch (error: any) {
      console.error('[Assessment Tracking] Error fetching tracking data:', error);
      res.status(500).json({ error: 'Failed to fetch assessment tracking data' });
    }
  },

  /**
   * Get detailed candidate assessment data
   */
  async getCandidateAssessmentDetails(req: UserRequest, res: Response) {
    const { candidateId } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      console.log(`[Candidate Assessment] Fetching details for candidate: ${candidateId}`);

      const candidate = await prisma.candidate.findUnique({
        where: { id: candidateId },
        include: {
          resume: true,
          jobDescription: {
            include: {
              test: {
                include: {
                  submissions: {
                    where: {
                      // Find submissions that might be related to this candidate
                      // Since submissions don't directly link to candidates, we'll get all and filter
                    },
                    orderBy: {
                      createdAt: 'desc'
                    }
                  },
                  testCases: true
                }
              }
            }
          },
          submissionEvents: {
            orderBy: {
              receivedAt: 'desc'
            }
          }
        }
      });

      if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }

      // Find repository name pattern for this candidate
      const candidateIdPrefix = candidate.id.split('-')[0];
      const testIdPrefix = candidate.jobDescription.test?.id.substring(0, 8) || '';
      
      // Get CI/CD results from submissions (40% component)
      const cicdSubmission = candidate.jobDescription.test?.submissions.find(s => 
        s.result && 
        typeof s.result === 'object' && 
        'repoName' in s.result &&
        typeof s.result.repoName === 'string' &&
        s.result.repoName.includes(candidateIdPrefix)
      );

      // Type-safe access to submission result
      const submissionResult = cicdSubmission?.result as any;

      // Calculate assessment metrics
      const assessmentDetails = {
        candidate: {
          id: candidate.id,
          email: candidate.resume.email,
          status: candidate.status,
          suitabilityScore: candidate.suitabilityScore,
          suitabilityAnalysis: candidate.suitabilityAnalysis
        },
        progress: {
          currentPhase: candidate.status,
          timeElapsed: Date.now() - new Date(candidate.createdAt).getTime(),
          lastActivity: candidate.submissionEvents[0]?.receivedAt || candidate.updatedAt
        },
        scores: {
          resumeScore: candidate.suitabilityScore || 0, // Initial resume score
          cicdScore: submissionResult?.cicdScore || null, // 40% component
          llmScore: submissionResult?.llmScore || null, // 60% component (to be implemented)
          totalScore: submissionResult?.totalScore || null // Combined score
        },
        activity: {
          totalEvents: candidate.submissionEvents.length,
          eventBreakdown: candidate.submissionEvents.reduce((acc: Record<string, number>, event) => {
            acc[event.eventType] = (acc[event.eventType] || 0) + 1;
            return acc;
          }, {}),
          timeline: candidate.submissionEvents.map(event => ({
            type: event.eventType,
            timestamp: event.receivedAt,
            details: {
              repoName: event.repoName,
              branch: event.branch,
              pusher: event.pusher,
              commitSha: event.commitSha?.substring(0, 7) || 'N/A'
            }
          }))
        },
        testResults: cicdSubmission ? {
          status: cicdSubmission.status,
          submittedAt: cicdSubmission.createdAt,
          results: cicdSubmission.result
        } : null
      };

      console.log(`[Candidate Assessment] Returning details for candidate: ${candidate.resume.email}`);
      res.json(assessmentDetails);

    } catch (error: any) {
      console.error('[Candidate Assessment] Error fetching candidate details:', error);
      res.status(500).json({ error: 'Failed to fetch candidate assessment details' });
    }
  },

  /**
   * Get final assessment results for completed candidates (Milestone 9.7)
   */
  async getFinalAssessmentResults(req: UserRequest, res: Response) {
    const { id: jdId } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      console.log(`[Final Assessment] Fetching results for JD: ${jdId}`);

      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
        include: {
          test: {
            include: {
              submissions: {
                where: {
                  status: 'completed',
                  aiScore: { not: null }
                },
                include: {
                  user: true
                },
                orderBy: {
                  aiScore: 'desc' // Order by highest score first
                }
              }
            }
          },
          candidates: {
            where: {
              status: 'Completed'
            },
            include: {
              resume: true
            }
          }
        }
      });

      if (!jobDescription) {
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      // Process assessment results for each completed candidate
      const assessmentResults = await Promise.all(
        jobDescription.candidates.map(async (candidate) => {
          // Find the corresponding submission with AI evaluation
          const submission = jobDescription.test?.submissions.find(s => {
            const submissionResult = s.result as any;
            return submissionResult?.repoName?.includes(candidate.id.split('-')[0]);
          });

          if (!submission || !submission.result) {
            return {
              candidate: {
                id: candidate.id,
                email: candidate.resume.email,
                suitabilityScore: candidate.suitabilityScore
              },
              status: 'incomplete',
              message: 'Assessment not completed'
            };
          }

          const result = submission.result as any;
          const feedback = submission.feedback as any;

          return {
            candidate: {
              id: candidate.id,
              email: candidate.resume.email,
              suitabilityScore: candidate.suitabilityScore,
              appliedAt: candidate.createdAt
            },
            assessment: {
              finalScore: result.totalScore,
              grade: result.grade,
              recommendation: result.recommendation,
              completedAt: submission.createdAt
            },
            scores: {
              resume: candidate.suitabilityScore || 0,
              cicd: result.cicdScore || 0,
              llm: result.llmScore || 0,
              total: result.totalScore || 0
            },
            breakdown: {
              codeQuality: result.llmEvaluation?.breakdown?.codeQuality || null,
              architecture: result.llmEvaluation?.breakdown?.architecture || null,
              innovation: result.llmEvaluation?.breakdown?.innovation || null,
              bestPractices: result.llmEvaluation?.breakdown?.bestPractices || null,
              performance: result.llmEvaluation?.breakdown?.performance || null,
              security: result.llmEvaluation?.breakdown?.security || null
            },
            feedback: {
              summary: feedback?.summary || result.finalAssessment?.summary,
              strengths: feedback?.strengths || result.llmEvaluation?.strengths || [],
              improvements: feedback?.improvements || result.llmEvaluation?.improvements || []
            },
            status: 'completed'
          };
        })
      );

      // Calculate summary statistics
      const completedAssessments = assessmentResults.filter(r => r.status === 'completed' && r.scores && r.assessment);
      const avgScore = completedAssessments.reduce((sum, r) => sum + (r.scores?.total || 0), 0) / completedAssessments.length || 0;
      const gradeDistribution = completedAssessments.reduce((acc: Record<string, number>, r) => {
        const grade = r.assessment?.grade;
        if (grade) {
          acc[grade] = (acc[grade] || 0) + 1;
        }
        return acc;
      }, {});

      const results = {
        overview: {
          position: jobDescription.title,
          totalCandidates: jobDescription.candidates.length,
          completedAssessments: completedAssessments.length,
          averageScore: Math.round(avgScore * 10) / 10,
          gradeDistribution,
          assessmentDate: new Date().toISOString()
        },
        candidates: assessmentResults,
        topPerformers: completedAssessments
          .filter(r => r.scores && r.assessment)
          .sort((a, b) => (b.scores?.total || 0) - (a.scores?.total || 0))
          .slice(0, 5), // Top 5 candidates
        insights: {
          strongestArea: findStrongestArea(completedAssessments),
          commonWeaknesses: findCommonWeaknesses(completedAssessments),
          recommendedHires: completedAssessments.filter(r => 
            r.assessment?.recommendation === 'Strong Hire' || r.assessment?.recommendation === 'Hire'
          ).length
        }
      };

      console.log(`[Final Assessment] Returning results for ${completedAssessments.length} completed assessments`);
      res.json(results);

    } catch (error: any) {
      console.error('[Final Assessment] Error fetching results:', error);
      res.status(500).json({ error: 'Failed to fetch final assessment results' });
    }
  }
};

/**
 * Helper function to find the strongest technical area across candidates
 */
function findStrongestArea(assessments: any[]): string {
  const areas = ['codeQuality', 'architecture', 'innovation', 'bestPractices', 'performance', 'security'];
  const areaAverages = areas.map(area => {
    const scores = assessments
      .map(a => a.breakdown[area]?.score || 0)
      .filter(score => score > 0);
    
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length || 0;
    return { area, average };
  });

  const strongest = areaAverages.reduce((max, current) => 
    current.average > max.average ? current : max
  );

  return strongest.area;
}

/**
 * Helper function to find common weaknesses across candidates
 */
function findCommonWeaknesses(assessments: any[]): string[] {
  const allImprovements = assessments.flatMap(a => a.feedback.improvements || []);
  const improvementCounts: Record<string, number> = {};

  allImprovements.forEach(improvement => {
    // Simple keyword matching for common themes
    const keywords = ['error handling', 'testing', 'documentation', 'security', 'performance', 'architecture'];
    keywords.forEach(keyword => {
      if (improvement.toLowerCase().includes(keyword)) {
        improvementCounts[keyword] = (improvementCounts[keyword] || 0) + 1;
      }
    });
  });

  return Object.entries(improvementCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([keyword]) => keyword);
}
