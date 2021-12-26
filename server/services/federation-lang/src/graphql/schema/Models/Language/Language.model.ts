import { Language } from '@prisma/client';

import {
  getAllLanguages,
  getLanguageById,
} from '@src/services/languageService';
import { ILanguageRef } from '../../Utils/refs';

import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';

@ModelResolver('Language')
class LanguageResolver implements ResolverClass<Language, ILanguageRef> {
  reference = ({ languageId }: ILanguageRef) => {
    return getLanguageById(parseInt(languageId));
  };

  get = (_source, _args, _context, _info) => {
    return getAllLanguages();
  };
}

export default new LanguageResolver();
