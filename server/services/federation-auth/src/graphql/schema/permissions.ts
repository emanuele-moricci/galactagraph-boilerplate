import { shield } from 'graphql-shield';
import { isAuthenticated } from 'galactagraph-utils';

const permissions = shield({
  User: isAuthenticated,
});

export default permissions;
