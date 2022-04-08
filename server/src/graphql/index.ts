import { buildSubgraphSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server-express';
import { userDao } from './dao';
import { schemaModules } from './resolvers';
import { AppContext } from './type';

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
