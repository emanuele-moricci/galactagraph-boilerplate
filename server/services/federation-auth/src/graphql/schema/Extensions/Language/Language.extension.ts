import { User } from '@prisma/client';

import { getUsersByLanguageId } from '@src/services/userService';
import { Language } from '@src/graphql/generated/graphql';
import { IUserRef, ILanguageRef } from '@fed-schema/Utils/refs';
import {
  ExtensionClass,
  ExtensionResolver,
} from '@src/_decoratorTests/decorators';
import {
  ResolveRelationship,
  ConnectRelationship,
} from '@src/_decoratorTests/extDecorators';

@ExtensionResolver('Language', 'User')
class LanguageExtension
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

export default new LanguageExtension();
