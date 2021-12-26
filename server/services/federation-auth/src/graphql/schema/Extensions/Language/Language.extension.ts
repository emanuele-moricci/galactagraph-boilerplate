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
