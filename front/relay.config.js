module.exports = {
  src: './src',
  schema: '../server/src/graphql/__generated__/schema.graphql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  eagerESModules: true
};
