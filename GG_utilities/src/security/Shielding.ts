import { rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { userData }, _info) => {
    return userData && Object.keys(userData).length > 0
      ? userData.userId !== null
      : false;
  }
);

export const isAdmin = rule({ cache: 'contextual' })(
  async (_parent, _args, { userData }, _info) => {
    return userData.role === 'ADMIN';
  }
);

export const alwaysAllow = rule({ cache: 'contextual' })(
  async (_parent, _args, _context, _info) => true
);
