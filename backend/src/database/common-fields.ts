import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const defaultId: TableColumnOptions = {
  name: 'id',
  type: 'uuid',
  isPrimary: true,
  generationStrategy: 'uuid',
  default: 'uuid_generate_v4()',
};

export const defaultTimestamps: TableColumnOptions[] = [
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
  },
];
