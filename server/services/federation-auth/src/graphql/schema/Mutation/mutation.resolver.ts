import {
  LoginInput,
  LoginPayload,
  RegisterInput,
  RegisterPayload,
} from '@src/graphql/generated/graphql';

import {
  createUser,
  getUserByEmailAndPassword,
} from '@src/services/userService';

import { signToken } from 'federation-utils';

const resolver = {
  Mutation: {
    login: {
      resolve: async (
        _,
        { input }: { input: LoginInput }
      ): Promise<LoginPayload> => {
        const { userId, email } = await getUserByEmailAndPassword(
          input.email,
          input.password
        );

        const token = signToken(
          { userId, email },
          process.env.AUTH_JWT_SECRET ?? ''
        );

        return { token };
      },
    },
    register: {
      resolve: async (
        _,
        { input }: { input: RegisterInput }
      ): Promise<RegisterPayload> => {
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
      },
    },
  },
};

export default resolver;
