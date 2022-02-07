import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('pass', 10);

  await prisma.user.upsert({
    where: { email: 'dave@djin.io' },
    update: {},
    create: {
      email: 'dave@djin.io',
      name: 'dave',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'test@test.de' },
    update: {},
    create: {
      email: 'test@test.de',
      name: 'dave',
      password: hashedPassword,
      role: 'USER',
    },
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
