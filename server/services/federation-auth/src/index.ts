/**
    _____          __  .__                   __  .__               __  .__               
  /  _  \  __ ___/  |_|  |__   ____   _____/  |_|__| ____ _____ _/  |_|__| ____   ____  
 /  /_\  \|  |  \   __\  |  \_/ __ \ /    \   __\  |/ ___\\__  \\   __\  |/  _ \ /    \ 
/    |    \  |  /|  | |   Y  \  ___/|   |  \  | |  \  \___ / __ \|  | |  (  <_> )   |  \
\____|__  /____/ |__| |___|  /\___  >___|  /__| |__|\___  >____  /__| |__|\____/|___|  /
        \/                 \/     \/     \/             \/     \/                    \/ 

 * Welcome to the GalactaGraph Authentication Subgraph!
 * This micro-service is responsable for holding every aspect of authentication for your app.
 * As of now, it comes with JWT out-of-the-box, linked to a User model with a login and a register mutation.
 * 
 * The User model is composed of the following properties:
 * - `userId`: The unique identifier of the user.
 * - `email`: The email of the user.
 * - `password`: The password of the user (that never gets returned by the GraphQL `user` query).
 * - ...Audit Fields (created_at, updated_at, deleted)
 * 
 * P.S. The user model has an extended `language` property, defined in this service under the `Extensions` folder, 
 * that returns the configured language for the given user.
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

  app.listen({ port: 4001 }, () => {
    console.log(
      `🚀 ${bgCyan('Server ready')} at ${blue(
        `http://localhost:4001${server.graphqlPath}`
      )}`
    );
  });
};

startServer();
