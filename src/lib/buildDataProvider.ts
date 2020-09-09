/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, ApolloClientOptions } from 'apollo-client';
import buildDataProvider from 'ra-data-graphql';
import {
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY,
} from 'react-admin';

import { Resource } from './interfaces';

const defaultOptions = {
  buildQuery,
  introspection: {
    operationNames: {
      [CREATE]: (resource: Resource) => `add${resource.name}`,
      [DELETE]: (resource: Resource) => `delete${resource.name}`,
      [DELETE_MANY]: (resource: Resource) => `delete${resource.name}`,
      [GET_LIST]: (resource: Resource) => `query${resource.name}`,
      [GET_MANY]: (resource: Resource) => `query${resource.name}`,
      [GET_MANY_REFERENCE]: (resource: Resource) => `query${resource.name}`,
      [GET_ONE]: (resource: Resource) => `get${resource.name}`,
      [UPDATE]: (resource: Resource) => `update${resource.name}`,
      [UPDATE_MANY]: (resource: Resource) => `update${resource.name}`,
    },
    exclude: undefined,
    include: undefined,
  },
};

export default (options: {
  client?: ApolloClient<any>;
  clientOptions?: ApolloClientOptions<any>;
}) => {
  return buildDataProvider({ ...defaultOptions, ...options }).then(
    (graphQLDataProvider) => {
      return (
        fetchType: string,
        resource: string,
        params: { [key: string]: any }
      ): Promise<any> => {
        return graphQLDataProvider(fetchType, resource, params);
      };
    }
  );
};
