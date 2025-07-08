import { PrismaClient } from '../src/generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create system user if it doesn't exist
  const systemUser = await prisma.user.upsert({
    where: { email: 'system@bansy.ai' },
    update: {},
    create: {
      email: 'system@bansy.ai',
      name: 'System',
      password: await bcrypt.hash('system-password', 10),
      role: 'HR',
    },
  });

  console.log('Created system user:', systemUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
