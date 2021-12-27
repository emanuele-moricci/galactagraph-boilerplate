import { RegisterInput, RegisterPayload } from '@src/graphql/generated/graphql';

import { createUser } from '@src/services/userService';

import { signToken } from 'galactagraph-utils';

import {
  MutationResolver,
  OperationClass,
} from 'galactagraph-utils/lib/classes';

/**
 * `Register Mutation`
 *
 * The Class resolver for the `Register` mutation.
 *
 * It uses the @MutationResolver decorator to define the `mutation` logics for the Class.
 *
 * @interface `OperationClass<RegisterPayload>`
 * @class `RegisterMutation`
 *
 * @method `resolve` - The method used to resolve the `Register` mutation logics.
 */
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
