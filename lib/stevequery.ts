/*Create a query class*/

import { Collection } from '../deps.ts';
import { Connection } from './connections.ts';
import { FindOptions } from 'https://deno.land/x/mongo@v0.29.4/mod.ts';
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
    // when testing, create a new collection with garbage documents and pass that in Query object
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.drop();
      console.log(data);
    } catch (error) {
      //  need to update error handling
      throw new Error(`Error in dropCollection function. ${error}`);
    }
  }

  public async deleteOne(queryObject: Record<string, unknown>) {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.deleteOne(queryObject); // returns number of deleted documents
      console.log(data);
      const formattedReturnObj = { deletedCount: data };
      console.log(formattedReturnObj);

      await this.connection.disconnect();
    } catch (error) {
      //  need to update error handling
      throw new Error(`Error in deleteOne function. ${error}`);
    }
  }
  public async deleteMany(queryObject: Record<string, unknown>) {
    // tested on non-existent documents, and multiple documents
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.deleteMany(queryObject); // returns number of deleted documents
      console.log(data);
      const formattedReturnObj = { deletedCount: data };
      console.log(formattedReturnObj);
    } catch (error) {
      //  need to update error handling
      throw new Error(`Error in deleteMany function. ${error}`);
    }
  }
  // need to modify 2nd param to be Record or Array, check mongoose docs
  // updates specified field(s), uses $set operator: changes values of properties at updateObject
  // updateObject might be an object with several properties (COMPLETE), or even nested - update to account for that variability

  public async updateOne(
    queryObject: Record<string, unknown>,
    updateObject: Record<string, unknown>,
    options?: Record<string, unknown>
    ) {
    // options param: only tested upsert set to true.
    // if upsert is true, and no matching documents are found, updateObject( regardless of how complete it is) will be inserted.
    // tested queryObject with 1 or more properties; tested updateObject with multiple properties.
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      //  $set operator, check mongoDB atlas docs for updateOne for ref
      const setUpdateObject = { $set: updateObject };
      const data = await collection.updateOne(
        queryObject,
        setUpdateObject,
        options
      );
      console.log(data);
      await this.connection.disconnect();
    } catch (error) {
      //  need to update error handling
      throw new Error(`Error in updateOne function. ${error}`);
    }
  }
  public async updateMany(
    queryObject: Record<string, unknown>,
    updateObject: Record<string, unknown>,
    options?: Record<string, unknown>
    ) {
    // options param: only tested upsert set to true.
    // if upsert is true, and no matching documents are found, updateObject( regardless of how complete it is) will be inserted.
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      //  $set operator, check mongoDB atlas docs for updateOne for ref
      const setUpdateObject = { $set: updateObject };
      const data = await collection.updateMany(
        queryObject,
        setUpdateObject,
        options
      );
      console.log(data);
      await this.connection.disconnect();
    } catch (error) {
      //  need to update error handling
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
const query = new Query('users');

// Tests for updated version of find Method using options parameter
// query.find({ username: 'library' });
//  Find test, options limit
// query.find({ username: 'library' }, { limit: 3 });
//  Find test, options skip

//  Find test, options sort
// query.find({}, { sort: { username: 1 } });
// find test, options multiple sort fields
query.find({}, { sort: { username: 1, password: 1 }, limit: 5 });

//  Find test, options sort and limit

export { Query };
