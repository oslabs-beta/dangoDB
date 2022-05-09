// deno-lint-ignore-file no-explicit-any

import { Query } from './query.ts';
import { Schema } from './schema.ts';

/**
  * @description Exports a function model that returns a new Model object.
  * @param collectionName The collection name to apply the schema to
  * @param schema The created instance of the Schema class
  * 
  * @returns A new model object
  */
export function model (collectionName: string, schema: Schema) {
  return new Model(collectionName, schema);
}

/**
  * Class definition of a Model.
  * Extends the Query class.
  * @param collectionName The collection name to apply the schema to
  * @param schema The created instance of the Schema class
  * 
  * @returns An object of class SchemaOptions.
  */
class Model extends Query {
  collectionName: string;
  schema: Schema;
  
  constructor(collectionName: string, schema: Schema) {
    super(collectionName, schema);
    //TODO: Can we delete these
    this.collectionName = collectionName;
    this.schema = schema;
  }
}