import { LoginInput, LoginPayload } from '@src/graphql/generated/graphql';

import { getUserByEmailAndPassword } from '@src/services/userService';

import { signToken } from 'galactagraph-utils';

import {
  MutationResolver,
  OperationClass,
} from 'galactagraph-utils/lib/classes';

/**
 * `Login Mutation`
 *
 * The Class resolver for the `Login` mutation.
 *
 * It uses the @MutationResolver decorator to define the `mutation` logics for the Class.
 *
 * @interface `OperationClass<LoginPayload>`
 * @class `LoginMutation`
 *
 * @method `resolve` - The method used to resolve the `Login` mutation logics.
 */
@MutationResolver('login')
class LoginMutation implements OperationClass<LoginPayload> {
  resolve = async (
    _source,
    { input }: { input: LoginInput },
    _context,
    _info
  ): Promise<LoginPayload | null> => {
    try {
      const { userId, email } = await getUserByEmailAndPassword(
        input.email,
        input.password
      );

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

export default new LoginMutation();
