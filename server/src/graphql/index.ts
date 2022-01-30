import { ApolloServer, gql } from 'apollo-server-express';
import { buildSubgraphSchema, GraphQLSchemaModule } from '@apollo/federation';
import { toGlobalId } from 'graphql-relay';
import { userDao } from './dao';
import { Resolvers } from './__generated__/graphql';

const schemaModules: GraphQLSchemaModule[] = [
  {
    typeDefs: gql`
      type User {
        id: ID!
        name: String!
      }

      type Query {
        user(id: ID!): User
      }
    `,
    resolvers: {
      Query: {
        user: async (source, args, context, info) => {
          const user = await userDao.findById(args.id);
          return { ...user, id: toGlobalId('User', user.id) };
        },
      },
    },
  },
];

export const createServer = async () => {
  return new ApolloServer({
    schema: buildSubgraphSchema(schemaModules),
    context: async ({ req, res }) => {
      let sessionUser = userDao.findById('1');

      return { req, res, sessionUser };
    },
  });
};
