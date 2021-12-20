import { User } from '@prisma/client';

import { getAllUsers } from '@src/services/userService';

import { PaginationAndSearchArgs } from 'galactagraph-utils';

const resolver = {
  Query: {
    User: async (_, args: PaginationAndSearchArgs): Promise<User[]> => {
      return getAllUsers(args);
    },
  },
  User: {
    password: (): string => '',
  },
};

export default resolver;
