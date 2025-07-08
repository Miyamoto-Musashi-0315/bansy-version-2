import prisma from '../lib/prisma';
import { hash } from 'bcrypt';

async function main() {
  // Create or find test user
  const email = 'test@example.com';
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    const hashedPassword = await hash('password123', 10);
    user = await prisma.user.create({
      data: {
        email,
        name: 'Test User',
        password: hashedPassword,
        role: 'HR',
        company: 'Test Company'
      }
    });
    console.log('Created new user:', user.email);
  } else {
    console.log('Using existing user:', user.email);
  }

  // Create a test with test cases and files
  const test = await prisma.test.create({
    data: {
      title: 'Array Sum Problem',
      description: 'Write a function that finds the sum of all elements in an array.',
      difficulty: 'easy',
      language: 'python',
      requirements: ['Write a function called array_sum', 'Return the sum of all elements'],
      creatorId: user.id,
      files: {
        create: [
          {
            path: 'main.py',
            content: `def array_sum(numbers):
    # Your code here
    pass

# Example usage:
if __name__ == '__main__':
    numbers = [1, 2, 3, 4, 5]
    result = array_sum(numbers)
    print(f"Sum: {result}")
`
          },
          {
            path: 'test_main.py',
            content: `import unittest
from main import array_sum

class TestArraySum(unittest.TestCase):
    def test_positive_numbers(self):
        self.assertEqual(array_sum([1, 2, 3, 4, 5]), 15)
        
    def test_negative_numbers(self):
        self.assertEqual(array_sum([-1, -2, -3]), -6)
        
    def test_mixed_numbers(self):
        self.assertEqual(array_sum([-1, 0, 1]), 0)
        
    def test_empty_array(self):
        self.assertEqual(array_sum([]), 0)

if __name__ == '__main__':
    unittest.main()
`
          }
        ]
      },
      testCases: {
        create: [
          {
            description: 'Sum of positive numbers',
            input: '[1, 2, 3, 4, 5]',
            expectedOutput: '15'
          },
          {
            description: 'Sum of negative numbers',
            input: '[-1, -2, -3]',
            expectedOutput: '-6'
          },
          {
            description: 'Sum of mixed numbers',
            input: '[-1, 0, 1]',
            expectedOutput: '0'
          },
          {
            description: 'Sum of empty array',
            input: '[]',
            expectedOutput: '0'
          }
        ]
      }
    },
    include: {
      testCases: true,
      files: true
    }
  });

  console.log('Created test:', {
    id: test.id,
    title: test.title,
    testCases: test.testCases.length,
    files: test.files.length
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 