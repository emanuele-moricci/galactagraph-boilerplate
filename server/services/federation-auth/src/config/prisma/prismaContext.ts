import { IPrismaContext } from '@config/prisma/IPrismaContext';
import prisma from '@config/prisma/prismaClient';

const prismaContext: IPrismaContext = {
  prisma,
};

export default prismaContext;
