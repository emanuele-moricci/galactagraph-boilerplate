import resolvers from './resolvers';

import { cryptObject, decryptObject } from './security/Hashing';
import { verifyToken, signToken } from './security/JWT';
import { isAuthenticated, isAdmin, alwaysAllow } from './security/Shielding';

import { PaginationAndSearchArgs } from './types/QueryArgs';

import authDirective from './directives/auth';

// EXPORTS
export {
  cryptObject,
  decryptObject,
  PaginationAndSearchArgs,
  resolvers,
  verifyToken,
  signToken,
  isAuthenticated,
  isAdmin,
  alwaysAllow,
  authDirective,
};
