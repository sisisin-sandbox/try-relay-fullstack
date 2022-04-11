const path = require('path');

module.exports = {
  schemaPaths: [path.resolve(__dirname, './src/graphql/__generated__/schema.graphql')],
  customRulePaths: [path.resolve(__dirname, './schema-linter-custom-rules/*.js      ')],
  rules: [
    // 'arguments-have-descriptions',
    'defined-types-are-used',
    'deprecations-have-a-reason',
    'descriptions-are-capitalized',
    'enum-values-all-caps',
    // 'enum-values-have-descriptions',
    'enum-values-sorted-alphabetically',
    'fields-are-camel-cased',
    // 'fields-have-descriptions',
    'input-object-fields-sorted-alphabetically',
    'input-object-values-are-camel-cased',
    // 'input-object-values-have-descriptions',
    'interface-fields-sorted-alphabetically',
    'relay-connection-types-spec',
    'relay-connection-arguments-spec',
    'type-fields-sorted-alphabetically',
    'types-are-capitalized',
    // 'types-have-descriptions',

    // custom rules
    'implements-error-interface',
  ],
};
