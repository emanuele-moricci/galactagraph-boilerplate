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
import { GraphQLError } from 'graphql';

import { loadContext } from '@src/config/communication';

import hpp from 'hpp';
import { inspect } from 'util';
import toobusy from 'toobusy-js';
import depthLimit from 'graphql-depth-limit';
import rateLimit from 'express-rate-limit';
import queryComplexity, { simpleEstimator } from 'graphql-query-complexity';

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
   * The GraphQL Query Complexity calculator.
   * This rule applied to the Apollo Server below blocks any query with a total calculated complexity higher than 100 points.
   * The module prevents any Resource Exaustion Attack.
   */
  const queryComplexityRule = queryComplexity({
    maximumComplexity: 100,
    createError: (max: number, actual: number) =>
      new GraphQLError(
        `Query is too complex: ${actual}. Maximum allowed complexity: ${max}`
      ),
    estimators: [
      simpleEstimator({
        defaultComplexity: 1,
      }),
    ],
  });

  /**
   * The ApolloExpress Server Creation follows these steps.
   * - Loads the gateway;
   * - Adds Depth Limiting to prevent GraphQL Query DDos Attacks;
   * - Adds Client Error Hiding with inspection logging;
   */
  const server = new ApolloServer({
    gateway,
    context: loadContext,
    introspection: process.env.NODE_ENV !== 'production',
    validationRules: [depthLimit(10), queryComplexityRule],
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
   * - Server Rate-Limiting to lock any IP at 100 requests every 10 minutes
   * - Anti-DDos Measures using the *toobusy* library;
   */
  app.use(express.urlencoded({ extended: false }));
  app.use(hpp());
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 100,
    })
  );
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
