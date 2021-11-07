import { User } from '@prisma/client';

import { getUserById } from '@src/services/userService';

const resolver = {
  Query: {
    me: async (_, __, context): Promise<User | null> => {
      return getUserById(context?.userData?.userId ?? -1);
    },
  },
};

export default resolver;
