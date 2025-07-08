import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Paper,
  Button,
  FileInput,
  TextInput,
  Stack,
  Alert,
  Group,
  Badge,
  Card,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload, IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { uploadResumeForJd } from './../services/resumeService';
import { logger } from './../utils/logger';

interface ResumeFormData {
  email: string;
  file: File | null;
}

interface AnalysisResult {
  suitabilityScore: number;
  summary: string;
}

const JdResumeUpload = () => {
  const { id: jdId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ResumeFormData>({
    initialValues: {
      email: '',
      file: null,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      file: (value) => {
        console.log('File validation - value:', value);
        return (!value ? 'Resume file is required' : null);
      },
    },
  });

  const handleSubmit = async (values: ResumeFormData) => {
    console.log('Form submission - values:', values);
    console.log('File object:', values.file);
    console.log('Selected file state:', selectedFile);
    
    const fileToUpload = values.file || selectedFile;
    
    if (!fileToUpload || !jdId) {
      console.log('Missing file or jdId:', { formFile: values.file, selectedFile, jdId });
      setError('Please select a file and ensure JD ID is present.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('file', fileToUpload);

    const fileEntry = formData.get('file');
    console.log('FormData created:', {
      email: formData.get('email'),
      file: fileEntry,
      fileType: fileEntry?.constructor.name,
      fileSize: (fileEntry as File)?.size,
      fileName: (fileEntry as File)?.name,
    });

    try {
      const response = await uploadResumeForJd(jdId, formData);
      setSuccess('Resume uploaded and analyzed successfully!');
      
      // Extract analysis results from response
      if (response.analysis) {
        setAnalysisResult({
          suitabilityScore: response.analysis.suitabilityScore,
          summary: response.analysis.summary,
        });
      }

      form.reset();
      setSelectedFile(null);
      
      // Navigate back after showing results for a few seconds
      setTimeout(() => {
        navigate(`/dashboard/jds/${jdId}`);
      }, 4000);
    } catch (err: unknown) {
      logger.error('Failed to upload resume for JD', err);
      // Check for a detailed error message from the backend
      const error = err as { response?: { data?: { error?: string; details?: string } } };
      if (error.response && error.response.data && error.response.data.error) {
        let errorMessage = error.response.data.error;
        if (error.response.data.details) {
          errorMessage += `: ${error.response.data.details}`;
        }
        setError(errorMessage);
      } else {
        setError('Failed to upload resume. An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'teal';
    if (score >= 6) return 'yellow';
    return 'red';
  };

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="sm">
        Upload Resume for Job Description
      </Title>
      <Text c="dimmed" mb="xl">
        Upload a candidate's resume to evaluate it against this specific job description.
      </Text>

      <Paper withBorder radius="md" p="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              required
              label="Candidate Email"
              placeholder="candidate@company.com"
              {...form.getInputProps('email')}
            />

            <FileInput
              required
              label="Resume"
              placeholder="Upload resume (PDF, DOC, DOCX)"
              accept=".pdf,.doc,.docx"
              leftSection={<IconUpload size={14} />}
              value={selectedFile}
              onChange={(file) => {
                console.log('File selected:', file);
                setSelectedFile(file);
                form.setFieldValue('file', file);
              }}
              error={!selectedFile && form.errors.file}
            />

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                {error}
              </Alert>
            )}

            {success && (
              <Alert icon={<IconCheck size={16} />} title="Success" color="green">
                {success}
              </Alert>
            )}

            {analysisResult && (
              <Card withBorder p="md" radius="md">
                <Title order={4} mb="sm">AI Analysis Results</Title>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>Suitability Score:</Text>
                  <Badge size="lg" color={getScoreColor(analysisResult.suitabilityScore)}>
                    {analysisResult.suitabilityScore.toFixed(1)}/10
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="sm">Summary:</Text>
                <Text size="sm">{analysisResult.summary}</Text>
              </Card>
            )}

            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={() => navigate(`/dashboard/jds/${jdId}`)}>
                Back to JD
              </Button>
              <Button type="submit" loading={loading}>
                Upload & Analyze Resume
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default JdResumeUpload;
