/*Create a query class*/

import { Collection } from '../deps.ts';
import { Connection } from './connections.ts';
import { FindOptions, DeleteOptions } from 'https://deno.land/x/mongo@v0.29.4/mod.ts';
// import { Bson }

class Query {
  public collectionName: string;
  // Refactor how connection is brought in
  public connection: Connection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.connection = new Connection(
      'mongodb+srv://kaiz0923:qckgc2WHjd9Fq1ad@starwars.5sykv.mongodb.net/mongo-test?authMechanism=SCRAM-SHA-1'
      // Steve's MongoDB
    );
  }

  // Steve's changes
  // dropCollection, deleteOne, deleteMany, updateOne, updateMany

  public async dropCollection() {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.drop();
      console.log(data);
      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in dropCollection function. ${error}`);
    }
  }

  public async deleteOne(queryObject: Record<string, unknown>, 
    options?: DeleteOptions | ((input: unknown) => unknown),
    callback?: ((input: unknown) => unknown)
    ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      // check if options is a function and reassign callback to options if so - so that we can bypass the options param
      if (typeof options === 'function') {
        callback = options
        options = {};
      }
      // returns number of deleted documents
      const data = await collection.deleteOne(queryObject, options); 
      if (callback) return callback(data);
      const formattedReturnObj = { deletedCount: data };
      console.log(formattedReturnObj);
      await this.connection.disconnect();
      return formattedReturnObj;
    } catch (error) {
      throw new Error(`Error in deleteOne function. ${error}`);
    }
  }
  public async deleteMany(queryObject: Record<string, unknown>, 
    options?: DeleteOptions | ((input: unknown) => unknown), 
    callback?: ((input: unknown) => unknown)
    ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      // returns number of deleted documents
      const data = await collection.deleteMany(queryObject, options);
      const formattedReturnObj = { deletedCount: data };
      console.log(formattedReturnObj);
      if (callback) return callback(data);
      await this.connection.disconnect();
      return formattedReturnObj;
    } catch (error) {
      throw new Error(`Error in deleteMany function. ${error}`);
    }
  }
  public async updateOne(
    queryObject: Record<string, unknown>,
    updateObject: Record<string, unknown>,
    options?: Record<string, unknown> | ((input: unknown) => unknown),
    callback?: ((input: unknown) => unknown)
    ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      if(typeof options === 'function') {
        callback = options;
        options = {};
      }
      //  $set operator, sets field in updateObject to corresponding value, check mongoDB atlas docs for updateOne for ref
      const setUpdateObject = { $set: updateObject };
      const data = await collection.updateOne(queryObject, setUpdateObject, options);
      console.log(data);
      if(callback) return callback(data);
      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in updateOne function. ${error}`);
    }
  }
  public async updateMany(
    queryObject: Record<string, unknown>,
    updateObject: Record<string, unknown>,
    options?: Record<string, unknown> | ((input: unknown) => unknown),
    callback?: ((input: unknown) => unknown)
    ) {
    // if upsert is true, and no matching documents are found, updateObject( regardless of how complete it is) will be inserted.
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      if(typeof options === 'function') {
        callback = options;
        options = {};
      }
      //  $set operator, sets field in updateObject to corresponding value, check mongoDB atlas docs for updateOne for ref
      const setUpdateObject = { $set: updateObject };
      const data = await collection.updateMany(queryObject, setUpdateObject, options);
      console.log(data);
      if(callback) callback(data);
      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in updateMany function. ${error}`);
    }
  }

  // Modification to find method
  // Changes: Added options parameter, user can toggle other options such as sort, limit
  // https://doc.deno.land/https://deno.land/x/mongo@v0.29.4/mod.ts/~/FindOptions
  // query.find({}, { sort: { username: 1, password: 1 }, limit: 5 });
  // Need to import FindOptions interface from mongoDB driver

  // INSERT IMPORT INTO MAIN QUERY FILE
  // import { FindOptions } from 'https://deno.land/x/mongo@v0.29.4/mod.ts';

   /*Selects documents in a collection or view and returns a cursor to the selected documents. */
  public async find (allQueryObjects?: object, options?: FindOptions ) {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.find(allQueryObjects, options);
      const dataRes = await data.toArray();

      console.log(dataRes);

      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in find function. ${error}`);
    }
  }

}

// using Steve's MongoDB 
// const query = new Query('users');

// Tests for updated version of find Method using options parameter
// query.find({ username: 'library' });
//  Find test, options limit
// query.find({ username: 'library' }, { });
//  Find test, options skip

//  Find test, options sort
// query.find({}, { sort: { username: 1 } });
// find test, options multiple sort fields
// query.find({}, { sort: { username: 1, password: 1 }, limit: 5 });

// query.updateOne({ username: 'rob ott'}, { username: 'ROBO OTT' });
// query.updateOne({ ticker: 'UPST'}, { price: 77.00 });



//  Find test, options sort and limit

// deleteMany with options
// query.deleteMany({ car: 'red' }, { limit: 1 } ,(data) => { console.log(data); });
// query.find({ price: { $gt: 100, $lt: 200 } });

// test dropCollection
// const testQuery = new Query('fake-table');
// testQuery.dropCollection();

export { Query };
