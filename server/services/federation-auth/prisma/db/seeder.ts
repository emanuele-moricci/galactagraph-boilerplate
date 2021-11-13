import { PrismaClient } from '@prisma/client';

import seedUsers from './seeders/User';
// [ADD NEW SEEDER IMPORTS ABOVE] <- DO NOT REMOVE - Needed for the generator to create seeders seamlessly

const prisma = new PrismaClient();

async function main() {
  await seedUsers();
  // [ADD NEW SEEDERS ABOVE] <- DO NOT REMOVE - Needed for the generator to create seeders seamlessly
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
