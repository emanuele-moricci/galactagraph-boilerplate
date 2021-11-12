import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

// PACKAGE IMPORTS
import resolvers from './graphql/resolvers';

import { cryptObject, decryptObject } from './security/Hashing';
import { verifyToken, signToken } from './security/JWT';

import { PaginationAndSearchArgs } from './graphql/QueryArgs';

import authDirective from './directives/auth';
import { rateTypeDefs, rateDirective } from './directives/rate';

const typeDefs = loadFilesSync(path.join(__dirname, '.'), {
  recursive: true,
  extensions: ['graphql'],
  ignoreIndex: true,
});
const commonTypeDefs = [typeDefs, rateTypeDefs];

// EXPORTS
export {
  cryptObject,
  decryptObject,
  PaginationAndSearchArgs,
  resolvers,
  verifyToken,
  signToken,
  authDirective,
  rateDirective,
  commonTypeDefs,
};
