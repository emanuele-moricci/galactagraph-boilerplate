import { User } from '@prisma/client';

import { getAllUsers, getUserById } from '@src/services/userService';

import { PaginationAndSearchArgs } from 'galactagraph-utils';
import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';
import { IUserRef } from '../../Utils/refs';

@ModelResolver('User')
class UserResolver implements ResolverClass<User, IUserRef> {
  reference = ({ userId }: IUserRef) => {
    return getUserById(parseInt(userId));
  };

  get = (_source, args: PaginationAndSearchArgs, _context, _info) => {
    return getAllUsers(args);
  };

  password = (): string => '';
}

export default new UserResolver();