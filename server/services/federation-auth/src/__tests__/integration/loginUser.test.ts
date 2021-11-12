/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
import schema from '@fed-schema/schema';

const LOGIN_USER = gql`
  mutation login($input: loginInput) {
    login(input: $input) {
      token
    }
  }
`;

describe('login test', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema,
      context: async ({ req }) => getApolloTestServerContext(req),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.user.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const result = await server.executeOperation({
      query: LOGIN_USER,
      variables: {
        input: {
          email: 'admin@federation.com',
          password: 'Admin!20',
        },
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.login).toBeDefined();
    const token = result?.data?.login?.token;
    expect(token).not.toBeNull();
  });
});
