import { Language } from '@prisma/client';

import {
  getAllLanguages,
  getLanguageById,
} from '@src/services/languageService';
import { ILanguageRef } from '../../Utils/refs';

import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';

/**
 * `Language Resolver`
 *
 * The Class resolver for the `Language` model.
 *
 * It uses the @ModelResolver decorator to define the `model` logics for the Class.
 *
 * @interface `ResolverClass<Language, ILanguageRef>`
 * @class `LanguageResolver`
 *
 * @method `reference` - The method used to resolve the `Language` Model reference.
 * @method `get` - The method used to get the list of every `Language` Model.
 */
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
