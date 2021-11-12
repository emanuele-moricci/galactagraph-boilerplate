import { User } from '@prisma/client';

import { getAllUsers, getUserById } from '@src/services/userService';

import { IUserRef } from '@fed-schema/Utils/refs';
import { PaginationAndSearchArgs } from 'federation-utils';

const resolver = {
  Query: {
    User: async (_, args: PaginationAndSearchArgs): Promise<User[]> => {
      return getAllUsers(args);
    },
  },
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return getUserById(parseInt(userId));
    },
    password: (): string => '',
  },
};

export default resolver;
