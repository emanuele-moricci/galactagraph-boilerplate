import { IPrismaContext } from '@config/prisma/IPrismaContext';

export interface IApolloServerContext {
  prismaContext: IPrismaContext;
  userData: { userId: number; role: string } | null;
}
