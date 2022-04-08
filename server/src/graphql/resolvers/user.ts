import { gql } from 'apollo-server-express';
import { toGlobalId } from 'graphql-relay';
import { SchemaModule } from '../type';
import { userDao } from '../dao';

const userQuery: SchemaModule = {
  typeDefs: gql`
    type User {
      id: ID!
      userId: String!
      name: String!
    }

    extend type Query {
      user(id: ID!): User
    }
  `,
  resolvers: {
    Query: {
      user: async (source, args, context, info) => {
        const user = await userDao.findById(args.id);
        return { ...user, userId: user.id, id: toGlobalId('User', user.id) };
      },
    },
  },
};
const userMutation: SchemaModule = {
  typeDefs: gql`
    extend type Mutation {
      userCreate(name: String!): UserCreatePayload
    }

    type UserCreatePayload {
      user: User!
    }
  `,
  resolvers: {
    Mutation: {
      userCreate: async (source, args, context, info) => {
        const user = await userDao.create(args.name);
        return {
          user: { ...user, userId: user.id, id: toGlobalId('User', user.id) },
        };
      },
    },
  },
};
export const userSchemaModules: SchemaModule[] = [userQuery, userMutation];
