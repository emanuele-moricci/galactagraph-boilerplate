import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

// PACKAGE IMPORTS
import resolvers from './graphql/resolvers';
import { PaginationAndSearchArgs } from './graphql/QueryArgs';

import { isAuthenticated } from './security/Authorization';
import { cryptObject, decryptObject } from './security/Hashing';
import { verifyToken, signToken } from './security/JWT';

import configPath from './tools/resolverConfig';

const typeDefs = loadFilesSync(path.join(__dirname, '.'), {
  recursive: true,
  extensions: ['graphql'],
  ignoreIndex: true,
});
const commonTypeDefs = [typeDefs];

// EXPORTS
export {
  resolvers,
  PaginationAndSearchArgs,
  isAuthenticated,
  cryptObject,
  decryptObject,
  verifyToken,
  signToken,
  configPath,
  commonTypeDefs,
};
