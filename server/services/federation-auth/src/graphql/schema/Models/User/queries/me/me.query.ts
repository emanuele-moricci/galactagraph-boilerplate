import { User } from '@prisma/client';
import IApolloServerContext from '@src/config/apolloConfig';

import { getUserById } from '@src/services/userService';
import { QueryResolver, OperationClass } from 'galactagraph-utils/lib/classes';

/**
 * `Me Query`
 *
 * The Class resolver for the `Me` query.
 *
 * It uses the @QueryResolver decorator to define the `query` logics for the Class.
 *
 * @interface `OperationClass<User>`
 * @class `MeQuery`
 *
 * @method `resolve` - The method used to resolve the `Me` query logics.
 */
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
