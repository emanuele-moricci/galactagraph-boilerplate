import { shield } from 'graphql-shield';
import { isAuthenticated } from 'federation-utils';

const permissions = shield({
  User: isAuthenticated,
});

export default permissions;
