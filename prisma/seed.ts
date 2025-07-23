import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
