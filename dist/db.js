"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const prisma_1 = require("./generated/prisma");
// Create a singleton Prisma client instance
exports.prisma = new prisma_1.PrismaClient();
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
