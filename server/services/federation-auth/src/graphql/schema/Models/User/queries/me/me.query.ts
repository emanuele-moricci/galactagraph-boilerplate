import { User } from '@prisma/client';
import IApolloServerContext from '@src/config/apolloConfig';

import { getUserById } from '@src/services/userService';
import { QueryResolver, OperationClass } from '@src/_decoratorTests/decorators';

@QueryResolver('me')
class MeQuery implements OperationClass<User> {
  resolve = (
    _source,
    _args,
    context: IApolloServerContext,
    _info
  ): Promise<User | null> => {
    return getUserById(context?.userData?.userId ?? -1);
  };
}

export default new MeQuery();
