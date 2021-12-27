import 'reflect-metadata';
import { GraphQLResolverMap } from 'apollo-graphql';

import {
  ClassResolverType,
  ResolverClass,
  OperationClass,
  ExtensionClass,
} from './types';

type ParsedResponse = {
  models: any;
  queries: any;
  mutations: any;
  extensions: any;
  references: GraphQLResolverMap;
};

const parseQueryResolver = (model: OperationClass<any>): any => {
  const modelName = Reflect.getMetadata('resolver:name', model);

  return {
    Query: {
      [modelName]: model.resolve,
    },
  };
};

const parseMutationResolver = (model: OperationClass<any>): any => {
  const modelName = Reflect.getMetadata('resolver:name', model);

  return {
    Mutation: {
      [modelName]: model.resolve,
    },
  };
};

const parseModelResolver = (model: ResolverClass<any, any>): any => {
  const modelName = Reflect.getMetadata('resolver:name', model);
  const modelKeys = Object.keys(model).filter(
    prop => prop !== 'get' && prop !== 'set'
  );

  const modelPropsObject: Record<string, unknown> = {};
  modelKeys.forEach((key: string) => {
    modelPropsObject[key] = model[key as keyof ResolverClass<any, any>];
  });

  const modelQueryObject = model.get
    ? {
        Query: {
          [modelName]: model.get,
        },
      }
    : {};

  const modelMutationObject = model.set
    ? {
        Mutation: {
          [`create${modelName}`]: model.set,
        },
      }
    : {};

  return {
    ...modelQueryObject,
    ...modelMutationObject,
    [modelName]: modelPropsObject,
  };
};

const parseExtensionResolver = (model: ExtensionClass<any, any>): any => {
  const [left, right] = Reflect.getMetadata('resolver:name', model).split('-');
  const resolve = Reflect.getMetadata('resolver:resolve', model);
  const connect = Reflect.getMetadata('resolver:connect', model);

  const connectObj = connect
    ? {
        [left]: {
          [connect]: model.connect,
        },
      }
    : {};

  return {
    [right]: {
      [resolve]: model.resolve,
    },
    ...connectObj,
  };
};

const parseModelReference = (
  model: ResolverClass<any, any>
): GraphQLResolverMap => {
  const modelName = Reflect.getMetadata('resolver:name', model);

  return {
    [modelName]: {
      __resolveReference: model.reference,
    },
  };
};

/**
 * Function takes every class file and parses them
 * into the required resolvers objects readable by the Apollo GraphQL library.
 * Allowed extension names:
 * - `.model.ts`      => ResolverClass<T, TRef>
 * - `.query.ts`      => OperationClass<T>
 * - `.mutation.ts`   => OperationClass<T>
 * - `.extension.ts`  => ExtensionClass<T1, T1Ref, T2, T2Ref>
 *
 * @param {PaginationAndSearchArgs} models - The pagination and search arguments.
 *
 * @function parseClasses.
 * @returns {ParsedResponse} The object containing every parsed class.
 */
const parseClasses = (
  models: (ResolverClass | OperationClass | ExtensionClass)[]
): ParsedResponse => {
  const parsedModels: any = [];
  const parsedQueries: any = [];
  const parsedMutations: any = [];
  const parsedExtensions: any = [];
  let parsedReferences: GraphQLResolverMap = {};

  models.forEach(model => {
    const modelType = Reflect.getMetadata('resolver:type', model);
    switch (modelType) {
      case ClassResolverType.Model:
        parsedModels.push(parseModelResolver(model as ResolverClass));
        parsedReferences = {
          ...parsedReferences,
          ...parseModelReference(model as ResolverClass),
        };
        break;
      case ClassResolverType.Query:
        parsedQueries.push(parseQueryResolver(model as OperationClass));
        break;
      case ClassResolverType.Mutation:
        parsedMutations.push(parseMutationResolver(model as OperationClass));
        break;
      case ClassResolverType.Extension:
        parsedExtensions.push(parseExtensionResolver(model as ExtensionClass));
        break;
      default:
        break;
    }
  });

  return {
    models: parsedModels,
    queries: parsedQueries,
    mutations: parsedMutations,
    extensions: parsedExtensions,
    references: parsedReferences,
  };
};

export default parseClasses;
