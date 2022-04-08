import { gql } from 'apollo-server-express';
import { SchemaModule } from '../type';

const common: SchemaModule = {
  typeDefs: gql`
    type Query
    type Mutation

    type PageInfo {
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
      endCursor: String
    }

    interface Node {
      id: ID!
    }
  `,
};

export const commonSchemaModules: SchemaModule[] = [common];
