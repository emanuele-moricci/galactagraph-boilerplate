import 'reflect-metadata';

import { ClassResolverType, RelationshipType } from './types';

const Resolver =
  <T extends { new (...args: any[]): unknown }>(
    name: string,
    type: ClassResolverType
  ) =>
  (target: T): void => {
    Reflect.defineMetadata('resolver:name', name, target.prototype);
    Reflect.defineMetadata('resolver:type', type, target.prototype);
  };

const Relationship = (type: string, model: string, target: Object) =>
  Reflect.defineMetadata(`resolver:${type}`, model, target);

/**
 * `Class Decorator`
 *
 * Function that decorates a class with a `resolver:name` and `resolver:type` metadata
 * with the given name and the `Model` type.
 *
 * Used by the `Class Compiler` function to add the decorated class to the GraphQL SubGraph.
 *
 * @param {string} name - The name of the GraphQL object (Ex. `User`).
 */
export const ModelResolver = (name: string) =>
  Resolver(name, ClassResolverType.Model);

/**
 * `Class Decorator`
 *
 * Function that decorates a class with a `resolver:name` and `resolver:type` metadata
 * with the given name and the `Query` type.
 *
 * Used by the `Class Compiler` function to add the decorated class to the GraphQL SubGraph.
 *
 * @param {string} name - The name of the GraphQL query (Ex. `getActiveUsers`).
 */
export const QueryResolver = (name: string) =>
  Resolver(name, ClassResolverType.Query);

/**
 * `Class Decorator`
 *
 * Function that decorates a class with a `resolver:name` and `resolver:type` metadata
 * with the given name and the `Mutation` type.
 *
 * Used by the `Class Compiler` function to add the decorated class to the GraphQL SubGraph.
 *
 * @param {string} name - The name of the GraphQL mutation (Ex. `updateUserPassword`).
 */
export const MutationResolver = (name: string) =>
  Resolver(name, ClassResolverType.Mutation);

/**
 * `Class Decorator`
 *
 * Function that decorates a class with a `resolver:name` and `resolver:type` metadata
 * with the given names and the `Extension` type.
 *
 * Used by the `Class Compiler` function to add the decorated class to the GraphQL SubGraph.
 *
 * @param {string} left - The name of the GraphQL object in another SubGraph (Ex. `Language`).
 * @param {string} right - The name of the GraphQL object in the current SubGraph (Ex. `User`).
 */
export const ExtensionResolver = (left: string, right: string) =>
  Resolver(`${left}-${right}`, ClassResolverType.Extension);

/**
 * `Method Decorator`
 *
 * Function that decorates the `resolve` method `resolver:resolve` metadata
 * with the given model name.
 *
 * Used by the `Class Compiler` function to parse the decorated Extension class for the GraphQL SubGraph.
 *
 * @param {string} model - The name of the GraphQL object in another SubGraph (Ex. `Language`).
 */
export const ResolveRelationship =
  (model: string): any =>
  (target: any) =>
    Relationship(RelationshipType.resolve, model, target);

/**
 * `Method Decorator`
 *
 * Function that decorates the `connect` method `resolver:connect` metadata
 * with the given model name.
 *
 * Used by the `Class Compiler` function to parse the decorated Extension class for the GraphQL SubGraph.
 *
 * @param {string} model - The name of the GraphQL object in the current SubGraph (Ex. `User`).
 */
export const ConnectRelationship =
  (model: string): any =>
  (target: any) =>
    Relationship(RelationshipType.connect, model, target);
