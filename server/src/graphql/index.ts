import { ApolloServer, AuthenticationError, ExpressContext, gql } from 'apollo-server-express';
import { buildSubgraphSchema, GraphQLSchemaModule } from '@apollo/federation';
import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { postDao, User, userDao } from './dao';
import { Resolvers } from './__generated__/graphql';
import { DocumentNode } from 'graphql';

type SchemaModule = {
  typeDefs: DocumentNode;
  resolvers?: Resolvers<AppContext>;
};

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
    interface UserError {
      message: String!
      field: String!
    }
  `,
};

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
    type Post implements Node {
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
      postById(id: ID!): Post
      posts(first: Int! = 30): PostConnection!
    }
  `,
  resolvers: {
    Query: {
      postById: async (source, args, context, info) => {
        const postId = fromGlobalId(args.id).id;
        const post = await postDao.findById(postId);
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
      postDelete(input: PostDeleteInput!): PostDeletePayload
      postEdit(input: PostEditInput!): PostEditPayload
    }
    input PostCreateInput {
      title: String!
      body: String!
    }
    type PostCreatePayload {
      result: PostCreateSucceededResult
      userErrors: [PostCreateError!]!
    }

    type PostCreateSucceededResult {
      post: Post!
      postEdge: PostEdge!
    }

    union PostCreateError = TitleNotExist | ProhibitedWordsExist

    type TitleNotExist implements UserError {
      message: String!
      field: String!
    }
    type ProhibitedWordsExist implements UserError {
      message: String!
      field: String!
      words: [String!]!
    }

    input PostDeleteInput {
      postId: String!
    }
    type PostDeletePayload {
      deletedPostId: ID!
    }

    input PostEditInput {
      id: ID!
      title: String
      body: String
    }
    type PostEditPayload {
      post: Post!
      postEdge: PostEdge!
    }
  `,
  resolvers: {
    Mutation: {
      postCreate: async (source, args, context, info) => {
        if (context.sessionUser == null) {
          throw new AuthenticationError('Not authenticated');
        }
        const postFromDB = await postDao.create(context.sessionUser.id, args.input.title, args.input.body);
        const post = { ...postFromDB, postId: postFromDB.id, id: toGlobalId('Post', postFromDB.id) };
        return {
          result: {
            post,
            postEdge: {
              cursor: post.id,
              node: post,
            },
          },
          userErrors: [],
        };
      },
      postDelete: async (source, args, context, info) => {
        if (context.sessionUser == null) {
          throw new Error('Not authenticated');
        }
        const id = await postDao.delete(context.sessionUser.id, args.input.postId);
        return id === null ? null : { deletedPostId: toGlobalId('Post', id) };
      },
      postEdit: async (source, args, context, info) => {
        if (context.sessionUser == null) {
          throw new Error('Not authenticated');
        }
        const postId = fromGlobalId(args.input.id).id;
        const postFromDB = await postDao.edit(context.sessionUser.id, postId, args.input.title, args.input.body);
        const post = { ...postFromDB, postId: postFromDB.id, id: toGlobalId('Post', postFromDB.id) };
        return {
          post,
          postEdge: {
            cursor: post.id,
            node: post,
          },
        };
      },
    },
  },
};

const schemaModules: SchemaModule[] = [common, nodeQuery, userQuery, userMutation, postQuery, postMutation];

type AppContext = ExpressContext & { sessionUser: User | null };
export const createServer = async () => {
  return new ApolloServer<AppContext>({
    schema: buildSubgraphSchema(schemaModules),
    context: async ({ req, res }) => {
      const id = req.headers.authorization;
      const isInvalid = id == null || Number.isNaN(Number(id)) || Number.isNaN(parseInt(id));
      let sessionUser = null;
      if (!isInvalid) {
        sessionUser = await userDao.findById(id);
      }
      return { req, res, sessionUser };
    },
  });
};
