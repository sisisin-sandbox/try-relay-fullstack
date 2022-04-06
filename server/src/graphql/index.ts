import { ApolloServer, ExpressContext, gql } from 'apollo-server-express';
import { buildSubgraphSchema, GraphQLSchemaModule } from '@apollo/federation';
import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { postDao, User, userDao } from './dao';
import { Resolvers } from './__generated__/graphql';
import { DocumentNode } from 'graphql';

type SchemaModule = {
  typeDefs: DocumentNode;
  resolvers?: Resolvers<AppContext>;
};

const base: SchemaModule = {
  typeDefs: gql`
    type Query
    type Mutation

    type PageInfo {
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
      endCursor: String
    }
  `,
};
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
const postQuery: SchemaModule = {
  typeDefs: gql`
    type Post {
      id: ID!
      postId: String!
      userId: String!
      title: String!
      body: String!
    }

    type PostConnection {
      edges: [PostEdge]!
      pageInfo: PageInfo!
    }

    type PostEdge {
      cursor: String!
      node: Post!
    }

    extend type Query {
      postById(postId: String!): Post
      posts(first: Int! = 30): PostConnection!
    }
  `,
  resolvers: {
    Query: {
      postById: async (source, args, context, info) => {
        const post = await postDao.findById(args.postId);
        console.log({ ...post, postId: post.id, id: toGlobalId('Post', post.id) });
        return { ...post, postId: post.id, id: toGlobalId('Post', post.id) };
      },
      posts: async (source, args, context, info) => {
        const emptyPageInfo = {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        };
        const posts = await postDao.findMany();
        const edges = posts.map((post) => ({
          cursor: post.id,
          node: { ...post, postId: post.id, id: toGlobalId('Post', post.id) },
        }));
        return { edges, pageInfo: emptyPageInfo };
      },
    },
  },
};
const postMutation: SchemaModule = {
  typeDefs: gql`
    extend type Mutation {
      postCreate(input: PostCreateInput!): PostCreatePayload
    }
    input PostCreateInput {
      title: String!
      body: String!
    }
    type PostCreatePayload {
      post: Post!
    }
  `,
  resolvers: {
    Mutation: {
      postCreate: async (source, args, context, info) => {
        const post = await postDao.create(context.sessionUser.id, args.input.title, args.input.body);
        return {
          post: { ...post, postId: post.id, id: toGlobalId('Post', post.id) },
        };
      },
    },
  },
};

const schemaModules: SchemaModule[] = [base, userQuery, userMutation, postQuery, postMutation];

type AppContext = ExpressContext & { sessionUser: User };
export const createServer = async () => {
  return new ApolloServer<AppContext>({
    schema: buildSubgraphSchema(schemaModules),
    context: async ({ req, res }) => {
      let sessionUser = await userDao.findById('1');

      return { req, res, sessionUser };
    },
  });
};
