import 'reflect-metadata';
import { GraphQLResolverMap } from 'apollo-graphql';

import {
  ClassResolverType,
  ResolverClass,
  OperationClass,
  ExtensionClass,
} from './decorators';

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

  const modelPropsObject = {};
  modelKeys.forEach(key => {
    modelPropsObject[key] = model[key];
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

  return {
    [right]: {
      [resolve]: model.resolve,
    },
    [left]: {
      [connect]: model.connect,
    },
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

const parseClasses = (
  models: ResolverClass[] | OperationClass[] | ExtensionClass[]
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
        parsedModels.push(parseModelResolver(model));
        parsedReferences = {
          ...parsedReferences,
          ...parseModelReference(model),
        };
        break;
      case ClassResolverType.Query:
        parsedQueries.push(parseQueryResolver(model));
        break;
      case ClassResolverType.Mutation:
        parsedMutations.push(parseMutationResolver(model));
        break;
      case ClassResolverType.Extension:
        parsedExtensions.push(parseExtensionResolver(model));
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
