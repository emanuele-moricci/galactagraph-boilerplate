import { IApolloServerContext } from '@config/apollo/IApolloServerContext';
import prismaContext from '@config/prisma/prismaContext';

import { decryptObject } from 'federation-utils';

const getApolloServerContext = async (req): Promise<IApolloServerContext> => {
  const auth = req?.headers?.authorization ?? null;
  if (!auth) return { prismaContext, userData: null };

  const userData = decryptObject(process.env.FEDERATION_SECRET ?? '', auth);

  return {
    prismaContext,
    userData,
  };
};

export default getApolloServerContext;
