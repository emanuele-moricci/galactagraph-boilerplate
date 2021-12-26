import 'reflect-metadata';

export enum RelationshipType {
  resolve = 'resolve',
  connect = 'connect',
}

const Relationship = (type: string, model: string, target) =>
  Reflect.defineMetadata(`resolver:${type}`, model, target);

export const ResolveRelationship =
  (model: string): any =>
  (target: any) =>
    Relationship(RelationshipType.resolve, model, target);

export const ConnectRelationship =
  (model: string): any =>
  (target: any) =>
    Relationship(RelationshipType.connect, model, target);

export const lol = 1;
