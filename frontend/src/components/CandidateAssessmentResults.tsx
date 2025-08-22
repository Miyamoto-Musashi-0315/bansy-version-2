import React from 'react';
import {
  Paper, Title, Text, Group, Badge, Progress, Card, Grid, List, ThemeIcon,
  RingProgress, Stack, Accordion
} from '@mantine/core';
import { IconCheck, IconX, IconThumbUp, IconThumbDown, IconBrain, IconCode, IconChartBar } from '@tabler/icons-react';

interface AssessmentData {
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

interface CandidateAssessmentResultsProps {
  assessmentData: AssessmentData;
  loading: boolean;
}

export const CandidateAssessmentResults: React.FC<CandidateAssessmentResultsProps> = ({ 
  assessmentData, 
  loading 
}) => {
  if (loading) {
    return <Text>Loading assessment results...</Text>;
  }

  if (!assessmentData) {
    return <Text>No assessment data available.</Text>;
  }

  const { candidate, scores, assessment, breakdown, feedback } = assessmentData;

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

  return (
    <Stack gap="xl">
      {/* Header */}
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between" mb="md">
          <div>
            <Title order={3}>{candidate.email}</Title>
            <Text size="sm" color="dimmed">
              Applied: {new Date(candidate.appliedAt).toLocaleDateString()}
            </Text>
          </div>
          <Stack gap={5} align="flex-end">
            <Badge size="xl" color={getGradeColor(assessment.grade)}>
              Grade: {assessment.grade}
            </Badge>
            <Badge color={getRecommendationColor(assessment.recommendation)}>
              {assessment.recommendation}
            </Badge>
          </Stack>
        </Group>

        <Grid>
          <Grid.Col span={8}>
            <Text fw={500} mb="xs">Final Assessment Score: {scores.total}/100</Text>
            <Progress 
              value={scores.total} 
              color={scores.total >= 70 ? "green" : scores.total >= 50 ? "yellow" : "red"}
              size="xl"
              radius="md"
              striped
              mb="md"
            />
            <Group grow>
              <Card withBorder p="xs" radius="md">
                <Group justify="space-between">
                  <Text size="sm">Resume Score:</Text>
                  <Text fw={500}>{scores.resume}/10</Text>
                </Group>
              </Card>
              <Card withBorder p="xs" radius="md">
                <Group justify="space-between">
                  <Text size="sm">CI/CD Tests:</Text>
                  <Text fw={500}>{scores.cicd}/40</Text>
                </Group>
              </Card>
              <Card withBorder p="xs" radius="md">
                <Group justify="space-between">
                  <Text size="sm">Code Quality:</Text>
                  <Text fw={500}>{scores.llm}/60</Text>
                </Group>
              </Card>
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <RingProgress
              sections={[
                { value: (scores.cicd / 40) * 40, color: 'blue' },
                { value: (scores.llm / 60) * 60, color: 'violet' },
              ]}
              label={
                <Text size="xl" ta="center" fw={700}>
                  {scores.total}%
                </Text>
              }
            />
            <Group justify="center" mt="xs">
              <Badge color="blue">CI/CD: {Math.round((scores.cicd / 40) * 100)}%</Badge>
              <Badge color="violet">LLM: {Math.round((scores.llm / 60) * 100)}%</Badge>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Summary */}
      <Paper withBorder p="md" radius="md">
        <Title order={4} mb="md">Assessment Summary</Title>
        <Text>{feedback.summary}</Text>
      </Paper>

      {/* Strengths & Improvements */}
      <Grid>
        <Grid.Col span={6}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Group mb="md">
              <ThemeIcon color="green" size="lg" radius="xl">
                <IconThumbUp size={20} />
              </ThemeIcon>
              <Title order={4}>Strengths</Title>
            </Group>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="green" size="sm" radius="xl">
                  <IconCheck size={14} />
                </ThemeIcon>
              }
            >
              {feedback.strengths.map((strength: string, index: number) => (
                <List.Item key={index}>{strength}</List.Item>
              ))}
            </List>
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Group mb="md">
              <ThemeIcon color="orange" size="lg" radius="xl">
                <IconThumbDown size={20} />
              </ThemeIcon>
              <Title order={4}>Areas for Improvement</Title>
            </Group>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="orange" size="sm" radius="xl">
                  <IconX size={14} />
                </ThemeIcon>
              }
            >
              {feedback.improvements.map((improvement: string, index: number) => (
                <List.Item key={index}>{improvement}</List.Item>
              ))}
            </List>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Detailed Breakdown */}
      <Paper withBorder p="md" radius="md">
        <Title order={4} mb="md">Detailed Evaluation</Title>
        <Accordion>
          {breakdown.codeQuality && (
            <Accordion.Item value="codeQuality">
              <Accordion.Control icon={<IconCode size={20} />}>
                <Group>
                  <Text>Code Quality</Text>
                  <Badge>{breakdown.codeQuality.score}/{breakdown.codeQuality.max}</Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>{breakdown.codeQuality.feedback}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          )}

          {breakdown.architecture && (
            <Accordion.Item value="architecture">
              <Accordion.Control icon={<IconBrain size={20} />}>
                <Group>
                  <Text>Architecture & Design</Text>
                  <Badge>{breakdown.architecture.score}/{breakdown.architecture.max}</Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>{breakdown.architecture.feedback}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          )}

          {breakdown.innovation && (
            <Accordion.Item value="innovation">
              <Accordion.Control icon={<IconChartBar size={20} />}>
                <Group>
                  <Text>Innovation & Problem Solving</Text>
                  <Badge>{breakdown.innovation.score}/{breakdown.innovation.max}</Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>{breakdown.innovation.feedback}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          )}

          {breakdown.bestPractices && (
            <Accordion.Item value="bestPractices">
              <Accordion.Control>
                <Group>
                  <Text>Best Practices</Text>
                  <Badge>{breakdown.bestPractices.score}/{breakdown.bestPractices.max}</Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>{breakdown.bestPractices.feedback}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          )}

          {breakdown.performance && (
            <Accordion.Item value="performance">
              <Accordion.Control>
                <Group>
                  <Text>Performance</Text>
                  <Badge>{breakdown.performance.score}/{breakdown.performance.max}</Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>{breakdown.performance.feedback}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          )}

          {breakdown.security && (
            <Accordion.Item value="security">
              <Accordion.Control>
                <Group>
                  <Text>Security</Text>
                  <Badge>{breakdown.security.score}/{breakdown.security.max}</Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>{breakdown.security.feedback}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          )}
        </Accordion>
      </Paper>
    </Stack>
  );
}; 