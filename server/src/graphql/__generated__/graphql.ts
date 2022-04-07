import { PartialDeep } from 'type-fest';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  postCreate?: Maybe<PostCreatePayload>;
  postDelete?: Maybe<PostDeletePayload>;
  userCreate?: Maybe<UserCreatePayload>;
};


export type MutationPostCreateArgs = {
  input: PostCreateInput;
};


export type MutationPostDeleteArgs = {
  input: PostDeleteInput;
};


export type MutationUserCreateArgs = {
  name: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = Node & {
  __typename?: 'Post';
  body: Scalars['String'];
  id: Scalars['ID'];
  postId: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges: Array<Maybe<PostEdge>>;
  pageInfo: PageInfo;
};

export type PostCreateInput = {
  body: Scalars['String'];
  title: Scalars['String'];
};

export type PostCreatePayload = {
  __typename?: 'PostCreatePayload';
  post: Post;
  postEdge: PostEdge;
};

export type PostDeleteInput = {
  postId: Scalars['String'];
};

export type PostDeletePayload = {
  __typename?: 'PostDeletePayload';
  deletedPostId: Scalars['ID'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  postById?: Maybe<Post>;
  posts: PostConnection;
  user?: Maybe<User>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryPostByIdArgs = {
  postId: Scalars['String'];
};


export type QueryPostsArgs = {
  first?: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type UserCreatePayload = {
  __typename?: 'UserCreatePayload';
  user: User;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<PartialDeep<Scalars['String']>>;
  Node: ResolversTypes['Post'];
  ID: ResolverTypeWrapper<PartialDeep<Scalars['ID']>>;
  PageInfo: ResolverTypeWrapper<PartialDeep<PageInfo>>;
  Boolean: ResolverTypeWrapper<PartialDeep<Scalars['Boolean']>>;
  Post: ResolverTypeWrapper<PartialDeep<Post>>;
  PostConnection: ResolverTypeWrapper<PartialDeep<PostConnection>>;
  PostCreateInput: ResolverTypeWrapper<PartialDeep<PostCreateInput>>;
  PostCreatePayload: ResolverTypeWrapper<PartialDeep<PostCreatePayload>>;
  PostDeleteInput: ResolverTypeWrapper<PartialDeep<PostDeleteInput>>;
  PostDeletePayload: ResolverTypeWrapper<PartialDeep<PostDeletePayload>>;
  PostEdge: ResolverTypeWrapper<PartialDeep<PostEdge>>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<PartialDeep<Scalars['Int']>>;
  User: ResolverTypeWrapper<PartialDeep<User>>;
  UserCreatePayload: ResolverTypeWrapper<PartialDeep<UserCreatePayload>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Mutation: {};
  String: PartialDeep<Scalars['String']>;
  Node: ResolversParentTypes['Post'];
  ID: PartialDeep<Scalars['ID']>;
  PageInfo: PartialDeep<PageInfo>;
  Boolean: PartialDeep<Scalars['Boolean']>;
  Post: PartialDeep<Post>;
  PostConnection: PartialDeep<PostConnection>;
  PostCreateInput: PartialDeep<PostCreateInput>;
  PostCreatePayload: PartialDeep<PostCreatePayload>;
  PostDeleteInput: PartialDeep<PostDeleteInput>;
  PostDeletePayload: PartialDeep<PostDeletePayload>;
  PostEdge: PartialDeep<PostEdge>;
  Query: {};
  Int: PartialDeep<Scalars['Int']>;
  User: PartialDeep<User>;
  UserCreatePayload: PartialDeep<UserCreatePayload>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  postCreate?: Resolver<Maybe<ResolversTypes['PostCreatePayload']>, ParentType, ContextType, RequireFields<MutationPostCreateArgs, 'input'>>;
  postDelete?: Resolver<Maybe<ResolversTypes['PostDeletePayload']>, ParentType, ContextType, RequireFields<MutationPostDeleteArgs, 'input'>>;
  userCreate?: Resolver<Maybe<ResolversTypes['UserCreatePayload']>, ParentType, ContextType, RequireFields<MutationUserCreateArgs, 'name'>>;
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Post', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = ResolversObject<{
  edges?: Resolver<Array<Maybe<ResolversTypes['PostEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostCreatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostCreatePayload'] = ResolversParentTypes['PostCreatePayload']> = ResolversObject<{
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  postEdge?: Resolver<ResolversTypes['PostEdge'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDeletePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostDeletePayload'] = ResolversParentTypes['PostDeletePayload']> = ResolversObject<{
  deletedPostId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  postById?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostByIdArgs, 'postId'>>;
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'first'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserCreatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserCreatePayload'] = ResolversParentTypes['UserCreatePayload']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostConnection?: PostConnectionResolvers<ContextType>;
  PostCreatePayload?: PostCreatePayloadResolvers<ContextType>;
  PostDeletePayload?: PostDeletePayloadResolvers<ContextType>;
  PostEdge?: PostEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserCreatePayload?: UserCreatePayloadResolvers<ContextType>;
}>;

