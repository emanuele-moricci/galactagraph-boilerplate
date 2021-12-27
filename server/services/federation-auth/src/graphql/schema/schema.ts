import path from 'path';

import { GraphQLResolverMap, addResolversToSchema } from 'apollo-graphql';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import { applyMiddleware } from 'graphql-middleware';

import {
  resolvers as commonResolvers,
  commonTypeDefs,
  configPath,
} from 'galactagraph-utils';
import { parseClasses } from 'galactagraph-utils/lib/classes';

import IApolloServerContext from '@src/config/apolloConfig';

import permissions from './permissions';

/**
 * TYPE DEFINITIONS
 *
 * The following function is used to merge all the `.graphql` type definitions of the `federation-auth` subgraph
 */
const typeDefs = loadFilesSync(
  path.join(__dirname, '.'),
  configPath(['graphql'])
);

/**
 * MODEL, OPERATION AND EXTENSION RESOLVERS
 *
 * The following function is used to merge all the class resolvers of the `federation-auth` subgraph.
 */
const models = loadFilesSync(
  path.join(__dirname, '.'),
  configPath(['model.ts', 'query.ts', 'mutation.ts', 'extension.ts'])
);

/**
 * MERGING TYPE DEFINITIONS AND EXTENSION RESOLVERS
 *
 * The following function is used to merge all the type definitions and resolvers of the `federation-auth` subgraph.
 *
 * Because of a bug with the Apollo Federation and the GraphQL-Shield libraries, we have to input the Resolver References
 * after applying the service middlewares.
 */
const mergedTypeDefs = mergeTypeDefs([commonTypeDefs, typeDefs]);
const { references, ...resolvers } = parseClasses(models);
const mergedResolvers = mergeResolvers([
  ...Object.values(resolvers),
  commonResolvers,
]);

/**
 * SCHEMA COMPOSITION
 *
 * The following function is used to compose the `federation-auth` subgraph schema,
 * adding the type definitions with the resolvers, applying the GraphQL-Shield middleware
 * and adding the `__resolveReference` functions back to the schema for safe SuperGraph resolution.
 */
let schema = buildSubgraphSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers as GraphQLResolverMap<IApolloServerContext>,
});
schema = applyMiddleware(schema, permissions);
addResolversToSchema(schema, references);

const enhancedSchema = schema;
export default enhancedSchema;
