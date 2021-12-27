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

/**
 * `Class Interface`
 *
 * Interface that forces a `Model` Class to use some specific methods to resolve, get and create a GraphQL SubGraph Model.
 *
 * Interface Methods:
 * - `resolve`: Function that resolves a GraphQL SubGraph Model.
 * - `get`: Function that gets a GraphQL SubGraph Model list.
 * - `set`: Function that creates a GraphQL SubGraph Model.
 *
 * P.S. Other functions with the same func. props can be added using one of the model's properties as a name, to resolve said property in a custom way.
 * @example
 * // empty string to block the service from returning the user password
 * Ex. UserResolver => password = (source, args, context, info): string => ""
 *
 * @param {any} T - The Typescript type of the `Class Model` (Ex. `User`).
 * @param {any} TRef - The Typescript type of the `Class Reference Model` (Ex. `IUserRef`).
 */
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

/**
 * `Class Interface`
 *
 * Interface that forces a `Query` or `Mutation` Class to use the specific `resolve` method.
 *
 * Interface Methods:
 * - `resolve`: Function that resolves a GraphQL SubGraph Query or Mutation.
 *
 * @param {any} TReturn - The Typescript return type of the Class (Ex. `string` or `User[]`).
 */
export interface OperationClass<TReturn = any> {
  resolve(
    source: unknown,
    args: { [argName: string]: any },
    context: unknown,
    info: GraphQLResolveInfo
  ): Promise<TReturn | null>;
}

/**
 * `Class Interface`
 *
 * Interface that forces an `Extension` Class to use the specific `resolve` and `connect` methods.
 *
 * Interface Methods:
 * - `resolve`: Function that resolves a Model from a different SubGraph as a property of a Model from the current SubGraph.
 * - `connect`: Function that resolves a Model from the current SubGraph as a property of a Model from a different SubGraph.
 *
 * @param {any} T1 - The Typescript generated type of the External Model(Ex. `Language`).
 * @param {any} T1Ref - The Typescript type of the External Reference Model (Ex. `ILanguageRef`).
 * @param {any} T2 - The Typescript type of the Model of the current Subgraph (Ex. `User`).
 * @param {any} T2Ref - The Typescript type of the Reference Model of the current Subgraph (Ex. `IUserRef`).
 */
export interface ExtensionClass<T1 = any, T1Ref = any, T2 = any, T2Ref = any> {
  resolve(ref: T2Ref): T1 | T1[] | null;
  connect?(ref: T1Ref): Promise<T2 | T2[] | null>;
}
