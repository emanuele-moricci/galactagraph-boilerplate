import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

// PACKAGE IMPORTS
import resolvers from './graphql/resolvers';

import { isAuthenticated } from './security/Authorization';
import { cryptObject, decryptObject } from './security/Hashing';
import { verifyToken, signToken } from './security/JWT';

import { PaginationAndSearchArgs } from './graphql/QueryArgs';

const typeDefs = loadFilesSync(path.join(__dirname, '.'), {
  recursive: true,
  extensions: ['graphql'],
  ignoreIndex: true,
});
const commonTypeDefs = [typeDefs];

// EXPORTS
export {
  cryptObject,
  decryptObject,
  PaginationAndSearchArgs,
  resolvers,
  verifyToken,
  signToken,
  isAuthenticated,
  commonTypeDefs,
};
