import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

import { defaultFieldResolver } from 'graphql';

const checkAuthentication = (context: any): void => {
  const user = context?.userData ?? {};
  const isAuthorized = user?.userId ?? false;
  if (!isAuthorized) {
    throw new Error(`You are not authorized to see this resource`);
  }
};

const authDirectiveTransformer = (schema: any) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          checkAuthentication(context);
          return result;
        };
        return fieldConfig;
      }
    },
  });
};

export default authDirectiveTransformer;
