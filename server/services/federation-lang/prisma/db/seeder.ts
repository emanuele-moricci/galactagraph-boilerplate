
import { PrismaClient } from '@prisma/client';

import seedLanguages from './seeders/Language';
// [ADD NEW SEEDER IMPORTS ABOVE] <- DO NOT REMOVE - Needed for the generator to create seeders seamlessly

const prisma = new PrismaClient();

async function main() {
  await seedLanguages();
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
