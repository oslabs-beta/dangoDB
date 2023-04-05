// Required Flags for Test:
//  - --allow-read
//  - --allow-net
//  - --allow-env

import {
  assertInstanceOf,
  assertStrictEquals,
  assertThrows,
  beforeEach,
  describe,
  it,
// @ts-ignore
} from '../deps.ts';

import { mockAddress } from './mock_address.js';

import { Query } from '../lib/query.ts';

import { model } from '../lib/model.ts';

import { Bson, Database, Collection } from '../deps.ts';

import { Schema, SchemaOptions } from '../lib/schema.ts';

import { dango } from '../lib/dango.ts';
import { afterAll, beforeAll } from '../deps.ts';
import { assertEquals } from '../deps.ts';
import { load } from "https://deno.land/std/dotenv/mod.ts";

interface Person {
  firstName: string,
  lastName: string,
  gender: string,
  address: Address,
  phoneNumber: string,
}

interface Address {
  type: string,
  houseNumber: string,
  street: string,
  city: string,
  state: string,
  zipcode: string,
}

const env = await load();
const connection_string = env["URI_STRING"];

describe('Core query methods', async () => {
  if(!connection_string) {
    console.log('No Connection String, ending test_unit_core_query_method tests');
    return;
  }

  let directoryQuery: any;
  let firstNameCount = 0;

  let queryObject: Record<string, unknown>;

  beforeAll( async () => {

    await dango.connect(connection_string);

    const addressSchemaTemplate = {
      type: 'string',
      houseNumber: 'string',
      street: 'string',
      city: 'string',
      state: 'string',
      zipcode: 'string',
    }

    const AddressSchema = dango.schema(addressSchemaTemplate);

    const personSchemaTemplate = {
      firstName: 'string',
      lastName: 'string',
      gender: 'string',
      address: AddressSchema,
      phoneNumber: 'string',
    };
    
    const PersonSchema = dango.schema(personSchemaTemplate);
    const collectionName = 'personDirectory';
    directoryQuery = dango.model(collectionName, PersonSchema);

    await directoryQuery.insertMany(mockAddress);

    const firstNameRegex = 'Alex';

    mockAddress.forEach((person: Person) => {
      if(person.firstName.match(firstNameRegex) !== null) firstNameCount +=1;
    });

  });

  afterAll( async () => {
    await directoryQuery.dropCollection();
    await dango.disconnect();
  });

  it('find method retrieves multiple instances of field data', async () => {
    queryObject = { firstName: 'Alex'};
    const result = await directoryQuery.find(queryObject);
    assertEquals(firstNameCount, result.length);
  });

  it('findOne method finds correct data that exists', async () => {
    queryObject = { phoneNumber: '2031115654'};
    const result = await directoryQuery.findOne(queryObject);

    let phoneNumber = '';
    for(const field in result) {
      if(field === 'phoneNumber') {
        phoneNumber = result[field];
      }
    }
    assertEquals(queryObject.phoneNumber, phoneNumber);
  });

  it('findOne method return undefined when data not found', async () => {

    queryObject = { firstName: "Johnson"};
    const result = await directoryQuery.findOne(queryObject);
    assertEquals(result, undefined);
  });

  it('deleteOne method successfully deletes document', async () => {
    queryObject = { firstName: 'Chad', lastName: 'Jenkins'};

    const result = await directoryQuery.deleteOne(queryObject);
    assertEquals(1, result.deletedCount);
    const newSearch = await directoryQuery.findOne(queryObject);
    assertEquals(newSearch, undefined);

  });

  it('deleteMany method deletes multiple documents', async () => {

    queryObject = { 'address.state': 'NJ' };
    const existingDoc = await directoryQuery.find({ 'address.state': 'NJ'});
    const result = await directoryQuery.deleteMany(queryObject);
    assertEquals(existingDoc.length, result.deletedCount);
    const findDeletedDoc = await directoryQuery.find({queryObject});
    assertEquals(0, findDeletedDoc.length);

  });

  // findById

  // findByIdAndDelete
  it('findByIdAndDelete', async () => {

    const directoryArray = await directoryQuery.find();
    const randomNumber = Math.floor(Math.random() * directoryArray.length);
    const randomPerson = directoryArray[randomNumber];
    const result = await directoryQuery.findByIdAndDelete(randomPerson._id);
    assertEquals(result, 1);
    const check = await directoryQuery.findById(randomPerson._id);
    assertEquals(check, undefined);
    
    // doesn't work with strings
  });


  it('findByIdAndRemove', async () => {

    const directoryArray = await directoryQuery.find();
    const randomNumber = Math.floor(Math.random() * directoryArray.length);
    const randomPerson = directoryArray[randomNumber];
    const result = await directoryQuery.findByIdAndDelete(randomPerson._id);
    assertEquals(result, 1);
    const check = await directoryQuery.findById(randomPerson._id);
    assertEquals(check, undefined);
    
    // doesn't work with strings
  });

  it('findOneAndUpdate', async () => {
    // generate random person
    const directoryArray = await directoryQuery.find();
    const randomNumber = Math.floor(Math.random() * directoryArray.length);
    const randomPerson = directoryArray[randomNumber];
    // change value
    const newPhoneNumber = '6461234567';

    queryObject = { lastName: randomPerson.lastName };
    const updateQueryObject = { phoneNumber: newPhoneNumber }

    const result = await directoryQuery.findOneAndUpdate(queryObject, updateQueryObject);
    const check = await directoryQuery.findById(randomPerson._id);

  });


  it('replaceOne replace entire document', async () => {

    // generate random person
    const directoryArray = await directoryQuery.find();
    const randomNumber = Math.floor(Math.random() * directoryArray.length);
    const randomPerson = directoryArray[randomNumber];
    // change value
    randomPerson.address = { 
      type: 'house',
      streetNumber: '100',
      street: '100th St',
      city: 'Greenwich',
      state: 'CT',
      zipcode: '06830',
     }

     queryObject = { lastName: randomPerson.lastName };

    const result = await directoryQuery.replaceOne(queryObject, randomPerson);
    const check = await directoryQuery.findById(randomPerson._id);
    assertEquals(randomPerson, check);

  });

  it('updateOne using $set operator', async () => {

    queryObject = { firstName: 'Alex', lastName: 'Abe' };
    let findDoc = await directoryQuery.findOne(queryObject);
    findDoc.phoneNumber = '2121234567';
    const updateQueryObject = { phoneNumber: findDoc.phoneNumber };
    await directoryQuery.updateOne(queryObject, { $set: updateQueryObject});
    const checkDoc = await directoryQuery.findOne(queryObject);
    assertEquals(checkDoc.phoneNumber, findDoc.phoneNumber);

  });

  // it('updateOne with embedded value',

  it('updateMany updates multiple documents', async () => {
    const firstNameQueryObject = { firstName: 'Alex' };
    const updateQueryObject = { lastName: 'Jenson'};

    await directoryQuery.updateMany(firstNameQueryObject, updateQueryObject);
    const check = await directoryQuery.find(firstNameQueryObject);

    check.forEach((person: Person) => {
      if(person.firstName === 'Alex') {
        assertEquals(person.lastName, updateQueryObject.lastName);
      }
    });

  });

});
