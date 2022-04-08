import { gql } from 'apollo-server-express';
import { fromGlobalId } from 'graphql-relay';
import { postDao, userDao } from '../dao';
import { SchemaModule } from '../type';

const nodeQuery: SchemaModule = {
  typeDefs: gql`
    extend type Query {
      node(id: ID!): Node
    }
  `,
  resolvers: {
    Query: {
      node: async (source, args, context, info) => {
        const { id, type } = fromGlobalId(args.id);
        switch (type) {
          case 'User':
            return await userDao.findById(id);
          case 'Post':
            return await postDao.findById(id);
          default:
            return null;
        }
      },
    },
  },
};

export const nodeSchemaModules = [nodeQuery];
