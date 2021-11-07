/**
  ________       .__                 __           ________                    .__     
 /  _____/_____  |  | _____    _____/  |______   /  _____/___________  ______ |  |__  
/   \  ___\__  \ |  | \__  \ _/ ___\   __\__  \ /   \  __\_  __ \__  \ \____ \|  |  \ 
\    \_\  \/ __ \|  |__/ __ \\  \___|  |  / __ \\    \_\  \  | \// __ \|  |_> >   Y  \
 \______  (____  /____(____  /\___  >__| (____  /\______  /__|  (____  /   __/|___|  /
        \/     \/          \/     \/          \/        \/           \/|__|        \/ 

 * Welcome to the GalactaGraph Boilerplate!
 * This is the main gateway file. Here you can find the main configuration for the supergraph server.
 * Some notable mentions:
 * - The server is configured to use the Apollo Gateway. This is a great way to share the same schema between multiple micro-services;
 * - The server already has a configured authentication middleware that uses JWT and shares a private secret between the gateway and every micro-service;
 * - The server is using the Express framework with Apollo Federation;
 * 
 */
import { ApolloGateway } from '@apollo/gateway';

import { bounceAuthToFederation } from '@src/config/communication';
import getSecureServer from '@config/security';

import { blue } from 'chalk';
import dotenv from 'dotenv-safe';
dotenv.config();

const startServer = async () => {
  /**
   * Creates a new ApolloGateway instance with a built-in authentication middleware.
   */
  const gateway = new ApolloGateway({
    buildService({ url }) {
      return bounceAuthToFederation(url);
    },
  });

  /**
   * Adds every security middleware to the gateway and returns the Express App and the Apollo Server.
   */
  const { app, server } = await getSecureServer(gateway);

  /**
   * Starts the server under the configured port. Configure your Apollo Studio project to query&analise it!
   */
  app.listen({ port: process.env.GATEWAY_PORT }, () => {
    console.info(
      `🚀 Server ready at ${blue(
        `http://localhost:${process.env.GATEWAY_PORT}${server.graphqlPath}`
      )}`
    );
  });
};

startServer();
