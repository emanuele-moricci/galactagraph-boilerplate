import { rule } from 'graphql-shield';

/**
 * Common rule that checks if a user is authenticated by checking if the parsed user data
 * was found in the request between the Gateway and the Micro-Service.
 * This implies that the main request was passed with a valid (and already checked) JWT Token.
 *
 * @function isAuthenticated
 *
 * @returns {Rule} The Authentication Rule.
 */
export const isAuthenticated = rule()((_, __, { userData }) => {
  return (
    userData !== null &&
    userData !== undefined &&
    Object.keys(userData).length > 0
  );
});
