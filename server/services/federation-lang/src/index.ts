import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from '@fed-schema/schema';
import { getApolloServerContext } from '@config/apolloConfig';

import { bgCyan, blue } from 'chalk';
import dotenv from 'dotenv-safe';

dotenv.config();

const startServer = () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => getApolloServerContext(req),
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4002 }, () => {
    console.log(
      `🚀 ${bgCyan('Server ready')} at ${blue(
        `http://localhost:4002${server.graphqlPath}`
      )}`
    );
  });
};

startServer();
