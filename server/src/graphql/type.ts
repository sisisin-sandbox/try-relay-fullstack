import { ExpressContext } from 'apollo-server-express';
import { DocumentNode } from 'graphql';
import { User } from './dao';
import { Resolvers } from './__generated__/graphql';

export type AppContext = ExpressContext & { sessionUser: User | null };

export type SchemaModule = {
  typeDefs: DocumentNode;
  resolvers?: Resolvers<AppContext>;
};
