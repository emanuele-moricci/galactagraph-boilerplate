import { User } from '@prisma/client';

import { getAllUsers, getUserById } from '@src/services/userService';

import { IUserRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {
    User: async (_source, args, _context, _info): Promise<User[]> => {
      return await getAllUsers(args);
    },
  },
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return await getUserById(parseInt(userId));
    },
  },
};

export default resolver;
