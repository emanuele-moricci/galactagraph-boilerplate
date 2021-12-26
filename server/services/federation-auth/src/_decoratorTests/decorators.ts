import 'reflect-metadata';
import { PaginationAndSearchArgs } from 'galactagraph-utils';
import IApolloServerContext from '@src/config/apolloConfig';
import { GraphQLResolveInfo } from 'graphql';

export interface ResolverClass<T = any, TRef = any> {
  reference(data: TRef): Promise<T | null>;
  get?(
    source: unknown,
    args: PaginationAndSearchArgs,
    context: IApolloServerContext,
    info: GraphQLResolveInfo
  ): Promise<T[]>;
  set?(
    source: unknown,
    args: { [argName: string]: any },
    context: IApolloServerContext,
    info: GraphQLResolveInfo
  ): Promise<T>;
}

export interface OperationClass<T = any> {
  resolve(
    source: unknown,
    args: { [argName: string]: any },
    context: IApolloServerContext,
    info: GraphQLResolveInfo
  ): Promise<T | null>;
}

export interface ExtensionClass<T1 = any, T1Ref = any, T2 = any, T2Ref = any> {
  resolve(ref: T2Ref): T1 | T1[] | null;
  connect(ref: T1Ref): Promise<T2 | T2[] | null>;
}

// RESOLVER DECORATORS
export enum ClassResolverType {
  Query = 'Query',
  Mutation = 'Mutation',
  Model = 'Model',
  Extension = 'Extension',
}

const Resolver =
  <T extends { new (...args: any[]): unknown }>(
    name: string,
    type: ClassResolverType
  ) =>
  (target: T): void => {
    Reflect.defineMetadata('resolver:name', name, target.prototype);
    Reflect.defineMetadata('resolver:type', type, target.prototype);
  };

export const ModelResolver = (name: string) =>
  Resolver(name, ClassResolverType.Model);

export const QueryResolver = (name: string) =>
  Resolver(name, ClassResolverType.Query);

export const MutationResolver = (name: string) =>
  Resolver(name, ClassResolverType.Mutation);

export const ExtensionResolver = (left: string, right: string) =>
  Resolver(`${left}-${right}`, ClassResolverType.Extension);
