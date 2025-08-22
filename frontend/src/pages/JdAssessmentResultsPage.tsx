import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, Title, Alert, Button, Group, Paper, Text, Badge, 
  Table, Skeleton, Tabs, Card, Grid, RingProgress, Breadcrumbs, Anchor, List
} from '@mantine/core';
import { IconAlertCircle, IconArrowLeft, IconUser, IconChartBar, IconTrophy } from '@tabler/icons-react';
import assessmentService from '../services/assessmentService';
import { api } from '../services/api'; // Fixed import for api

interface AssessmentResults {
  overview: {
    position: string;
    totalCandidates: number;
    completedAssessments: number;
    averageScore: number;
    gradeDistribution: Record<string, number>;
    assessmentDate: string;
  };
  candidates: Array<{
    candidate: {
      id: string;
      email: string;
      suitabilityScore: number;
      appliedAt: string;
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
    status: string;
  }>;
  topPerformers: Array<{
    candidate: {
      id: string;
      email: string;
      suitabilityScore: number;
      appliedAt: string;
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
    status: string;
  }>;
  insights: {
    strongestArea: string;
    commonWeaknesses: string[];
    recommendedHires: number;
  };
}

export function JdAssessmentResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [apiCheckResult, setApiCheckResult] = useState<string | null>(null);
  const [checkingApi, setCheckingApi] = useState(false);

  const fetchResults = async () => {
    if (!id) {
      console.error("No JD ID provided - cannot fetch results");
      setError("Missing Job Description ID");
      setLoading(false);
      return;
    }
    
    // Set a timeout to show a message if the request takes too long
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
    
    const timeout = setTimeout(() => {
      console.log('⚠️ DEBUG: Request is taking longer than expected...');
      setError('Request is taking longer than expected. The server might be processing a large amount of data or experiencing high load. You can wait or try refreshing.');
    }, 10000); // 10 seconds timeout
    
    setLoadingTimeout(timeout);
    
    console.log(`🔍 DEBUG: Starting fetch for JD assessment results with ID: ${id}`);
    console.time('assessment-results-fetch');
    
    try {
      setLoading(true);
      console.log('🔍 DEBUG: Calling API endpoint: /jds/' + id + '/results');
      const data = await assessmentService.getJdAssessmentResults(id);
      console.log('✅ DEBUG: Assessment results received:', data);
      
      // Check if data is empty or missing expected fields
      if (!data) {
        console.warn('⚠️ DEBUG: Received empty data from API');
        setError('Received empty data from server');
      } else if (!data.overview) {
        console.warn('⚠️ DEBUG: Data missing overview section:', data);
        setError('Incomplete data received from server');
      } else {
        console.log(`✅ DEBUG: Successfully loaded data with ${data.candidates?.length || 0} candidates`);
      }
      
      setResults(data);
      setError(null);
    } catch (err: unknown) {
      console.error('❌ DEBUG: Failed to fetch assessment results:', err);
      setError(err instanceof Error ? err.message : 'Failed to load assessment results');
    } finally {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      console.timeEnd('assessment-results-fetch');
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Function to check API directly
  const checkApiDirectly = async () => {
    if (!id) return;
    
    setCheckingApi(true);
    setApiCheckResult(null);
    
    try {
      console.log('🔍 DEBUG: Performing direct API check');
      
      // Get the base URL from the API configuration
      const apiBaseUrl = api.defaults.baseURL || '/api';
      console.log('🔍 DEBUG: Using API base URL:', apiBaseUrl);
      
      // Check if the API is responding at all
      const baseResponse = await fetch(`${apiBaseUrl}/health`);
      const baseStatus = baseResponse.ok ? 'OK' : 'Error';
      const baseStatusText = await baseResponse.text();
      
      // Try to get the JD details to check if the JD exists
      const jdResponse = await fetch(`${apiBaseUrl}/jds/${id}`);
      const jdStatus = jdResponse.ok ? 'OK' : 'Error';
      const jdData = jdResponse.ok ? await jdResponse.json() : await jdResponse.text();
      
      // Try to get the assessment results directly
      const resultsResponse = await fetch(`${apiBaseUrl}/jds/${id}/results`);
      const resultsStatus = resultsResponse.ok ? 'OK' : 'Error';
      const resultsData = resultsResponse.ok ? await resultsResponse.json() : await resultsResponse.text();
      
      const checkResult = `
        API Health: ${baseStatus}
        Response: ${baseStatusText}
        
        JD Endpoint (${apiBaseUrl}/jds/${id}): ${jdStatus}
        Has Test: ${jdData && typeof jdData === 'object' && jdData.test ? 'Yes' : 'No'}
        
        Results Endpoint (${apiBaseUrl}/jds/${id}/results): ${resultsStatus}
        Has Data: ${resultsData && typeof resultsData === 'object' ? 'Yes' : 'No'}
        Candidates: ${resultsData?.candidates?.length || 0}
        
        Raw Results Response: 
        ${typeof resultsData === 'string' ? resultsData : JSON.stringify(resultsData, null, 2).substring(0, 500) + '...'}
      `;
      
      console.log('🔍 DEBUG: API Check Results:', checkResult);
      setApiCheckResult(checkResult);
    } catch (err) {
      console.error('❌ DEBUG: API check failed:', err);
      setApiCheckResult(`API check failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setCheckingApi(false);
    }
  };

  useEffect(() => {
    console.log('🔍 DEBUG: JdAssessmentResultsPage mounted with JD ID:', id);
    fetchResults();
    
    return () => {
      // Clear timeout when component unmounts
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [id]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchResults();
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A+': case 'A': return 'green';
      case 'B+': case 'B': return 'blue';
      case 'C+': case 'C': return 'yellow';
      case 'D': case 'F': return 'red';
      default: return 'gray';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch(recommendation) {
      case 'Strong Hire': return 'green';
      case 'Hire': return 'teal';
      case 'Consider': return 'yellow';
      case 'No Hire': return 'red';
      default: return 'gray';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div>
          <Alert color="blue" title="Loading assessment data" mb="md">
            <Text mb="md">Please wait while we fetch the assessment results...</Text>
            <Text size="sm" c="dimmed">This may take a few moments if there are many candidates or complex evaluations.</Text>
            {refreshing && <Text size="sm" fw="bold">Refreshing data...</Text>}
          </Alert>
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
          <Text mb="md">{error}</Text>
          <Group mt="md">
            <Button onClick={handleRefresh} loading={refreshing} variant="light">
              {refreshing ? 'Trying again...' : 'Try Again'}
            </Button>
            <Button 
              component={Link} 
              to={id ? `/dashboard/jds/${id}` : '/dashboard'}
              variant="outline"
            >
              Back to Job Details
            </Button>
            <Button 
              onClick={checkApiDirectly} 
              loading={checkingApi}
              variant="subtle"
              color="gray"
            >
              Diagnose API
            </Button>
          </Group>
          
          {apiCheckResult && (
            <Paper withBorder p="xs" mt="md">
              <Text size="sm" fw="bold">API Diagnostics:</Text>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                {apiCheckResult}
              </pre>
            </Paper>
          )}
          
          <Text size="sm" mt="md" c="dimmed">
            If this problem persists, please check the browser console for more detailed error information,
            or try accessing the page again later.
          </Text>
        </Alert>
      );
    }

    if (!results) {
      return (
        <Alert title="No assessment data available" color="blue">
          <Text mb="md">No assessment results available for this job description. This could be because:</Text>
          <List>
            <List.Item>No candidates have completed their assessments yet</List.Item>
            <List.Item>The evaluation process is still in progress</List.Item>
            <List.Item>No tests have been sent to candidates</List.Item>
          </List>
          <Text mt="md">Check the candidate status on the job details page to see if any tests have been sent.</Text>
          <Group mt="md">
            <Button onClick={handleRefresh} loading={refreshing} variant="light">
              {refreshing ? 'Checking again...' : 'Check Again'}
            </Button>
            <Button 
              component={Link} 
              to={id ? `/dashboard/jds/${id}` : '/dashboard'}
              variant="outline"
            >
              Back to Job Details
            </Button>
          </Group>
        </Alert>
      );
    }

    // Check if there are any completed assessments
    if (results.candidates.length === 0) {
      return (
        <Alert title="No candidates found" color="yellow">
          <Text mb="md">No candidates have been found for this job description. To get assessment results:</Text>
          <List>
            <List.Item>Upload candidate resumes</List.Item>
            <List.Item>Send tests to candidates</List.Item>
            <List.Item>Wait for candidates to complete their assessments</List.Item>
          </List>
        </Alert>
      );
    }

    // Update the "No completed assessments" alert to include a refresh button
    if (results && results.candidates.filter(c => c.status === 'completed').length === 0) {
      // Get information about candidates who have tests
      const pendingCandidates = results.candidates.filter(c => c.status !== 'completed').length;
      
      return (
        <Alert title="Assessment in progress" color="yellow">
          <Text mb="md">There are {pendingCandidates} candidates who have received tests but haven't completed their assessments yet.</Text>
          <Text mb="md">The LLM evaluation happens automatically after:</Text>
          <List>
            <List.Item>A candidate pushes code to their GitHub repository</List.Item>
            <List.Item>GitHub Actions runs the tests and sends a webhook to the server</List.Item>
            <List.Item>All tests pass successfully</List.Item>
            <List.Item>The server sends the code to Google Gemini for evaluation</List.Item>
          </List>
          <Text mt="md">Check back later when candidates have submitted their work and the evaluation is complete.</Text>
          <Button 
            onClick={handleRefresh} 
            loading={refreshing} 
            mt="md"
          >
            {refreshing ? 'Checking for results...' : 'Check for new results'}
          </Button>
        </Alert>
      );
    }

    return (
      <Tabs defaultValue="overview">
        <Tabs.List mb="md">
          <Tabs.Tab value="overview" leftSection={<IconChartBar size={14} />}>Overview</Tabs.Tab>
          <Tabs.Tab value="candidates" leftSection={<IconUser size={14} />}>Candidates</Tabs.Tab>
          <Tabs.Tab value="top" leftSection={<IconTrophy size={14} />}>Top Performers</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <Grid>
            <Grid.Col span={8}>
              <Paper withBorder p="md" mb="md">
                <Title order={4} mb="md">Assessment Overview</Title>
                <Text>Position: <Text span fw={500}>{results.overview.position}</Text></Text>
                <Text>Total Candidates: <Text span fw={500}>{results.overview.totalCandidates}</Text></Text>
                <Text>Completed Assessments: <Text span fw={500}>{results.overview.completedAssessments}</Text></Text>
                <Text>Average Score: <Text span fw={500}>{results.overview.averageScore}/100</Text></Text>
                <Text>Assessment Date: <Text span fw={500}>{new Date(results.overview.assessmentDate).toLocaleDateString()}</Text></Text>
              </Paper>
              
              <Paper withBorder p="md" mb="md">
                <Title order={4} mb="md">Insights</Title>
                <Text>Strongest Technical Area: <Badge>{results.insights.strongestArea}</Badge></Text>
                <Text mt="xs">Recommended Hires: <Badge color="green">{results.insights.recommendedHires}</Badge></Text>
                
                <Text mt="md" mb="xs">Common Areas for Improvement:</Text>
                <ul>
                  {results.insights.commonWeaknesses.map((weakness, index) => (
                    <li key={index}><Text size="sm">{weakness}</Text></li>
                  ))}
                </ul>
              </Paper>
            </Grid.Col>
            
            <Grid.Col span={4}>
              <Paper withBorder p="md" h="100%">
                <Title order={4} mb="md">Grade Distribution</Title>
                {Object.entries(results.overview.gradeDistribution).length > 0 ? (
                  <div>
                    {Object.entries(results.overview.gradeDistribution).map(([grade, count]) => (
                      <Group key={grade} justify="space-between" mb="xs">
                        <Badge color={getGradeColor(grade)} size="lg">{grade}</Badge>
                        <Text>{count} candidate{count !== 1 ? 's' : ''}</Text>
                      </Group>
                    ))}
                  </div>
                ) : (
                  <Text c="dimmed">No grade data available</Text>
                )}
              </Paper>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="candidates">
          <Paper withBorder>
            <Table striped>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Resume Score</th>
                  <th>Technical Score</th>
                  <th>Grade</th>
                  <th>Recommendation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.candidates.filter(c => c.status === 'completed').map((candidate) => (
                  <tr key={candidate.candidate.id}>
                    <td>
                      <Text fw={500}>{candidate.candidate.email}</Text>
                      <Text size="xs" c="dimmed">
                        Applied: {new Date(candidate.candidate.appliedAt).toLocaleDateString()}
                      </Text>
                    </td>
                    <td>{candidate.scores.resume}/10</td>
                    <td>{candidate.scores.total}/100</td>
                    <td>
                      <Badge color={getGradeColor(candidate.assessment.grade)}>
                        {candidate.assessment.grade}
                      </Badge>
                    </td>
                    <td>
                      <Badge color={getRecommendationColor(candidate.assessment.recommendation)}>
                        {candidate.assessment.recommendation}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        component={Link} 
                        to={`/candidates/${candidate.candidate.id}/assessment`}
                        size="xs"
                        variant="light"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="top">
          <Grid>
            {results.topPerformers.map((performer, index) => (
              <Grid.Col span={4} key={performer.candidate.id}>
                <Card withBorder p="md" radius="md">
                  <Group justify="space-between" mb="md">
                    <div>
                      <Badge size="lg" mb="xs">#{index + 1}</Badge>
                      <Text fw={500}>{performer.candidate.email}</Text>
                    </div>
                    <RingProgress
                      size={80}
                      roundCaps
                      thickness={8}
                      sections={[{ value: performer.scores.total, color: getGradeColor(performer.assessment.grade) }]}
                      label={
                        <Text fw={700} ta="center" size="lg">
                          {performer.scores.total}
                        </Text>
                      }
                    />
                  </Group>
                  <Group justify="space-between">
                    <div>
                      <Text size="sm">Grade:</Text>
                      <Badge color={getGradeColor(performer.assessment.grade)}>
                        {performer.assessment.grade}
                      </Badge>
                    </div>
                    <div>
                      <Text size="sm">Recommendation:</Text>
                      <Badge color={getRecommendationColor(performer.assessment.recommendation)}>
                        {performer.assessment.recommendation}
                      </Badge>
                    </div>
                  </Group>
                  <Button 
                    component={Link} 
                    to={`/candidates/${performer.candidate.id}/assessment`}
                    fullWidth
                    variant="light"
                    mt="md"
                  >
                    View Details
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Tabs.Panel>
      </Tabs>
    );
  };

  return (
    <Container size="lg" py="xl">
      <Breadcrumbs mb="lg">
        <Anchor component={Link} to="/dashboard">
          Job Descriptions
        </Anchor>
        {id && (
          <Anchor component={Link} to={`/dashboard/jds/${id}`}>
            Job Details
          </Anchor>
        )}
        <Anchor>Assessment Results</Anchor>
      </Breadcrumbs>

      <Group justify="space-between" mb="xl">
        <Title order={2}>Assessment Results</Title>
        <Group>
          <Button 
            onClick={handleRefresh}
            loading={refreshing}
            variant="light"
          >
            {refreshing ? 'Refreshing...' : 'Refresh Results'}
          </Button>
          <Button 
            component={Link} 
            to={id ? `/dashboard/jds/${id}` : '/dashboard'}
            leftSection={<IconArrowLeft size={16} />}
            variant="outline"
          >
            Back to Job
          </Button>
        </Group>
      </Group>

      {renderContent()}
    </Container>
  );
} 