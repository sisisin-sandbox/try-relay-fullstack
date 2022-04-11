const { ValidationError } = require('graphql-schema-linter/lib/validation_error');

const linterRuleName = 'implements-error-interface';

/**
 * todo: このlint ruleの詳細のドキュメンテーション
 */
function ImplementsErrorInterface(context) {
  const errorTypes = [];
  const objectTypeDefinitions = [];
  const enumTypeNameSet = new Set();
  return {
    UnionTypeDefinition: {
      enter(node) {
        if (node.directives.find((node) => node.name.value === 'lintErrorPayloadSchemaDefinition')) {
          errorTypes.push({
            errorPayloadName: node.name.value,
            types: node.types.map((node) => node.name.value),
          });
        }
      },
    },
    ObjectTypeDefinition: (node) => {
      objectTypeDefinitions.push(node);
    },
    EnumTypeDefinition: (node) => {
      enumTypeNameSet.add(node.name.value);
    },
    Document: {
      leave(node) {
        errorTypes.forEach((errorType) => {
          errorType.types.forEach((type) => validateType(type));
        });
      },
    },
  };

  /**
   * エラーが以下の制約を満たしていることを確認する
   * codeがenum型で存在する
   * UserError interfaceを継承している
   */
  function validateType(namedTypeName) {
    const typeDefinition = objectTypeDefinitions.find((type) => type.name.value === namedTypeName);

    const isImplementedUserErrorInterface =
      typeDefinition.interfaces.filter((i) => i.name.value === 'UserError').length > 0;
    if (!isImplementedUserErrorInterface) {
      context.reportError(
        new ValidationError(linterRuleName, `\`${namedTypeName}\` is not implements UserError interface`, [
          typeDefinition,
        ]),
      );
    }

    // todo: codeがない場合とenum型でないケースをそれぞれ作りたい
    const hasValidCodeField =
      typeDefinition.fields.filter((field) => {
        const hasCode = field.name.value === 'code';
        const isEnum = enumTypeNameSet.has(field.type?.type?.name?.value);

        return hasCode && isEnum;
      }).length > 0;

    if (!hasValidCodeField) {
      context.reportError(
        new ValidationError(linterRuleName, `\`${namedTypeName}\` must have enum type \`code\` field`, [
          typeDefinition,
        ]),
      );
    }
  }
}

module.exports = { ImplementsErrorInterface };
