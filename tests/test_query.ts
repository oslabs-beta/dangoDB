import {
  assertInstanceOf,
  assertStrictEquals,
  assertThrows,
  beforeEach,
  describe,
  it,
} from '../deps.ts';

// import {
//   Query
// } from '../lib/query.ts';

import { model } from '../lib/model.ts';

import { Bson } from '../deps.ts';

import { Schema, SchemaOptions } from '../lib/schema.ts';

import { dango } from '../lib/dango.ts';

describe('test Query methods', () => {
  const UserSchema = {
    name: {
      type: 'string',
      required: true,
    },
    occupation: {
      type: 'string',
      required: false,
      default: null,
    },
    age: {
      type: 'number',
      required: false,
      default: null,
    },
  };

  const collectionName = 'testCollection';
  const testSchema = dango.schema(UserSchema);
  // console.log('testSchema: ', testSchema);
  let queryObject: Record<string, unknown>;

  const query = dango.model(collectionName, testSchema);

  describe('checkDataFields', () => {
    // let queryObject: Record<string, unknown>;
    let schemaMap: Record<string, unknown>;

    schemaMap = testSchema.schemaMap;
    queryObject = { name: 'Mr. A', age: 25 };
    // console.log('queryObject: ', queryObject);
    it('it will throw an error if extra properties are present in the queryObject', () => {
      queryObject = { name: 'Mr. A', school: 'Furinkan HS' };
      assertThrows(() => query.checkDataFields(queryObject, schemaMap));
    });

    it('it will return true if only fields specified in the schema are present in the queryObject', () => {
      queryObject = { name: 'Mr. A' };
      assertStrictEquals(query.checkDataFields(queryObject, schemaMap), true);
    });
  });

  describe('checkRequired', () => {
    let propertyName: string;
    let propertyOptions: SchemaOptions;

    beforeEach(() => {
      propertyName = 'name';
      propertyOptions = testSchema.schemaMap[propertyName];
    });

    it('will throw an error when a required property is missing from queryObject', () => {
      queryObject = { age: 25 };
      assertThrows(() => {
        query.checkRequired(queryObject, propertyName, propertyOptions);
      });
    });
    it('will return true when required properties are in queryObject', () => {
      queryObject = { name: 'Mr. C' };
      assertStrictEquals(
        query.checkRequired(queryObject, propertyName, propertyOptions),
        true
      );
    });
  });

  describe('setDefault', () => {
    let propertyName: string;
    let propertyOptions: SchemaOptions;
    beforeEach(() => {
      propertyName = 'occupation';
      propertyOptions = testSchema.schemaMap[propertyName];
      // queryObject = { name: 'Mr. D' };
    });

    it('will set property value in queryObject to default if value not assigned', () => {
      queryObject = { name: 'Mr. D' };
      query.setDefault(queryObject, propertyName, propertyOptions);
      assertStrictEquals(queryObject[propertyName], null);
    });

    it('will not assign a default value to a property in queryObject if it already has an assigned value', () => {
      queryObject = { name: 'Mr. D', occupation: 'baker' };
      query.setDefault(queryObject, propertyName, propertyOptions);
      assertStrictEquals(queryObject[propertyName], 'baker');
    });
  });

  describe('populateQuery', () => {
    let propertyName: string;
    let propertyOptions: SchemaOptions;
    let updatedQueryObject: Record<string, unknown> = {};

    it('will assign converted value (STRING) to updatedQueryObject', () => {
      queryObject = { name: 'Mick Jagger' };
      propertyName = 'name';
      propertyOptions = testSchema.schemaMap[propertyName];
      query.populateQuery(
        queryObject,
        propertyName,
        propertyOptions,
        updatedQueryObject
      );
      assertStrictEquals(
        updatedQueryObject[propertyName],
        queryObject[propertyName]
      );
    });

    it('will convert a number to a Bson.Double and assign it to updatedQueryObject', () => {
      queryObject = { age: 25 };
      propertyName = 'age';
      propertyOptions = testSchema.schemaMap[propertyName];
      query.populateQuery(
        queryObject,
        propertyName,
        propertyOptions,
        updatedQueryObject
      );
      assertInstanceOf(updatedQueryObject[propertyName], Bson.Double);
    });

    it('will throw an error if assigned value in queryObject cannot be converted to specified type in schema', () => {
      queryObject = { age: true };
      propertyName = 'age';
      propertyOptions = testSchema.schemaMap[propertyName];
      assertThrows(() => {
        query.populateQuery(
          queryObject,
          propertyName,
          propertyOptions,
          updatedQueryObject
        );
      });
    });
  });

  // need to figure out how to mock or craete a fake evalauted result from invoking findOne query
  // describe('checkUnique', () => {
  //   let propertyName: string;
  //   let propertyOptions: SchemaOptions;
  //   let updatedQueryObject: Record<string, unknown> = {};
  //   let embeddedUniqueProperty: string[];
  // })

  // checkUniqueForReplace

  describe('checkConstraints', () => {
    let propertyName: string;
    let propertyOptions: SchemaOptions;

    it('will return true if validator property is set to null', () => {
      propertyName = 'name';
      propertyOptions = testSchema.schemaMap[propertyName];
      assertStrictEquals(
        query.checkConstraints(propertyName, propertyOptions),
        true
      );
    });
  });

  describe('resetQueryObject', () => {
    query.updatedQueryObject = { test: 'a test' };
    query.resetQueryObject();
    const updatedQueryObjectKeys = Object.keys(query.updatedQueryObject);
    it('will reset updatedQuery object', () => {
      assertStrictEquals(updatedQueryObjectKeys.length, 0);
    });
  });

  describe('formatQueryString result', () => {
    let propertyName: string;
    let propArray: string[];

    beforeEach(() => {
      propertyName = 'test';
      propArray = ['address', 'property_id'];
    });

    it('will return propertyName when embeddedUnique is empty', () => {
      assertStrictEquals(
        query.formatQueryField(propertyName, []),
        propertyName
      );
    });
    it('will return concatenated string using elements from embeddedUniqeProperty and propertyName', () => {
      assertStrictEquals(
        query.formatQueryField(propertyName, propArray),
        `address.property_id.${propertyName}`
      );
    });
  });
});
