import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // log: ['query'],
});

async function main() {
  // await prisma.account.create({
  //   data: {
  //     email: 'a@example.com',
  //   },
  // });
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
