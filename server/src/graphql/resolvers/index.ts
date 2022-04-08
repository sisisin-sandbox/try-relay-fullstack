import { SchemaModule } from '../type';
import { commonSchemaModules } from './common';
import { nodeSchemaModules } from './node';
import { postSchemaModules } from './post';
import { userSchemaModules } from './user';
import { userErrorSchemaModules } from './userError';

export const schemaModules: SchemaModule[] = [
  ...commonSchemaModules,
  ...userErrorSchemaModules,
  ...userSchemaModules,
  ...nodeSchemaModules,
  ...postSchemaModules,
];
