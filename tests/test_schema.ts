import {
  assertInstanceOf,
  assertStrictEquals,
  assertThrows,
  beforeEach,
  describe,
  it,
} from '../deps.ts';

import {
  Schema,
  SchemaOptions
} from '../lib/schema.ts';

import { 
  SchemaNumber, 
  SchemaDecimal128, 
  SchemaString, 
  SchemaBoolean, 
  SchemaObjectId, 
  SchemaUUID, 
  SchemaDate 
} from '../lib/datatypes.ts'

import { spy, assertSpyCall, assertSpyCalls } from "https://deno.land/std@0.139.0/testing/mock.ts";


describe('SchemaOptions Class', () => {
  let newObject: unknown;
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaOptions();
      });
    });
  });
  describe('creating an instance of the class with no type property', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaOptions({
          required: true,
          unique: true
        });
      });
    });
  });
  describe('creating an instance of the class with an invalid type property', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaOptions({
          type: 'dangoDB'
        });
      });
    });
  });
  describe('creating an instance of the class with a valid options object', () => {
    describe('the only property is type', () => {
      describe('the type is number', () => {
        beforeEach(() => {
          newObject = new SchemaOptions({
            type: 'number'
          });
        });
        it('will create an instance of the class', () => {
          assertInstanceOf(newObject, SchemaOptions);
        });
        it('will have assign the type property the class definition of the data type', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.type, SchemaNumber)
          }
        });
        it('will have a default required property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.required, false)
          }
        });
        it('will have a default unique property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.unique, false)
          }
        });
        it('will have a default default property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.default, null)
          }
        });
        it('will have a default validator property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.validator, null)
          }
        });
      });
      describe('the type is decimal128', () => {
        beforeEach(() => {
          newObject = new SchemaOptions({
            type: 'decimal128'
          });
        });
        it('will create an instance of the class', () => {
          assertInstanceOf(newObject, SchemaOptions);
        });
        it('will have assign the type property the class definition of the data type', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.type, SchemaDecimal128)
          }
        });
        it('will have a default required property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.required, false)
          }
        });
        it('will have a default unique property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.unique, false)
          }
        });
        it('will have a default default property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.default, null)
          }
        });
        it('will have a default validator property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.validator, null)
          }
        });
      });
      describe('the type is string', () => {
        beforeEach(() => {
          newObject = new SchemaOptions({
            type: 'string'
          });
        });
        it('will create an instance of the class', () => {
          assertInstanceOf(newObject, SchemaOptions);
        });
        it('will have assign the type property the class definition of the data type', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.type, SchemaString)
          }
        });
        it('will have a default required property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.required, false)
          }
        });
        it('will have a default unique property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.unique, false)
          }
        });
        it('will have a default default property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.default, null)
          }
        });
        it('will have a default validator property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.validator, null)
          }
        });
      });
      describe('the type is boolean', () => {
        beforeEach(() => {
          newObject = new SchemaOptions({
            type: 'boolean'
          });
        });
        it('will create an instance of the class', () => {
          assertInstanceOf(newObject, SchemaOptions);
        });
        it('will have assign the type property the class definition of the data type', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.type, SchemaBoolean)
          }
        });
        it('will have a default required property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.required, false)
          }
        });
        it('will have a default unique property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.unique, false)
          }
        });
        it('will have a default default property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.default, null)
          }
        });
        it('will have a default validator property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.validator, null)
          }
        });
      });
      describe('the type is objectid', () => {
        beforeEach(() => {
          newObject = new SchemaOptions({
            type: 'objectid'
          });
        });
        it('will create an instance of the class', () => {
          assertInstanceOf(newObject, SchemaOptions);
        });
        it('will have assign the type property the class definition of the data type', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.type, SchemaObjectId)
          }
        });
        it('will have a default required property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.required, false)
          }
        });
        it('will have a default unique property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.unique, false)
          }
        });
        it('will have a default default property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.default, null)
          }
        });
        it('will have a default validator property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.validator, null)
          }
        });
      });
      describe('the type is objectid', () => {
        beforeEach(() => {
          newObject = new SchemaOptions({
            type: 'UUID'
          });
        });
        it('will create an instance of the class', () => {
          assertInstanceOf(newObject, SchemaOptions);
        });
        it('will have assign the type property the class definition of the data type', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.type, SchemaUUID)
          }
        });
        it('will have a default required property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.required, false)
          }
        });
        it('will have a default unique property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.unique, false)
          }
        });
        it('will have a default default property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.default, null)
          }
        });
        it('will have a default validator property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.validator, null)
          }
        });
      });
      describe('the type is date', () => {
        beforeEach(() => {
          newObject = new SchemaOptions({
            type: 'date'
          });
        });
        it('will create an instance of the class', () => {
          assertInstanceOf(newObject, SchemaOptions);
        });
        it('will have assign the type property the class definition of the data type', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.type, SchemaDate)
          }
        });
        it('will have a default required property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.required, false)
          }
        });
        it('will have a default unique property with the value of false', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.unique, false)
          }
        });
        it('will have a default default property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.default, null)
          }
        });
        it('will have a default validator property with the value of null', () => {
          if (newObject instanceof SchemaOptions){
            assertStrictEquals(newObject.validator, null)
          }
        });
      });
    });
    describe('the only properties are type and required', () => {
      beforeEach(() => {
        newObject = new SchemaOptions({
          type: 'number',
          required: true
        });
      });
      it('will create an instance of the class', () => {
        assertInstanceOf(newObject, SchemaOptions);
      });
      it('will have assign the type property the class definition of the data type', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.type, SchemaNumber)
        }
      });
      it('will have a required property with the value of true', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.required, true)
        }
      });
      it('will have a default unique property with the value of false', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.unique, false)
        }
      });
      it('will have a default default property with the value of null', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.default, null)
        }
      });
      it('will have a default validator property with the value of null', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.validator, null)
        }
      });  
    });
    describe('the only properties are type and unique', () => {
      beforeEach(() => {
        newObject = new SchemaOptions({
          type: 'number',
          unique: true
        });
      });
      it('will create an instance of the class', () => {
        assertInstanceOf(newObject, SchemaOptions);
      });
      it('will have assign the type property the class definition of the data type', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.type, SchemaNumber)
        }
      });
      it('will have a default required property with the value of false', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.required, false)
        }
      });
      it('will have a unique property with the value of true', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.unique, true)
        }
      });
      it('will have a default default property with the value of null', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.default, null)
        }
      });
      it('will have a default validator property with the value of null', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.validator, null)
        }
      });
    });  
    describe('the only properties are type and default', () => {
      beforeEach(() => {
        newObject = new SchemaOptions({
          type: 'number',
          default: 54
        });
      });
      it('will create an instance of the class', () => {
        assertInstanceOf(newObject, SchemaOptions);
      });
      it('will have assign the type property the class definition of the data type', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.type, SchemaNumber)
        }
      });
      it('will have a default required property with the value of false', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.required, false)
        }
      });
      it('will have a default unique property with the value of false', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.unique, false)
        }
      });
      it('will have a default property with the value of 54', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.default, 54)
        }
      });
      it('will have a default validator property with the value of null', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.validator, null)
        }
      });  
    });
    describe('the only properties are type and validator', () => {
      let testFunc!: Function
      beforeEach(() => {
        testFunc = (num: number): boolean => num > 5;
        newObject = new SchemaOptions({
          type: 'number',
          validator: testFunc 
        });
      });
      it('will create an instance of the class', () => {
        assertInstanceOf(newObject, SchemaOptions);
      });
      it('will have assign the type property the class definition of the data type', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.type, SchemaNumber)
        }
      });
      it('will have a default required property with the value of false', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.required, false)
        }
      });
      it('will have a default unique property with the value of false', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.unique, false)
        }
      });
      it('will have a default default property with the value of null', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.default, null)
        }
      });
      it('will have a validator property with the value of testFunc', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.validator, testFunc)
        }
      });  
    });
    describe('all options properties are provided to SchemaOptions', () => {
      let testFunc!: Function
      beforeEach(() => {
        testFunc = (num: number): boolean => num > 5;
        newObject = new SchemaOptions({
          type: 'number',
          required: true,
          unique: true,
          default: 315,
          validator: testFunc 
        });
      });
      it('will create an instance of the class', () => {
        assertInstanceOf(newObject, SchemaOptions);
      });
      it('will have assign the type property the class definition of the data type', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.type, SchemaNumber)
        }
      });
      it('will have a required property with the value of true', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.required, true)
        }
      });
      it('will have a unique property with the value of true', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.unique, true)
        }
      });
      it('will have a default property with the value of 315', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.default, 315)
        }
      });
      it('will have a validator property with the value of testFunc', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.validator, testFunc)
        }
      });  
    });
    describe('an unknown options property was provided to SchemaOptions', () => {
      let testFunc!: Function
      beforeEach(() => {
        testFunc = (num: number): boolean => num > 5;
        newObject = new SchemaOptions({
          type: 'number',
          required: true,
          unique: true,
          default: 315,
          validator: testFunc,
          //@ts-ignore Ignore TS warning to run test
          unknownProp: false
        });
      });
      it('will create an instance of the class', () => {
        assertInstanceOf(newObject, SchemaOptions);
      });
      it('will have assign the type property the class definition of the data type', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.type, SchemaNumber)
        }
      });
      it('will have a required property with the value of true', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.required, true)
        }
      });
      it('will have a unique property with the value of true', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.unique, true)
        }
      });
      it('will have a default property with the value of 315', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.default, 315)
        }
      });
      it('will have a validator property with the value of testFunc', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(newObject.validator, testFunc)
        }
      });  
      it('will not have unknownProp as a property', () => {
        if (newObject instanceof SchemaOptions){
          assertStrictEquals(Object.prototype.hasOwnProperty.call(newObject, 'unknownProp'), false);
        }
      });
    });
  });
});

describe('Schema Class', () => {
  let newObject: unknown;
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new Schema();
      });
    });
  });
  describe('creating an instance of the class with a schema object', () => {
    describe('and the schema object only has one property with only type defined with an invalid type', () => {
      it('will throw an error', () => {
        assertThrows(() => {
          newObject = new Schema({
            name: 'dangoDB'
          });
        });
      });
    });
    describe('and the schema object only has one property with only type defined with a valid type', () => {
      beforeEach(() => {
        newObject = new Schema({
          name: 'string'
        });
      });
      it('will create an instance of the class', () => {
        assertInstanceOf(newObject, Schema);
      });
      it('will have a property schemaMap', () => {
        if (newObject instanceof Schema){
          assertStrictEquals(Object.prototype.hasOwnProperty.call(newObject, 'schemaMap'), true);
        }
      });
      it('will have a property schemaMap with the property name', () => {
        if (newObject instanceof Schema){
          assertStrictEquals(Object.prototype.hasOwnProperty.call(newObject.schemaMap, 'name'), true);
        }
      });
      it('will have a property schemaMap with the property name which is an instance of SchemaOptions', () => {
        if (newObject instanceof Schema){
          assertInstanceOf(newObject.schemaMap.name, SchemaOptions)
        }
      });
    });
    describe('and the schema object only has one property with a value of an options object', () => {
      let testFunc!: (param: string) => boolean
      beforeEach(() => {
        newObject = new Schema({
          name: {
            type: 'string',
            required: true,
            unique: true,
            default: 'dangoDB',
            validator: testFunc = (str: string): boolean => str[0] === 'b'
          }
        });
      });
      it('will create an instance of the class', () => {
        assertInstanceOf(newObject, Schema);
      });
      it('will have a property schemaMap', () => {
        if (newObject instanceof Schema){
          assertStrictEquals(Object.prototype.hasOwnProperty.call(newObject, 'schemaMap'), true);
        }
      });
      it('will have a property schemaMap with the property name', () => {
        if (newObject instanceof Schema){
          assertStrictEquals(Object.prototype.hasOwnProperty.call(newObject.schemaMap, 'name'), true);
        }
      });
      it('will have a property schemaMap with the property name which is an instance of SchemaOptions', () => {
        if (newObject instanceof Schema){
          assertInstanceOf(newObject.schemaMap.name, SchemaOptions)
        }
      });
    });
  });
});