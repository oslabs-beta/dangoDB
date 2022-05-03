// deno-lint-ignore-file no-explicit-any

/**
 * 
 * @description This file exports the main dango object.
 * 
 */

import { Connection } from './connections.ts';
import { model } from './model.ts';
import { Schema } from './schema.ts';

class Dango {

  currentConnection: boolean | Connection
  model: typeof model;

  constructor() {
    this.currentConnection = false;
    this.model = model;
  }

  connect(connectionString: string) {
    this.currentConnection = new Connection(connectionString)
    this.currentConnection.connect()
    return this.currentConnection;
  }

  disconnect() {
    if (typeof this.currentConnection === 'boolean') {
      if (this.currentConnection === false) {
        throw new Error('No database connection exists to disconnect.');
      }
    } else {
      this.currentConnection.disconnect();
      this.currentConnection = false;
      return;
    }
  }

  schema(schemaObj: Record<string, any>) {
    return new Schema(schemaObj);
  }
}

const dango: Dango = new Dango();

export { dango };