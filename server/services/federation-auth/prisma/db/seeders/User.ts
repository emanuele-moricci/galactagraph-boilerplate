import bcrypt from 'bcryptjs';
import faker from 'faker';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedUsers() {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.AUTH_CRYPT_SALT ?? '10')
  );

  const adminPass = bcrypt.hashSync('Admin!20', salt);

  const userArray = Array.from({ length: 10 }, (_, i) => {
    const isAdmin = i === 0;
    const userPass = bcrypt.hashSync(faker.internet.password(), salt);

    return {
      email: isAdmin ? 'admin@federation.com' : faker.internet.email(),
      password: isAdmin ? adminPass : userPass,
    };
  });

  await prisma.user.createMany({
    data: userArray,
  });
}

export default seedUsers;
