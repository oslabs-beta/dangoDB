/**
 *
 * @description This file defines the query class and its methods.
 *
 */
// import { dango } from './dango.ts';
import { Connection } from './connections.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.29.4/mod.ts';
import {
  CountOptions,
  InsertOptions,
  UpdateOptions,
  FindAndModifyOptions,
  DropOptions,
  AggregateOptions,
  FindOptions,
  DeleteOptions,
} from 'https://deno.land/x/mongo@v0.29.4/src/types.ts';

interface MatchInterface {
  $match: { [unknownKeyName: string]: string };
}

interface GroupInterface {
  $group: {
    [unknownKeyName: string]: string | { $sum: number };
  };
}

class Query {
  public collectionName: string;
  public connection: Connection;
  // We need to add schema to the collection
  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.connection = new Connection(
      'mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1'
    );
  }
  /**
   * Returns one document that satisfies the specified query criteria on the collection or view.
   *
   * @param query - Selects documents in a collection or view and returns a cursor to the selected documents.
   * @param options Additional options for the operation (e.g. lean, populate, projection)
   * @param callback
   * @returns A count of the documents in the database.
   * example: query.find();
   */
  public async find(
    allQueryObjects?: Record<string, unknown>,
    options?: FindOptions,
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.find(allQueryObjects, options);
      const dataRes = await data.toArray();

      // console.log("LOOK HERE", dango.currentConnection);

      if (callback) return callback(data);
      await this.connection.disconnect();

      // console.log(`find successful`);

      return dataRes;
    } catch (error) {
      throw new Error(`Error in find function. ${error}`);
    }
  }
  /**
   * Returns one document that satisfies the specified query criteria on the collection or view.
   *
   * @param query - The query used to match documents
   * @param options Additional options for the operation (e.g. lean, populate, projection)
   * @param callback
   * @returns The document matched and modified
   * example: query.findOne({ username: 'newtest2' });
   */

  public async findOne(
    queryObject: Record<string, unknown>,
    options?: FindOptions,
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.findOne(queryObject, options);

      if (callback) return callback(data);

      await this.connection.disconnect();

      console.log(`findOne successful`, data);
      return data;
    } catch (error) {
      throw new Error(`Error in findOne function. ${error}`);
    }
  }
  /**
  Counts number of documents matching filter in a database collection.
    * @param Filter. 
    * @param Additional options for the operation.
    * @param Optional callback such as (err, count); 
    * @returns a count (number);
    * example: query.countDocuments({ username: 'test' });
    */
  public async countDocuments(
    queryObject: Record<string, string>,
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.countDocuments(queryObject);

      if (callback) return callback(data);
      console.log(data);
      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in countDocuments function. ${error}`);
    }
  }
  /**
  Returns the count of all documents in a collection or view. The method wraps the count command.   
    * @param Additional options for the operation.
    * @param Optional callback such as (err, count); 
    * @returns a count (number);
    * example: query.estimatedDocumentCount(); 
    */
  public async estimatedDocumentCount() {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.estimatedDocumentCount();

      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in estimatedDocumentCount function. ${error}`);
    }
  }
  /**
  Aggregation operations process multiple documents and return computed results. You can use aggregation operations to:
  Group values from multiple documents together.
  Perform operations on the grouped data to return a single result.
  Analyze data changes over time.      
  * @param Aggregation pipeline as an array of objects.
  * @returns Documents returned are plain javascript documents;
  * example: query.aggregate([
      { $match: { username: 'test' } },
      { $group: { _id: '$username', total: { $sum: 1 } } },
    ]);
  */
  public async aggregate(arg1: [MatchInterface, GroupInterface]) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.aggregate(arg1);
      const dataRes = await data.toArray();

      await this.connection.disconnect();
      return dataRes;
    } catch (error) {
      throw new Error(`Error in aggregate function. ${error}`);
    }
  }
  /**
   * Find and modify a document in one, returning the matching document.
   *
   * @param The query used to match documents.
   * @param Additional options for the operation (e.g. sort, limit, skip)
   * @returns The document matched and modified
   * example:query.findAndModify({ username: 'emilia' }, 
        {
          sort: { _id: 1 },
          update: { $inc: { newField: +2 } },
          new: true,
        });
    */
  public async findAndModify(
    filter: Record<string, unknown>,
    options?: FindAndModifyOptions
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.findAndModify(filter, options);

      await this.connection.disconnect();
      console.log('findByIdAndModify Successful', data);
      return data;
    } catch (error) {
      throw new Error(`Error in findandModify function. ${error}`);
    }
  }
  /**
   * Issue a MongoDB findOneAndDelete() command by a document's _id field.
   *
   * @param The id used to match documents.
   * @param Callback function.
   * @returns The document matched and deleted.
   * example: query.findByIdAndDelete("62642ee21bcc7078ae1dba3d")
   */
  public async findByIdAndDelete(
    id: string,
    options?: FindOptions | DeleteOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const stringId = new Bson.ObjectId(id);
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      const data = await collection.deleteOne({ _id: stringId }, options);
      console.log('findByIdAndDelete Successful', data);

      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        await this.connection.disconnect();
        return data;
      }
    } catch (error) {
      throw new Error(`Error in findByIdAndDelete function. ${error}`);
    }
  }
  /**
   * Issue a mongodb findAndModify remove command. Finds a matching document, removes it, passing the found document (if any) to the callback. Executes the query if callback is passed.
   *
   * @param Conditions.
   * @param Additional options for the operation.
   * @param Callback function.
   * @returns The document matched and removed.
   * example: query.findOneAndRemove({username: "Bob"}, (input) => {console.log('callback executed', input)});
   */
  public async findOneAndRemove(
    queryObject: Record<string, string>,
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.findAndModify(queryObject, {
        remove: true,
      });

      console.log('findOneAndRemove Successful', data);

      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        await this.connection.disconnect();
        return data;
      }
    } catch (error) {
      throw new Error(`Error in findOneAndRemove function. ${error}`);
    }
  }
  /**
   * Issue a mongodb findAndModify remove command by a document's _id field.
   *
   * @param The id used to match documents.
   * @param Additional options for the operation.
   * @param Callback function.
   * @returns The document matched and removed.
   * example: query.findByIdAndRemove("626d8508c522d90bacb1c843", (input) => {console.log('callback executed', input)});
   */
  public async findByIdAndRemove(
    id?: string,
    callback?: (input: unknown) => unknown
  ) {
    try {
      const stringId = new Bson.ObjectId(id);
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.findAndModify(
        { _id: stringId },
        { remove: true }
      );

      console.log('findByIdAndRemove Successful', data);

      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        await this.connection.disconnect();
        return data;
      }
    } catch (error) {
      throw new Error(`Error in findByIdAndRemove function. ${error}`);
    }
  }
  /**
   * ReplaceOne replaces the filters existing document with the input doc - same as update() in the mongoDB Driver. Returns a query.
   *
   * @param Filter.
   * @param Document which is the client input for what will replace the filter.
   * @param Additional options for the operation.
   * @param Callback function.
   * @returns The updated document.
   * example: await query.replaceOne("626d8508c522d90bacb1c843", (input) => {console.log('callback executed', input)});
   */
  public async replaceOne(
    filter: Record<string, unknown>,
    document: Record<string, unknown>,
    options?: UpdateOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown) 
    {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      
      if (typeof options === 'function') callback = options;
      options = {};

      const data = await collection.replaceOne(filter, document, options);
      
      console.log('Successfully executed replaceOne', data);

      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        await this.connection.disconnect();
        return data;
      }
    } catch (error) {
      throw new Error(`Error in replaceOne function. ${error}`);
    }
  }
  /**
   * Insert One takes one parameter, a document, which inserts a document into the database
   *
   * @param Document which is the client input for what will replace the filter.
   * @param WriteConcern. Optional. A document that expresses the write concern of the insert command. Omit to use the default write concern.
   * Do not explicitly set the write concern for the operation if run in a transaction. To use write concern with transactions, see Transactions and Write Concern.
   * @returns The inserted document.
   * example: await query.insertOne({username: 'Celeste'});
   */
  public async insertOne(document: Record<string, string>, writeConcern?: InsertOptions) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const id = await collection.insertOne(document, writeConcern);

      console.log('Successfully insertedOne')
      await this.connection.disconnect();
      return id;

    } catch (error) {
      throw new Error(`Error in insertOne function. ${error}`);
    }
  }




  /**
   * Insert Many inserts an array or object into the database.
   *
   * @param Document which is the client input for what will replace the filter.
   * @param options Optional for different inderting options
   * @param callback function
   * @returns a promise resolving to the raw result from the MongoDB driver if `options.rawResult` was `true`, or the documents that passed validation, otherwise
   * example: await query.insertMany([ { username: 'anotherOne'}, { username: 'Tulips' }], (input) => {console.log('callback executed', input)});
   */
  public async insertMany(
    document: Record<string, unknown>[],
    options?: InsertOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      // check if options is a function and reassign callback to options if so - so that we can bypass the options param
      if (typeof options === 'function') callback = options;
      options = {};

      const ids = await collection.insertMany(document, options);
      if (callback) {
        await this.connection.disconnect();
        return callback(ids);
      } else {
        await this.connection.disconnect();
        return ids;
      };
     
    } catch (error) {
      throw new Error(`Error in insertMany function. ${error}`);
    }
  }


  /**
   * Find One And Update finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callbacks.
   *
   * @param Filter which is the client input for the document to find
   * @param Update which is the clients input for what portion will be updated within the document
   * @param Additonal options UpdateOptions
   * @param callback function
   * @returns the found document
   * example: await query.findByIdAndUpdate('626aa9c8b1d75dd60462cf15', { username: "omgThisWorksAgain"}, (input) => {console.log('callback executed', input)})
   */
  public async findOneAndUpdate(
    filter: Record<string, unknown>,
    update: Record<string, unknown>,
    options?: UpdateOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);

      const newUpdate = { $set: update };
      if (typeof options === 'function') callback = options;
      options = {};
      const data = await collection.updateOne(filter, newUpdate, options);

      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        await this.connection.disconnect();
        return data;
      }

    } catch (error) {
      throw new Error(`Error in findOneAndUpdate function. ${error}`);
    }
  }

  /**
   * Find One And Replace finds a matching document, removes the contents of the document, and passes the input document (if any) into the document as a replacement.
   * @param Filter which is the client input for which document will be found
   * @param Replacement is the client input for which document will be replacing the filter
   * @param Additional options
   * @param Callback function
   * @returns 
   * example: await query.findOneAndReplace({ username: "OneandUpdating" }, { username: "Iron_Man"}, (input) => {console.log('callback executed', input)})
   */
  public async findOneAndReplace(
    filter: Record<string, unknown>,
    replacement: Record<string, unknown>,
    options?: FindAndModifyOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);

      if (typeof options === 'function') callback = options;
      options = {};
      const data = await collection.replaceOne(filter, replacement, options);

      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        await this.connection.disconnect();
        return data;
      }

    } catch (error) {
      throw new Error(`Error in findOneAndReplace function. ${error}`);
    }
  }

  /**
   * Find By Id finds a single document by its _id field
   * @param id which is the client input for which document will be found
   * @param Additional options such as projection, sort etc
   * @param callback function
   * @returns the document
   * example: await query.findById('626aaa96500d65b1228e6940');
   */
  public async findById(
    id: string,
    options?: FindOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
    )
   {
    try {
      const stringId = new Bson.ObjectId(id);

      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);

      if (typeof options === 'function') callback = options;
      options = {};
      
      const data = await collection.findOne({ _id: stringId }, options);
      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        await this.connection.disconnect();
        return data;
      }
    } catch (error) {
      throw new Error(`Error in findById function. ${error}`);
    }
  }

  /**
   * Find By Id and Update finds a matching document by _id, updates it according to the update arg, passing any options, and returns the found document (if any) to the callbacks.
   * @param id which is the client input for which document will be found
   * @param update which is the clients input for what portion will be updated within the document
   * @param additional options updateoptions
   * @param callback function
   * @returns the document
   * example: await query.findByIdAndUpdate(626aa9c8b1d75dd60462cf15', { username: "omgThisWorksAgain"}, (input) => {console.log('callback executed', input)});
   */
  public async findByIdAndUpdate(
    id: string,
    update: Record<string, unknown>,
    options?: UpdateOptions  | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const filter = { _id: new Bson.ObjectId(id) };
      console.log(filter);

      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);

      // update the value of update with the $set operator
      const newUpdate = { $set: update };
      // check if options is a function and reassign callback to options if so - so that we can bypass the options param
      if (typeof options === 'function') callback = options;
      options = {};
      const data = await collection.updateOne(filter, newUpdate, options);

      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        await this.connection.disconnect();
        return data;
      }

    } catch (error) {
      throw new Error(`Error in findByIdAndUpdate function. ${error}`);
    }
  }

  // UPDATED STEVE

  /**
   * DropCollection drops current model/collection that user is connected to.
   * @returns undefined
   * example: Model.dropCollection()
   */
  public async dropCollection() {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.drop();

      console.log('Collection successfully dropped.');

      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in dropCollection function. ${error}`);
    }
  }

  /**
   * Delete One deletes the first document that matches conditions from the collection.
   * @param document which is the client input for which document will be found
   * @param additional options deleteOptions
   * @param callback function
   * @returns an object with the property deletedCount indicating how many documents were deleted. 
   * example: await query.deleteOne({ username: "test"}, (input) => {console.log('callback executed', input)})
   */
  public async deleteOne(
    document: Record<string, unknown>,
    options?: DeleteOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      // check if options is a function and reassign callback to options if so - so that we can bypass the options param
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      // returns number of deleted documents
      const data = await collection.deleteOne(document, options);
      if (callback) {
        await this.connection.disconnect();
        return callback(data);
      } else {
        const formattedReturnObj = { deletedCount: data };
        await this.connection.disconnect();
        return formattedReturnObj;
      }
      
    } catch (error) {
      throw new Error(`Error in deleteOne function. ${error}`);
    }
  }

    /**
   * Delete Many deletes all of the documents that match conditions from the collection
   * @param document which is the client input for which document will be found
   * @param additional options deleteOptions
   * @param callback function
   * @returns an object with the property deletedCount containing the number of documents deleted
   * example: await query.deleteMany({ username: 'newtest1' }, { limit: 1 } ,(data) => { console.log(data); });
   */
  public async deleteMany(
    document: Record<string, unknown>,
    options?: DeleteOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName); 
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      // returns number of deleted documents
      const data = await collection.deleteMany(document, options);
      const formattedReturnObj = { deletedCount: data };
      console.log(formattedReturnObj);
      if (callback) return callback(data);
      await this.connection.disconnect();
      return formattedReturnObj;
    } catch (error) {
      throw new Error(`Error in deleteMany function. ${error}`);
    }
  }
   /**
   * Update One finds a matching document, updates it according to the update arg, passing any options. Will update only the first document that matches filter regardless of the value of the multi option.
   *
   * @param document which is the client input for the document to find
   * @param Update which is the clients input for what portion will be updated within the document
   * @param Additonal options UpdateOptions
   * @param callback function params are (error, writeOpResult)
   * @returns the found document
   * example: await query.updateOne({ username: 'rob ott'}, { username: 'ROBO OTT' });
   */
  public async updateOne(
    document: Record<string, unknown>,
    update: Record<string, unknown>,
    options?: UpdateOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      //  $set operator, sets field in updateObject to corresponding value, check mongoDB atlas docs for updateOne for ref
      const setUpdateObject = { $set: update };
      const data = await collection.updateOne(
        document,
        setUpdateObject,
        options
      );
      console.log(data);
      if (callback) return callback(data);
      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in updateOne function. ${error}`);
    }
  }

  /**
   * Update Many updates many documents matching search criteria in the database.
   *
   * @param document which is the client input for the document to find
   * @param update which is the clients input for what portion will be updated within the document
   * @param options options UpdateOptions
   * @param callback function
   * @returns the found document
   * example: await query.updateMany({ name: 'Mireille' }, { favoriteFood: 'pizza' }, (input) => {console.log('callback executed', input)})
   */
  public async updateMany(
    document: Record<string, unknown>,
    update: Record<string, unknown>,
    options?: UpdateOptions  | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) { 
    // if upsert is true, and no matching documents are found, updateObject( regardless of how complete it is) will be inserted.
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      //  $set operator, sets field in updateObject to corresponding value, check mongoDB atlas docs for updateOne for ref
      const setUpdateObject = { $set: update };
      const data = await collection.updateMany(
        document,
        setUpdateObject,
        options
      );
      console.log(data);
      if (callback) return callback(data);
      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in updateMany function. ${error}`);
    }
  }
}

// const query = new Query('new');

// query.findOne({ username: 'BobsBackBaby' });
// query.find()
// query.updateOne({ username: 'Bob' });
// query.replaceOne({username: 'newtest'}, { username: 'BobsBackBaby'} );
// query.countDocuments({ username: 'test' });
// query.estimatedDocumentCount();
// query.aggregate([
//   // ----- Format Bson Id ------
//   // private async formatBsonId(filter?: Record<string, unknown>) {
//   //   // if a filter param exists
//   //   if (filter) {
//   //     // if the filter param has an _id
//   //     if (filter?._id) {
//   //       // assign id to the filter._id
//   //       const id = filter._id;
//   //       // if id is a string
//   //       if (typeof id === 'string') {
//   //         // reassign filter._id to a new Bson formated id
//   //         filter._id = await new Bson.ObjectId(id);
//   //       } else if (Array.isArray(id.$in)) {
//   //         id.$in = await id.$in.map((_id: Record<string, unknown>) => {
//   //           if (typeof _id === "string") {
//   //            const data = await new Bson.ObjectId(_id);
//   //            console.log(data)
//   //           }
//   //         })
//   //       }
//   //     }
//   //   }
//   // }

const query = new Query('new');
// console.log(await query.find());
//console.log(await query.findOne({ username: "jack" }));
// console.log(await query.countDocuments({ username: 'Iron_Man' }));
// console.log(await query.estimatedDocumentCount());
// console.log(await query.aggregate([
//   { $match: { username: 'test' } },
//   { $group: { _id: '$username', total: { $sum: 1 } } },
// ]));
// query.findAndModify({ username: 'emilia' },
// {
//   sort: { _id: 1 },
//   update: { $inc: { newField: +10 } },
//   new: true,
// });
// query.findByIdAndDelete("6270468e9b3ad7d380187fda", (input) => {console.log('callback executed', input)});
// console.log(await query.findOneAndRemove( { username: 'Iron_Man'}, (input) => { console.log('callback executed', input) } )) ;
// console.log(await query.findByIdAndRemove("626d84b29e4f6c740be268e5", (input) => { console.log('callback executed', input) } ));
// console.log(
  // await query.replaceOne({ username: 'ImTired' }, { username: 'SOTIRED' }, (input) => { console.log('callback executed', input) } ));
// console.log(await query.insertOne({username: 'hullaballoo belay'}))
// console.log(query.insertMany([ { username: 'anotherOne'}, { username: 'Tulips' }], (input) => {console.log('callback executed', input)}));
// console.log(await query.findOneAndUpdate({ username: "SOTIRED" }, { username:"NOREALLYSOTIRED"}, (input) => {console.log('callback executed', input)}));
// console.log(query.findOneAndReplace({ username: "Moon_Knight" }, { username: "DANG_Oh"}, (input) => {console.log('callback executed', input)}));
// console.log(await query.findById('626aaa96500d65b1228e6940'));
// console.log(await query.findByIdAndUpdate('626aa9c8b1d75dd60462cf14', { username: "AnotherTest"}, (input) => {console.log('callback executed', input)}));
//console.log(await query.deleteOne({ username: "newtest1"}, (input) => {console.log('callback executed', input)}))
// console.log(await query.deleteMany({ username: 'newtest1' }, { limit: 1 } ,(data) => { console.log(data); }));

// console.log(await query.updateOne({ username: 'test' }, {username: 'SpongeBob'}, (input) => {console.log('callback executed', input)}));
//console.log(await query.updateMany({ username: 'jack' }, { age: "31"}, (input) => {console.log('callback executed', input)}))
// console.log(await query.insertOne({ username: 'theNewest', password: 'newtest1'}));






export { Query };
