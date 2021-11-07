import { IApolloServerContext } from '@config/apollo/IApolloServerContext';
import prismaContext from '@config/prisma/prismaContext';

import { verifyToken } from 'federation-utils';

const getApolloServerContext = async (
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

export default getApolloServerContext;
