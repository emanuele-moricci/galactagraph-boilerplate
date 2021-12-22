import { Language } from '@prisma/client';

import { getLanguageById } from '@src/services/languageService';

import { ILanguageRef } from '@fed-schema/Utils/refs';

const reference = {
  Language: {
    __resolveReference: async ({
      languageId,
    }: ILanguageRef): Promise<Language | null> => {
      return getLanguageById(parseInt(languageId));
    },
  },
};

export default reference;
