const { PrismaClient } = require('./src/generated/prisma');

async function createSampleData() {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log('No user found. Please create a user first.');
      return;
    }

    const jd = await prisma.jobDescription.create({
      data: {
        title: 'Senior Frontend Developer',
        description: 'We are looking for a skilled Frontend Developer with expertise in React and TypeScript. You will be responsible for building modern web applications and collaborating with our design team.',
        minExperience: 3,
        maxExperience: 8,
        languages: ['JavaScript', 'TypeScript', 'React'],
        projectContext: 'Build a modern dashboard for our recruitment platform using React and TypeScript.',
        creatorId: user.id
      }
    });
    console.log('Sample job description created:', jd.id);
    console.log('Title:', jd.title);
  } catch (error) {
    console.error('Error creating sample JD:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleData();
