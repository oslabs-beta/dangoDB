// deno-lint-ignore-file no-explicit-any

import { Query } from './query.ts';
import { Schema } from './schema.ts';

export function model (collectionName: string, schema: Schema) {
  return new Model(collectionName, schema);
}

class Model extends Query {
  collectionName: string;
  schema: Schema;
  
  constructor(collectionName: string, schema: Schema) {
    // super(dbName, schema)
    super(collectionName, schema);
    this.collectionName = collectionName;
    this.schema = schema;
  }
}