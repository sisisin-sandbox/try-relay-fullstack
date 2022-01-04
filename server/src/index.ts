import express from 'express';
import { createServer } from './graphql';
const app = express();

async function startApp() {
  const apolloServer = await createServer();
  await apolloServer.start();
  app.use(apolloServer.getMiddleware());

  app.get('/', (_, res) => {
    res.json({ ok: true });
  });

  app.listen(3100, () => {
    console.log('running');
  });
}

startApp().catch((e) => {
  console.error(e);
  process.exit(1);
});
