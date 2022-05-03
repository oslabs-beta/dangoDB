// deno-lint-ignore-file no-explicit-any
// deno-lint-allow-any-bracket-notation

/**
 * 
 * @description This file defines the schema class.
 * 
 */

import { SchemaNumber, SchemaDecimal128, SchemaString, SchemaBoolean, SchemaObjectId, SchemaUUID, SchemaDate } from './datatypes.ts'

export class Schema {
  
  schemaMap: Record<string, any>;
  
  constructor(schemaObj: Record<string, any>) {
    this.schemaMap = {};    
    for (const property in schemaObj) {
      if (typeof schemaObj[property] === 'object') {
        this.schemaMap[property] = new SchemaOptions(schemaObj[property])
      } else if (typeof schemaObj[property] !== 'object' && Object.prototype.hasOwnProperty.call(type, schemaObj[property])) {
        this.schemaMap[property] = new SchemaOptions({ type: schemaObj[property]})
      } else {
        throw new Error('Argument for schema definition incorrectly formatted.')
      }
    }
  }

  isUnique() {

  }

  isRequired() {

  }

  setDefault() {

  }

  isValid() {
    
  }
}


interface optionsObject {
  type: any;
  required?: boolean;
  unique?: boolean;
  default?: any;
  validator?: Function | null;
}

class SchemaOptions {
  
  schemaOptions: optionsObject;

  constructor(options: optionsObject) {
    if (!Object.prototype.hasOwnProperty.call(options, 'type')) {
      throw new Error('Type must be specified');
    }
    this.schemaOptions = {
      type: undefined,
      required: false,
      unique: false,
      default: null,
      validator: null
    } 
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(this.schemaOptions, key)) {
        this.schemaOptions[key as keyof optionsObject] = options[key as keyof optionsObject];
      }
    }
  }
}

const type = {
  number: SchemaNumber,
  decimal128: SchemaDecimal128,
  string: SchemaString,
  boolean: SchemaBoolean,
  objectid: SchemaObjectId,
  UUID: SchemaUUID,
  date: SchemaDate,
}

name {
  type: dango.type.number
}