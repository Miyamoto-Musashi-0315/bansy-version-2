import { prisma } from '../../prismaClient';
import { GeminiService } from './geminiService';
import GithubService from '../githubService';
import { config } from '../../config';

// Initialize services
const geminiService = new GeminiService();
const githubService = new GithubService({
  ...config.github,
  organizationName: config.github.orgName,
});

/**
 * Fetch repository contents from GitHub
 */
async function fetchRepositoryContents(repoName: string): Promise<Array<{ path: string; content: string }>> {
  try {
    console.log(`[Evaluation] Fetching contents for repository: ${repoName}`);
    const files = await githubService.getRepositoryContents(repoName);
    console.log(`[Evaluation] Fetched ${files.length} files from repository`);
    return files;
  } catch (error) {
    console.error('[Evaluation] Error fetching repository contents:', error);
    throw new Error(`Failed to fetch repository contents: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Trigger LLM evaluation for completed CI/CD assessment (60% scoring component)
 */
export async function triggerLLMEvaluation(candidateId: string, testId: string, repoName: string) {
  console.log(`[Evaluation] Triggering LLM evaluation for candidate ${candidateId}, test ${testId}`);
  
  try {
    // Get candidate and test data
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        resume: true,
        jobDescription: {
          include: {
            test: {
              include: {
                testCases: true
              }
            }
          }
        }
      }
    });

    if (!candidate || !candidate.jobDescription.test) {
      console.log(`[Evaluation] No candidate or test found for ID: ${candidateId}`);
      return;
    }

    console.log(`[Evaluation] Starting LLM evaluation for ${candidate.resume.email}`);

    // Fetch repository contents using GitHub API
    const repoContents = await fetchRepositoryContents(repoName);
    
    // Get CI/CD results from latest submission
    const latestSubmission = await prisma.submission.findFirst({
      where: { testId },
      orderBy: { createdAt: 'desc' }
    });

    const cicdResults = latestSubmission?.result as any;

    // Derive CI/CD score (0 or 40) based on whether ALL test cases passed
    let cicdScore = 0;
    if (cicdResults) {
      const passedCount = (
        cicdResults.passed ??
        cicdResults?.testResults?.passed ??
        (Array.isArray(cicdResults?.testResults?.results)
          ? cicdResults.testResults.results.filter((r: any) => r.passed).length
          : 0)
      );
      const totalCount = (
        cicdResults.total ??
        cicdResults?.testResults?.total ??
        (Array.isArray(cicdResults?.testResults?.results)
          ? cicdResults.testResults.results.length
          : 0)
      );

      if (totalCount && passedCount === totalCount) {
        cicdScore = 40; // All tests passed
      }

      // Persist the computed score back onto the results object for reference
      cicdResults.cicdScore = cicdScore;
    }

    // Prepare data for LLM evaluation
    const repoData = {
      repoUrl: candidate.jobDescription.test.gitRepoUrl || '',
      repoName,
      files: repoContents,
      cicdResults: {
        passed: cicdResults?.testResults?.results?.filter((r: any) => r.passed).length || 0,
        total: cicdResults?.testResults?.results?.length || 0,
        details: cicdResults
      }
    };

    const jobDescription = {
      title: candidate.jobDescription.title,
      description: candidate.jobDescription.description,
      languages: candidate.jobDescription.languages,
      minExperience: candidate.jobDescription.minExperience,
      maxExperience: candidate.jobDescription.maxExperience,
      projectContext: candidate.jobDescription.projectContext
    };

    // Run comprehensive LLM evaluation (60% component)
    console.log(`[Evaluation] Running LLM code evaluation...`);
    const llmEvaluation = await geminiService.evaluateCodeRepository(
      repoData,
      jobDescription,
      // Map the test cases to match the expected format
      candidate.jobDescription.test.testCases.map(tc => ({
        description: tc.description,
        expectedOutput: tc.expectedOutput,
        category: tc.category || undefined,
        difficulty: tc.difficulty || undefined
      }))
    );

    console.log(`[Evaluation] LLM evaluation completed. Score: ${llmEvaluation.totalScore}/60`);

    // Generate final hybrid assessment report (40% CI/CD + 60% LLM)
    console.log(`[Evaluation] Generating final assessment report...`);
    const finalAssessment = await geminiService.generateFinalAssessment(
      cicdScore,
      llmEvaluation,
      {
        email: candidate.resume.email,
        suitabilityScore: candidate.suitabilityScore || 0,
        position: candidate.jobDescription.title
      }
    );

    console.log(`[Evaluation] Final assessment completed. Total score: ${finalAssessment.finalScore}/100, Grade: ${finalAssessment.grade}`);

    // Save comprehensive results to database
    await prisma.submission.create({
      data: {
        status: 'completed',
        result: {
          // Hybrid scoring system (40% + 60%)
          cicdScore,
          llmScore: llmEvaluation.totalScore,
          totalScore: finalAssessment.finalScore,
          grade: finalAssessment.grade,
          recommendation: finalAssessment.recommendation,
          
          // Detailed breakdown
          llmEvaluation,
          finalAssessment,
          
          // Metadata
          timestamp: new Date().toISOString(),
          repoName,
          evaluationMethod: 'hybrid_cicd_llm'
        },
        testId,
        userId: null,
        aiScore: finalAssessment.finalScore,
        feedback: {
          summary: finalAssessment.summary,
          strengths: llmEvaluation.strengths,
          improvements: llmEvaluation.improvements,
          breakdown: llmEvaluation.breakdown
        }
      },
    });

    // Update candidate status to completed with final scores
    await prisma.candidate.update({
      where: { id: candidateId },
      data: { 
        status: 'Completed',
        // Store assessment metadata in suitabilityAnalysis
        suitabilityAnalysis: {
          ...candidate.suitabilityAnalysis as any,
          technicalAssessment: {
            finalScore: finalAssessment.finalScore,
            grade: finalAssessment.grade,
            recommendation: finalAssessment.recommendation,
            completedAt: new Date().toISOString()
          }
        }
      }
    });

    console.log(`[Evaluation] ✅ Complete hybrid evaluation finished for ${candidate.resume.email}: ${finalAssessment.finalScore}/100 (${finalAssessment.grade})`);
    return finalAssessment;
  } catch (error) {
    console.error('[Evaluation] Error in LLM evaluation:', error);
    
    // Create error submission record
    await prisma.submission.create({
      data: {
        status: 'failed',
        result: {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
          repoName,
          evaluationMethod: 'hybrid_cicd_llm_failed'
        },
        testId,
        userId: null,
      },
    });
    
    throw error;
  }
} 