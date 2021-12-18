import { GraphQLResolverMap } from "apollo-graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import path from "path";

import {
  resolvers as customResolvers,
  authDirective,
  commonTypeDefs,
  rateDirective,
} from 'federation-utils';
import { GraphQLSchema } from 'graphql';

// TYPE DEFINITIONS
const typeDefs = loadFilesSync(path.join(__dirname, "."), {
  recursive: true,
  extensions: ["graphql"],
  ignoreIndex: true,
});
const mergedTypeDefs = mergeTypeDefs([commonTypeDefs, typeDefs]);

// RESOLVERS
const resolvers = loadFilesSync(path.join(__dirname, "."), {
  recursive: true,
  extensions: ["resolver.ts"],
  ignoreIndex: true,
});
const mergedResolvers = mergeResolvers([...resolvers, customResolvers]);

// SCHEMA
let schema = buildSubgraphSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers as GraphQLResolverMap<any>,
});

// DIRECTIVES
schema = authDirective(schema) as unknown as GraphQLSchema;
schema = rateDirective(schema);

export default schema;
