import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Title, Alert, Button, Group, Skeleton, Breadcrumbs, Anchor } from '@mantine/core';
import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react';
import { CandidateAssessmentResults } from '../components/CandidateAssessmentResults';
import assessmentService from '../services/assessmentService';

// Define the assessment data type
interface AssessmentData {
  candidate: {
    id: string;
    email: string;
    suitabilityScore: number;
    appliedAt: string;
    jobDescriptionId?: string;
  };
  assessment: {
    finalScore: number;
    grade: string;
    recommendation: string;
    completedAt: string;
  };
  scores: {
    resume: number;
    cicd: number;
    llm: number;
    total: number;
  };
  breakdown: {
    codeQuality: { score: number; max: number; feedback: string };
    architecture: { score: number; max: number; feedback: string };
    innovation: { score: number; max: number; feedback: string };
    bestPractices: { score: number; max: number; feedback: string };
    performance: { score: number; max: number; feedback: string };
    security: { score: number; max: number; feedback: string };
  };
  feedback: {
    summary: string;
    strengths: string[];
    improvements: string[];
  };
}

export function CandidateAssessmentPage() {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!candidateId) return;
      
      try {
        setLoading(true);
        const data = await assessmentService.getCandidateAssessment(candidateId);
        setAssessment(data);
        setError(null);
      } catch (err: unknown) {
        console.error('Failed to fetch assessment:', err);
        setError(err instanceof Error ? err.message : 'Failed to load assessment data');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [candidateId]);

  // Update the renderContent function with better error handling
  const renderContent = () => {
    if (loading) {
      return (
        <div>
          <Skeleton height={50} mb="md" />
          <Skeleton height={200} mb="md" />
          <Skeleton height={100} mb="md" />
          <Skeleton height={150} />
        </div>
      );
    }

    if (error) {
      return (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error}
          <Button 
            mt="md" 
            component={Link} 
            to="/dashboard"
            variant="light"
          >
            Return to Dashboard
          </Button>
        </Alert>
      );
    }

    if (!assessment) {
      return (
        <Alert title="No data" color="blue">
          No assessment data available for this candidate. The candidate may not have completed their assessment yet.
          <Button 
            mt="md" 
            component={Link} 
            to="/dashboard"
            variant="light"
          >
            Return to Dashboard
          </Button>
        </Alert>
      );
    }

    return <CandidateAssessmentResults assessmentData={assessment} loading={loading} />;
  };

  return (
    <Container size="lg" py="xl">
      <Breadcrumbs mb="lg">
        <Anchor component={Link} to="/dashboard">
          Job Descriptions
        </Anchor>
        {assessment?.candidate?.jobDescriptionId && (
          <Anchor component={Link} to={`/dashboard/jds/${assessment.candidate.jobDescriptionId}`}>
            Job Details
          </Anchor>
        )}
        <Anchor>Assessment Results</Anchor>
      </Breadcrumbs>

      <Group justify="space-between" mb="xl">
        <Title order={2}>Candidate Assessment Results</Title>
        <Button 
          component={Link} 
          to={assessment?.candidate?.jobDescriptionId ? `/dashboard/jds/${assessment.candidate.jobDescriptionId}` : '/dashboard'}
          leftSection={<IconArrowLeft size={16} />}
          variant="outline"
        >
          Back to Job
        </Button>
      </Group>

      {renderContent()}
    </Container>
  );
} 