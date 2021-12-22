import { User } from '@prisma/client';

import { getUsersByLanguageId } from '@src/services/userService';
import { Language } from '@src/graphql/generated/graphql';
import { IUserRef, ILanguageRef } from '@fed-schema/Utils/refs';

const resolver = {
  User: {
    language: ({ languageId }: IUserRef): Language => ({
      __typename: 'Language',
      languageId,
    }),
  },
  Language: {
    users: async ({ languageId }: ILanguageRef): Promise<User[]> => {
      return getUsersByLanguageId(parseInt(languageId));
    },
  },
};

export default resolver;
