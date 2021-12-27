import { User } from '@prisma/client';

import { getUsersByLanguageId } from '@src/services/userService';
import { Language } from '@src/graphql/generated/graphql';
import { IUserRef, ILanguageRef } from '@fed-schema/Utils/refs';
import {
  ExtensionClass,
  ExtensionResolver,
  ResolveRelationship,
  ConnectRelationship,
} from 'galactagraph-utils/lib/classes';

/**
 * `Language-User Extension`
 *
 * The Class resolver for the `Language-User` extension.
 *
 * It uses the @ExtensionResolver decorator to define the `extension` logics for the Class.
 *
 * @interface `ExtensionClass<Language, ILanguageRef, User, IUserRef>`
 * @class `LanguageUserExtension`
 *
 * @method `resolve` - The method used to resolve the `Language` model in the `User` model.
 * @method `connect` - The method used to connect the `User` model to the `Language` model.
 */
@ExtensionResolver('Language', 'User')
class LanguageUserExtension
  implements ExtensionClass<Language, ILanguageRef, User, IUserRef>
{
  @ResolveRelationship('language')
  resolve = ({ languageId }: IUserRef): Language => ({
    __typename: 'Language',
    languageId,
  });

  @ConnectRelationship('users')
  connect = ({ languageId }: ILanguageRef): Promise<User[]> => {
    return getUsersByLanguageId(parseInt(languageId));
  };
}

export default new LanguageUserExtension();
