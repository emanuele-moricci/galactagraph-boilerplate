/**
_________                                     .__               __  .__               
\_   ___ \  ____   _____   _____  __ __  ____ |__| ____ _____ _/  |_|__| ____   ____  
/    \  \/ /  _ \ /     \ /     \|  |  \/    \|  |/ ___\\__  \\   __\  |/  _ \ /    \ 
\     \___(  <_> )  Y Y  \  Y Y  \  |  /   |  \  \  \___ / __ \|  | |  (  <_> )   |  \
 \______  /\____/|__|_|  /__|_|  /____/|___|  /__|\___  >____  /__| |__|\____/|___|  /
        \/             \/      \/           \/        \/     \/                    \/ 
 
 * Here we define the communication functions that pass the request from any external source to the subgraphs.
 * This built-in authenticator follows some rules to allow the request to access the subgraphs correctly:
 * - The request gets checked and parsed if the Authentication header is present and correctly configured;
 * - The context is extracted from said header using the JWT authentication system;
 * - The request gets then filled with the parsed context from the token and bounced to the subgraphs;
 * - P.S. The bounced request is crypted with a SECRET that's shared between the gateway and the subgraphs to prevent attacks;
 * 
 */
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { cryptObject, verifyToken } from 'federation-utils';

/**
 * The function responsable to hash the context, crypt it and bounce it to the subgraphs.
 *
 * @param {object} url The url of the subgraph to bounce the request to.
 *
 * @function bounceAuthToFederation.
 * @returns {RemoteGraphQLDataSource} The modified request.
 */
export function bounceAuthToFederation(url) {
  return new RemoteGraphQLDataSource({
    url,
    willSendRequest({ request, context }) {
      if (request.http) {
        const hashedContext = cryptObject(
          process.env.FEDERATION_SECRET ?? '',
          context
        );

        request.http.headers.set('Authorization', hashedContext);
      }
    },
  });
}

/**
 * The function responsable to parse the JWT authentication token and extract the context.
 * The Basic format of the token is: Bearer <JWT_TOKEN>
 *
 * @param {object} req The external request.
 *
 * @async
 * @function loadContext.
 * @returns {Promise<object | null>} The authentication context.
 */
export const loadContext = async ({ req }): Promise<object | null> => {
  const token = req?.headers?.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  return token ? verifyToken(token, process.env.AUTH_JWT_SECRET ?? '') : {};
};
