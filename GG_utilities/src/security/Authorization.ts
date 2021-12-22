import { rule } from 'graphql-shield';

export const isAuthenticated = rule()((_, __, { userData }) => {
  return (
    userData !== null &&
    userData !== undefined &&
    Object.keys(userData).length > 0
  );
});
