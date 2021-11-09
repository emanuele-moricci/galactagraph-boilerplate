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
    schema: schema,
    context: async ({ req }) => await getApolloServerContext(req),
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
