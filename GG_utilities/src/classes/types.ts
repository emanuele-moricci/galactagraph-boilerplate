import 'reflect-metadata';
import { GraphQLResolveInfo } from 'graphql';

export enum ClassResolverType {
  Query = 'Query',
  Mutation = 'Mutation',
  Model = 'Model',
  Extension = 'Extension',
}

export enum RelationshipType {
  resolve = 'resolve',
  connect = 'connect',
}

export interface ResolverClass<T = any, TRef = any> {
  reference(data: TRef): Promise<T | null>;
  get?(
    source: unknown,
    args: { [argName: string]: any },
    context: unknown,
    info: GraphQLResolveInfo
  ): Promise<T[]>;
  set?(
    source: unknown,
    args: { [argName: string]: any },
    context: unknown,
    info: GraphQLResolveInfo
  ): Promise<T>;
}

export interface OperationClass<T = any> {
  resolve(
    source: unknown,
    args: { [argName: string]: any },
    context: unknown,
    info: GraphQLResolveInfo
  ): Promise<T | null>;
}

export interface ExtensionClass<T1 = any, T1Ref = any, T2 = any, T2Ref = any> {
  resolve(ref: T2Ref): T1 | T1[] | null;
  connect(ref: T1Ref): Promise<T2 | T2[] | null>;
}
