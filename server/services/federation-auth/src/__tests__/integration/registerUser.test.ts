/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
import schema from '@fed-schema/schema';

const REGISTER_USER = gql`
  mutation register($input: registerInput) {
    register(input: $input) {
      token
    }
  }
`;

const ME_QUERY = gql`
  query me {
    me {
      userId
      email
    }
  }
`;

describe('register test', () => {
  const email: string = 'jestregister@test.com';
  let token: string | null;
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema: schema,
      context: async ({ req }) => await getApolloTestServerContext({ req }),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.user.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const result = await server.executeOperation({
      query: REGISTER_USER,
      variables: {
        input: {
          email: email,
          password: 'Jest!120',
        },
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.register).toBeDefined();
    token = result?.data?.register?.token;
    expect(token).not.toBeNull();
  });

  it('should return "me"', async () => {
    const authServer = new ApolloServer({
      schema: schema,
      context: async () =>
        await getApolloTestServerContext({
          headers: { authorization: `Bearer ${token}` },
        }),
    });

    const meQuery = await authServer.executeOperation({
      query: ME_QUERY,
    });

    expect(meQuery.data).toBeDefined();
    expect(meQuery?.data?.me).toBeDefined();
    const me = meQuery?.data?.me;
    expect(me.email).toEqual(email);
  });
});
