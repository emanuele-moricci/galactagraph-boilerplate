import IPrismaContext, { prismaContext } from '@config/prismaConfig';

import { decryptObject, verifyToken } from 'galactagraph-utils';

interface IApolloServerContext {
  prismaContext: IPrismaContext;
  userData: { userId: number; role: string } | null;
}

export const getApolloServerContext = async (
  req
): Promise<IApolloServerContext> => {
  const auth = req?.headers?.authorization ?? null;
  if (!auth) return { prismaContext, userData: null };

  const userData = decryptObject(process.env.FEDERATION_SECRET ?? '', auth);

  return {
    prismaContext,
    userData,
  };
};

export const getApolloTestServerContext = async (
  req
): Promise<IApolloServerContext | null> => {
  const token = req?.headers?.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) return { prismaContext, userData: null };

  return {
    userData: verifyToken(token, process.env.AUTH_JWT_SECRET ?? ''),
    prismaContext,
  };
};

export default IApolloServerContext;
