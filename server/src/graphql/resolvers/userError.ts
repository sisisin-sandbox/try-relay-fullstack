import { gql } from 'apollo-server-express';
import { SchemaModule } from '../type';

const userError: SchemaModule = {
  typeDefs: gql`
    interface UserError {
      message: String!
    }
  `,
};

export const userErrorSchemaModules: SchemaModule[] = [userError];
