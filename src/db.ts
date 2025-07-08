import { PrismaClient } from './generated/prisma';

// Create a singleton Prisma client instance
export const prisma = new PrismaClient();

// Add Replit workspace model to Prisma schema
// Note: In a real implementation, you would add this to your prisma/schema.prisma file
// and run prisma migrate
/*
model ReplitWorkspace {
  id        String   @id
  slug      String
  url       String
  embedUrl  String
  testId    String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  test      Test     @relation(fields: [testId], references: [id])
}
*/
