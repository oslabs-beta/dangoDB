// deno-lint-ignore-file no-explicit-any

/**
 * 
 * @description This file defines the schema class.
 * 
 */

// import { 
//   SchemaNumber, 
//   SchemaDecimal128, 
//   SchemaString, SchemaBoolean, 
//   SchemaObjectId, 
//   SchemaUUID, 
//   SchemaDate 
// } from './datatypes.ts'
import { dango } from './dango.ts'

export class Schema {
  
  schemaMap: Record<string, any>;
  // types: Record<string, any>
  
  constructor(schemaObj: Record<string, any>) {
    // this.types = {
    //   number: SchemaNumber,
    //   decimal128: SchemaDecimal128,
    //   string: SchemaString,
    //   boolean: SchemaBoolean,
    //   objectid: SchemaObjectId,
    //   UUID: SchemaUUID,
    //   date: SchemaDate,
    // }
    
    this.schemaMap = {};    
    console.log(schemaObj);
    for (const property in schemaObj) {
      // console.log(schemaObj[property]
      console.log(property, schemaObj[property])
      console.log(dango.types)
      if (typeof schemaObj[property] === 'object') {
        this.schemaMap[property] = new SchemaOptions(schemaObj[property])
<<<<<<< HEAD
      } else if (typeof schemaObj[property] !== 'object' && Object.prototype.hasOwnProperty.call(dango.types, schemaObj[property])) {
=======
      } else if (typeof schemaObj[property] !== 'object' && Object.prototype.hasOwnProperty.call(this.types, schemaObj[property])) {
>>>>>>> dev
        this.schemaMap[property] = new SchemaOptions({ type: schemaObj[property]})
      } else {
        throw new Error('Argument for schema definition incorrectly formatted.')
      }
    }
  }
}


export interface optionsObject {
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
      if (key === 'type') {
        this.schemaOptions.type = dango.types[options[key]];
      }
      else if (Object.prototype.hasOwnProperty.call(this.schemaOptions, key)) {
        this.schemaOptions[key as keyof optionsObject] = options[key as keyof optionsObject];
      }
    }
  }
}