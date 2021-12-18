import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedLanguages() {
  await prisma.language.create({
    data: {
      code: 'en',
      name: 'English',
      native: 'English',
    },
  });

  await prisma.language.create({
    data: {
      code: 'it',
      name: 'Italian',
      native: 'Italiano',
    },
  });

  await prisma.language.create({
    data: {
      code: 'es',
      name: 'Spanish',
      native: 'Español',
    },
  });

  await prisma.language.create({
    data: {
      code: 'fr',
      name: 'French',
      native: 'Français',
    },
  });

  await prisma.language.create({
    data: {
      code: 'de',
      name: 'German',
      native: 'Deutsch',
    },
  });
}

export default seedLanguages;
