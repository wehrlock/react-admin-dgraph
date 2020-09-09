import { IntrospectionSchema, IntrospectionType } from 'graphql';

export interface Resource {
  type: IntrospectionType;
  [key: string]: unknown;
}

export interface IntrospectionResult {
  types: IntrospectionType[];
  queries: IntrospectionType[];
  resources: Resource[];
  schema: IntrospectionSchema;
}
