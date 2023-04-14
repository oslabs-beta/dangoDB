// deno-lint-ignore-file no-explicit-any

/**
 *
 * @description This file exports the main dango object.
 *
 */

import { Connection } from './connections.ts';
import { model } from './model.ts';
import { Schema } from './schema.ts';
import {
  SchemaNumber,
  SchemaDecimal128,
  SchemaString,
  SchemaBoolean,
  SchemaObjectId,
  SchemaUUID,
  SchemaDate,
  SchemaObject,
} from './datatypes.ts';

/**
 * Class definition of Dango..
 * @returns An object of class SchemaOptions.
 */
class Dango {
  currentConnection: boolean | Connection;
  model: typeof model;
  types: Record<string, any>;

  constructor() {
    this.currentConnection = false;
    this.model = model;
    this.types = {
      number: SchemaNumber,
      decimal128: SchemaDecimal128,
      string: SchemaString,
      boolean: SchemaBoolean,
      objectid: SchemaObjectId,
      UUID: SchemaUUID,
      date: SchemaDate,
      object: SchemaObject,
    };
  }

  /**
   * Establishes a new connection to a database. Invokes the connect method of a Connection object.
   * @param connectionString A database URI
   *
   * @returns The connection object.
   */
  async connect(connectionString: string, databaseName: string) {
    this.currentConnection = new Connection(connectionString, databaseName);
    await this.currentConnection.connect();
    return this.currentConnection;
  }

  /**
   * Disconnects an existing connection to a database. Invokes the disconnect method of a Connection object.
   *
   * @returns undefined
   */
  async disconnect() {
    if (typeof this.currentConnection === 'boolean') {
      if (this.currentConnection === false) {
        throw new Error('No database connection exists to disconnect.');
      }
    } else {
      await this.currentConnection.disconnect();
      this.currentConnection = false;
      return;
    }
  }

  /**
   * Creates a new instance of a Schema object.
   * @param schemaObj A user-defined schema.
   *
   * @returns A schema object
   */
  schema(schemaObj: Record<string, any>) {
    return new Schema(schemaObj);
  }
}

const dango: Dango = new Dango();

export { dango };
