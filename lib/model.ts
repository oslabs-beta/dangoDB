// deno-lint-ignore-file no-explicit-any

import { Query } from './query.ts';
import { Schema } from './schema.ts';

export function model (dbName: string, schema: Record<string, any>) {
  return new Model(dbName, schema);
}

class Model extends Query {
  dbName: string;
  schema: Schema;
  
  constructor(dbName: string, schema: Schema) {
    // super(dbName, schema)
    super(dbName);
    this.dbName = dbName;
    this.schema = schema;
  }
}