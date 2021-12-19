import { GraphQLResolverMap } from 'apollo-graphql';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import path from 'path';

import { resolvers as customResolvers, commonTypeDefs } from 'federation-utils';

// TYPE DEFINITIONS
const typeDefs = loadFilesSync(path.join(__dirname, '.'), {
  recursive: true,
  extensions: ['graphql'],
  ignoreIndex: true,
});
const mergedTypeDefs = mergeTypeDefs([commonTypeDefs, typeDefs]);

// RESOLVERS
const resolvers = loadFilesSync(path.join(__dirname, '.'), {
  recursive: true,
  extensions: ['resolver.ts'],
  ignoreIndex: true,
});
const mergedResolvers = mergeResolvers([...resolvers, customResolvers]);

// SCHEMA
const schema = buildSubgraphSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers as GraphQLResolverMap<any>,
});

export default schema;
