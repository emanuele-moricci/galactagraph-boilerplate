import { RegisterInput, RegisterPayload } from '@src/graphql/generated/graphql';

import { createUser } from '@src/services/userService';

import { signToken } from 'galactagraph-utils';

import {
  MutationResolver,
  OperationClass,
} from '@src/_decoratorTests/decorators';

@MutationResolver('register')
class RegisterMutation implements OperationClass<RegisterPayload> {
  resolve = async (
    _source,
    { input }: { input: RegisterInput },
    _context,
    _info
  ): Promise<RegisterPayload | null> => {
    try {
      const { userId, email } = await createUser(input);
      const token = signToken(
        { userId, email },
        process.env.AUTH_JWT_SECRET ?? ''
      );

      return { token };
    } catch (error) {
      console.error(error);
      return { token: '' };
    }
  };
}

export default new RegisterMutation();
