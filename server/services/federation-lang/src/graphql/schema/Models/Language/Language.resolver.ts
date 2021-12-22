import { Language } from '@prisma/client';

import { getAllLanguages } from '@src/services/languageService';

const resolver = {
  Query: {
    Language: async (_source, _args, _context, _info): Promise<Language[]> => {
      return getAllLanguages();
    },
  },
};

export default resolver;
