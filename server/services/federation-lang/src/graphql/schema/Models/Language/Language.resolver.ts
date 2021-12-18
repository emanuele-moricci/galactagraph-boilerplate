import { Language } from '@prisma/client';

import {  getAllLanguages, getLanguageById } from '@src/services/languageService';

import { ILanguageRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {
    Language: async (_source, _args, _context, _info): Promise<Language[]> => {
      return await getAllLanguages();
    },
  },
  Language: {
    __resolveReference: async ({
      languageId,
    }: ILanguageRef): Promise<Language | null> => {
      return await getLanguageById(parseInt(languageId));
    }
  },
};

export default resolver;
