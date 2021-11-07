/**
  _________                          .__  __          
 /   _____/ ____   ____  __ _________|__|/  |_ ___.__.
 \_____  \_/ __ \_/ ___\|  |  \_  __ \  \   __<   |  |
 /        \  ___/\  \___|  |  /|  | \/  ||  |  \___  |
/_______  /\___  >\___  >____/ |__|  |__||__|  / ____|
        \/     \/     \/                       \/     
 
 * Here we define the security policies for the server.
 * This file is needed to add some Gateway-Level security measures to prevent malicious attacks
 * And strengthen the security and stability of the server.
 * 
 */
import express from 'express';
import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';

import { loadContext } from '@src/config/communication';

import hpp from 'hpp';
import { inspect } from 'util';
import toobusy from 'toobusy-js';
import depthLimit from 'graphql-depth-limit';

interface IServerSecurity {
  app: express.Application;
  server: ApolloServer;
}

export default async (gateway: ApolloGateway): Promise<IServerSecurity> => {
  /**
   * The normal Express bootstrapping workflow. Nothing to see here.
   * P.S. The app creation has to be BEFORE the *server.start()* line to prevent runtime errors.
   */
  const app = express();

  /**
   * The ApolloExpress Server Creation follows these steps.
   * - Loads the gateway;
   * - Adds Depth Limiting to prevent GraphQL Query DDos Attacks;
   * - Adds Client Error Hiding with inspection logging;
   */
  const server = new ApolloServer({
    gateway,
    context: loadContext,
    validationRules: [depthLimit(10)],
    formatError: error => {
      console.error(inspect(error, false, null, true));
      return new Error('❌ Oh no! There was an error...');
    },
  });
  await server.start();

  /**
   * This block adds the rest of the security middleware:
   * - URL Encoding to prevent XSS Attacks;
   * - Anti-Parameter Pollution measures with the *hpp* library;
   * - Anti-DDos Measures using the *toobusy* library;
   */
  app.use(express.urlencoded({ extended: false }));
  app.use(hpp());
  app.use(function (_, res, next) {
    if (toobusy()) {
      res
        .status(503)
        .send(
          '🚫 The server is busy right now, sorry for the inconvenience...'
        );
    } else {
      next();
    }
  });

  server.applyMiddleware({ app });

  return { app, server };
};
