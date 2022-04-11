import { AuthenticationError, gql } from 'apollo-server-express';
import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { postDao } from '../dao';
import { SchemaModule } from '../type';
import { PostCreateErrorCode, PostCreateError } from '../__generated__/graphql';

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
      posts(first: Int! = 30, after: ID!): PostConnection!
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

    union PostCreateError @lintErrorPayloadSchemaDefinition =
        PostCreateTitleDoesNotExist
      | PostCreateProhibitedWordsExist
    enum PostCreateErrorCode {
      TITLE_DOES_NOT_EXIST
      PROHIBITED_WORDS_EXIST
    }

    type PostCreateTitleDoesNotExist implements UserError {
      message: String!
      field: String!

      code: PostCreateErrorCode!
    }
    type PostCreateProhibitedWordsExist implements UserError {
      message: String!
      field: String!

      code: PostCreateErrorCode!
      words: [String!]!
    }

    type PostCreateSucceededResult {
      post: Post!
      postEdge: PostEdge!
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

        const userErrors: PostCreateError[] = [];
        if (args.input.title == null || args.input.title === '') {
          userErrors.push({
            __typename: 'PostCreateTitleDoesNotExist',
            code: PostCreateErrorCode.TitleDoesNotExist,
            message: '`title` is required',
            field: 'title',
          });
        }

        if (args.input.title.includes('prohibited')) {
          userErrors.push({
            __typename: 'PostCreateProhibitedWordsExist',
            code: PostCreateErrorCode.ProhibitedWordsExist,
            message: '`title` contains prohibited words',
            field: 'title',
            words: ['prohibited'],
          });
        }

        if (userErrors.length > 0) {
          return { result: null, userErrors };
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

export const postSchemaModules = [postQuery, postMutation];
