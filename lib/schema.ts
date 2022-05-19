// deno-lint-ignore-file no-explicit-any

/**
 *
 * @description This file defines the schema class.
 *
 */

import { dango } from './dango.ts';

/**
 * Class definition of a Schema.
 * @param schemaObj Object passed in by users containing key value pairs of properties allowed in the document with a value of an object containing property options including:
 * type - Required. A lowercase string of expected datatype
 * required - If set to true, the property must include a value in insertion/replace queries
 * unique - If set to true, the database can only have one instance with the specified insertion/update value. Ignores null.
 * default - The default value of the property if not specified.
 * validator - A user-defined function that will take the converted value and return a boolean for validation
 * Sets the schemaMap property to objects populated with all options.
 *
 * @returns An object of class Schema.
 */
export class Schema {
  schemaMap: Record<string, any>;

  constructor(schemaObj: Record<string, any>) {
    if (schemaObj === undefined) {
      throw new Error('Schema requires a valid argument.');
    }
    this.schemaMap = {};
    for (const property in schemaObj) {
      // SJ: check if Schema assigned as value
      if (schemaObj[property] instanceof Schema) {
        // SJ: assign Schema
        this.schemaMap[property] = schemaObj[property];
      } else if (typeof schemaObj[property] === 'object') {
        this.schemaMap[property] = new SchemaOptions(schemaObj[property]);
      } else if (
        typeof schemaObj[property] !== 'object' &&
        Object.prototype.hasOwnProperty.call(dango.types, schemaObj[property])
      ) {
        this.schemaMap[property] = new SchemaOptions({
          type: schemaObj[property],
        });
      } else {
        throw new Error(
          'Argument for schema definition incorrectly formatted.'
        );
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

/**
 * Class definition of a SchemaOptions.
 * @param options Options object passed in by the user. Default values are set for each property and overriden by user input.
 *
 * @returns An object of class SchemaOptions.
 */

export class SchemaOptions {
  type: any;
  required?: boolean;
  unique?: boolean;
  default?: any;
  validator?: Function | null;

  constructor(options: optionsObject) {
    if (!Object.prototype.hasOwnProperty.call(options, 'type')) {
      throw new Error('Type must be specified');
    }
    this.type = undefined;
    this.required = false;
    this.unique = false;
    this.default = null;
    this.validator = null;
    for (const key in options) {
      if (key === 'type') {
        if (Object.prototype.hasOwnProperty.call(dango.types, options[key])) {
          this.type = dango.types[options[key]];
        } else {
          throw new Error('Specified type is invalid');
        }
      } else if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key as keyof optionsObject] = options[key as keyof optionsObject];
      }
    }
  }
}
