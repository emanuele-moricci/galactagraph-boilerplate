import { User } from '@prisma/client';

import { getUserById } from '@src/services/userService';

import { IUserRef } from '@fed-schema/Utils/refs';

const reference = {
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return getUserById(parseInt(userId));
    },
  },
};

export default reference;
