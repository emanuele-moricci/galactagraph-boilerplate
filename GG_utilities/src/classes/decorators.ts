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

export const ModelResolver = (name: string) =>
  Resolver(name, ClassResolverType.Model);

export const QueryResolver = (name: string) =>
  Resolver(name, ClassResolverType.Query);

export const MutationResolver = (name: string) =>
  Resolver(name, ClassResolverType.Mutation);

export const ExtensionResolver = (left: string, right: string) =>
  Resolver(`${left}-${right}`, ClassResolverType.Extension);

export const ResolveRelationship =
  (model: string): any =>
  (target: any) =>
    Relationship(RelationshipType.resolve, model, target);

export const ConnectRelationship =
  (model: string): any =>
  (target: any) =>
    Relationship(RelationshipType.connect, model, target);
