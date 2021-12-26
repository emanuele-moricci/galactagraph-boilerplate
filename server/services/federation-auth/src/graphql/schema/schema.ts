import path from 'path';
import 'reflect-metadata';

import { GraphQLResolverMap, addResolversToSchema } from 'apollo-graphql';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import { applyMiddleware } from 'graphql-middleware';

import {
  resolvers as commonResolvers,
  commonTypeDefs,
} from 'galactagraph-utils';

import parseClasses from '@src/_decoratorTests/classCompiler';
import configPath from '@src/_decoratorTests/resolverConfig';
import IApolloServerContext from '@src/config/apolloConfig';

import permissions from './permissions';

// TYPE DEFINITIONS
const typeDefs = loadFilesSync(
  path.join(__dirname, '.'),
  configPath(['graphql'])
);

// MODEL RESOLVERS
const models = loadFilesSync(
  path.join(__dirname, '.'),
  configPath(['model.ts', 'query.ts', 'mutation.ts', 'extension.ts'])
);

// MERGE RESOLVERS
const mergedTypeDefs = mergeTypeDefs([commonTypeDefs, typeDefs]);
const { references, ...resolvers } = parseClasses(models);
const mergedResolvers = mergeResolvers([
  ...Object.values(resolvers),
  commonResolvers,
]);

// SCHEMA
let schema = buildSubgraphSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers as GraphQLResolverMap<IApolloServerContext>,
});

// PERMISSIONS
schema = applyMiddleware(schema, permissions);

// REFERENCES
addResolversToSchema(schema, references);

// EXPORT
const enhancedSchema = schema;
export default enhancedSchema;
