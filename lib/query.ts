/**
 * 
 * @description This file defines the query class and its methods.
 * 
 */
// import { dango } from './dango.ts';
import { Connection } from './connections.ts';
import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";
import { CountOptions, InsertOptions, UpdateOptions, FindAndModifyOptions, DropOptions, AggregateOptions, FindOptions, DeleteOptions } from 'https://deno.land/x/mongo@v0.29.4/src/types.ts'; 


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
  public async find(allQueryObjects?: Record <string, unknown>, options?: FindOptions, callback?: (input: unknown) => unknown) {
    try {

      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.find(allQueryObjects, options);
      const dataRes = await data.toArray();

      // console.log("LOOK HERE", dango.currentConnection);

      if(callback) return callback(data); 
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
  
    public async findOne(queryObject: Record<string, unknown>, options?: FindOptions, callback?: (input: unknown) => unknown) {
      try {

        const db = await this.connection.connect();
        const collection = db.collection(this.collectionName);
        const data = await collection.findOne(queryObject, options);
      
        if(callback) return callback(data); 
        
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
  public async countDocuments(queryObject: Record<string, string>, callback?: (input: unknown) => unknown) {
    try {

      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.countDocuments(queryObject);

      if(callback) return callback(data); 
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
  public async findAndModify(filter: Record<string, unknown>, options?: FindAndModifyOptions) {
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
   * @param Additional options for the operation (e.g. sort, limit, skip).
   * @param Callback function.
   * @returns The document matched and deleted. 
   * example: query.findByIdAndDelete("62642ee21bcc7078ae1dba3d")
  */
  public async findByIdAndDelete(id: string, options?: FindOptions | DeleteOptions | ((input: unknown) => unknown), callback?: (input: unknown) => unknown) {
    try {
    
      const stringId = new Bson.ObjectId(id)
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
    
      // if (typeof options !== 'function') {
      //   data = await collection.deleteOne({_id: stringId}, options);
      // }
      if (typeof options === 'function') { 
        callback = options;
        options = {};
      }
      
      const data = await collection.deleteOne({_id: stringId, options})

      let callbackData; 
      if(callback) callbackData = callback(data); 
      await this.connection.disconnect();
      return callbackData
      console.log('findByIdAndDelete Successful', data); 

      return data; 

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
  public async findOneAndRemove(queryObject: Record<string, string>, options?: FindOptions, callback?: (input: unknown) => unknown) {
    try {

      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.findAndModify(queryObject, {remove: true});
    
      if(callback) return callback(data);
      await this.connection.disconnect();
      return data; 

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
  public async findByIdAndRemove(id?: string, options?: FindOptions, callback?: (input: unknown) => unknown) {
    try {
    
      const stringId = new Bson.ObjectId(id)
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.findAndModify({_id: stringId}, { remove: true })

      if(callback) return callback(data); 
      await this.connection.disconnect();
      return data;

    } catch (error) {
      throw new Error(`Error in findByIdAndRemove function. ${error}`);
    }
}
/* Celeste's queries */
  // ------- Replace One ---------
  public async replaceOne (
    filter: Record<string, unknown>,
    document: Record<string, unknown>,
    options?: Record<string, unknown>
  ) {
    try {
      //connect to the db
      const db = await this.connection.connect();
      // find the id given in the filter - the find method is available for use
      const collection = db.collection(this.collectionName);
      const data = await collection.replaceOne(filter, document, options);
      // console.log(data); //returned as ex.{ upsertedId: undefined, upsertedCount: 0, matchedCount: 1, modifiedCount: 1 }
  
      // do we want to include upsert: true option to check if no documents match the filter of which we can add one?
      /* should return a document containing a boolen acknowledged: true if succesful, a matchedCount showing how many matches there were and if we want to do the upsert method, the _id for that.
       */
      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in replaceOne function. ${error}`);
    }
  }
  // -------- Insert One --------
   public async insertOne(document: Record<string, string>) {
    try {
      
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const id = await collection.insertOne(document);

      await this.connection.disconnect();
      return id;
    } catch (error) {
      throw new Error(`Error in insertOne function. ${error}`);
    }
  }

  // -------- Insert Many --------
  public async insertMany(document: Record<string, unknown>[], options?: Record<string, unknown> | ((input: unknown) => unknown), callback?:(input: unknown) => unknown) {
    try {

      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      // check if options is a function and reassign callback to options if so - so that we can bypass the options param
      if (typeof options === 'function') callback = options
      options = {};

      const ids = await collection.insertMany(document, options);
      if (callback) return await callback(ids);

      await this.connection.disconnect();
      return ids;
    } catch (error) {
      throw new Error(`Error in insertMany function. ${error}`);
    }
  }

   // ------ Find One and Update -------
  /* Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callbacks  */
  public async findOneAndUpdate(filter: Record<string, unknown>, update: Record<string, unknown>, options?: Record<string,  unknown> | ((input: unknown) => unknown), callback?:(input: unknown) => unknown) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);

      const newUpdate = { $set: update };
      if (typeof options === 'function') callback = options
      options = {};
      const data = await collection.updateOne(filter, newUpdate, options);
    
      if (callback) return callback(data);
    
      await this.connection.disconnect();

      return data
      
    } catch (error) {
      throw new Error(`Error in findOneAndUpdate function. ${error}`);
    }
  }


  // ------ Find One and Replace -------
  public async findOneAndReplace(filter: Record<string, unknown>, replacement: Record<string, unknown>,  options?: Record<string, unknown> | ((input: unknown) => unknown), callback?:(input: unknown) => unknown) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);

      if (typeof options === 'function') callback = options
      options = {};
      const data = await collection.replaceOne(filter, replacement, options);
    
      if (callback) return callback(data);
    
      await this.connection.disconnect();

      return data
      
    } catch (error) {
      throw new Error(`Error in findOneAndReplace function. ${error}`);
    }
  }

  // ------- Find By Id -------
  /* Finds a single document by its _id field */
  public async findById(id: string, options?: Record<string, number | unknown>) {
    try {
    
      const stringId = new Bson.ObjectId(id)
     
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.findOne({_id: stringId}, options);
      await this.connection.disconnect();
      return data;

    } catch (error) {
      throw new Error(`Error in findById function. ${error}`);
    }
  }


  // ------ Find By Id and Update -------
  /* Finds a matching document by _id, updates it according to the update arg, passing any options, and returns the found document (if any) to the callbacks  */
  public async findByIdAndUpdate(id: string, update: Record<string, unknown>, options?: Record<string, unknown> | ((input: unknown) => unknown), callback?:(input: unknown) => unknown) {
    try {
    
      const filter = { _id: new Bson.ObjectId(id)}
      console.log(filter)

      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);

      // update the value of update with the $set operator
      const newUpdate = { $set: update };
      // check if options is a function and reassign callback to options if so - so that we can bypass the options param
      if (typeof options === 'function') callback = options
      options = {};
      const data = await collection.updateOne(filter, newUpdate, options);

      if (callback) await callback(data);
     
      await this.connection.disconnect();
      return data
    } catch (error) {
      throw new Error(`Error in findByIdAndUpdate function. ${error}`);
    }
  }



  // UPDATED STEVE
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

  public async deleteOne(queryObject: Record<string, unknown>, 
    options?: Record<string,unknown> | ((input: unknown) => unknown),
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
      if(callback) return callback(data);
      await this.connection.disconnect();
      return data;
    } catch (error) {
      throw new Error(`Error in updateMany function. ${error}`);
    }
  }

}

<<<<<<< HEAD
// const query = new Query('new');

// query.findOne({ username: 'BobsBackBaby' });
// query.find()
// query.updateOne({ username: 'Bob' });
// query.replaceOne({username: 'newtest'}, { username: 'BobsBackBaby'} );
// query.countDocuments({ username: 'test' });
// query.estimatedDocumentCount();
// query.aggregate([
=======
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
// console.log(await query.findOne({ username: "ThisWorked" }));
// console.log(await query.countDocuments({ username: 'Iron_Man' }));
// console.log(await query.estimatedDocumentCount());
// console.log(await query.aggregate([
>>>>>>> dev
//   { $match: { username: 'test' } },
//   { $group: { _id: '$username', total: { $sum: 1 } } },
// ]));
// query.findAndModify({ username: 'emilia' }, 
// {
//   sort: { _id: 1 },
//   update: { $inc: { newField: +10 } },
//   new: true,
// });
// query.findByIdAndDelete("626aa6d224bbbb3b9e768ec7", (input) => {console.log('callback executed', input)});










// console.log(await query.findOne({ username: 'BobsBackBaby' }));
// query.updateOne({ username: 'Bob' });
// console.log(await query.replaceOne({username: 'ImTired'}, { password: 'SOTIRED'} ));

query.findById('626aaa96500d65b1228e6940');
// console.log(await query.insertOne({ username: 'theNewest', password: 'theBestPass'}));

// query.findByIdAndUpdate('626aa9c8b1d75dd60462cf15', { username: "omgThisWorksAgain"}, (input) => {console.log('callback executed', input)});
// query.findByIdAndDelete('626aaa96500d65b1228e6940', (input) => {console.log('callback executed', input)});

// query.findOneAndUpdate({ username: "insertingOne" }, { username:"OneandUpdating"}, (input) => {console.log('callback executed', input)});
//query.findOneAndReplace({ username: "OneandUpdating" }, { username: "Iron_Man"}, (input) => {console.log('callback executed', input)});
// query.insertMany([ { username: 'insertingOne'}, { username: 'insertingMany' }], (input) => {console.log('callback executed', input)});

export { Query };
