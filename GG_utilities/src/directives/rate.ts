import { rateLimitDirective } from 'graphql-rate-limit-directive';

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
  rateLimitDirective();

export const rateTypeDefs = rateLimitDirectiveTypeDefs;
export const rateDirective = rateLimitDirectiveTransformer;
