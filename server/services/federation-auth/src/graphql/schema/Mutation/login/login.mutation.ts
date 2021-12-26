import { LoginInput, LoginPayload } from '@src/graphql/generated/graphql';

import { getUserByEmailAndPassword } from '@src/services/userService';

import { signToken } from 'galactagraph-utils';

import {
  MutationResolver,
  OperationClass,
} from '@src/_decoratorTests/decorators';

@MutationResolver('login')
class LoginMutation implements OperationClass<LoginPayload> {
  resolve = async (
    _source,
    { input }: { input: LoginInput },
    _context,
    _info
  ): Promise<LoginPayload | null> => {
    const { userId, email } = await getUserByEmailAndPassword(
      input.email,
      input.password
    );

    const token = signToken(
      { userId, email },
      process.env.AUTH_JWT_SECRET ?? ''
    );

    return { token };
  };
}

export default new LoginMutation();
