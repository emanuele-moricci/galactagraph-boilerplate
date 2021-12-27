/**
.____                                                       
|    |   _____    ____    ____  __ _______     ____   ____  
|    |   \__  \  /    \  / ___\|  |  \__  \   / ___\_/ __ \ 
|    |___ / __ \|   |  \/ /_/  >  |  // __ \_/ /_/  >  ___/ 
|_______ (____  /___|  /\___  /|____/(____  /\___  / \___  >
        \/    \/     \//_____/            \//_____/      \/ 

 * Welcome to the GalactaGraph Language Micro-Service!
 * This solution holds all the code pertaining to the `Language` SubGraph.
 * 
 * The Language model is composed of the following properties:
 * - `languageId`: The unique identifier of the language.
 * - `code`: The ISO 2-digits identification code.
 * - `name`: The english-spoken name (Ex. Italy).
 * - `native`: The native-spoken name (Ex. Italia).
 * - ...Audit Fields (created_at, updated_at, deleted)
 * 
 * P.S. The language model has an extended `users` property, defined in the `federation-auth` service, 
 * that returns every user configured with that specific language.
 */
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
