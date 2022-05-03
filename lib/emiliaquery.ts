/**
 * 
 * @description This file defines the query class and its methods.
 * 
 */

import { Connection } from './connections.ts';
import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";
import { FindOptions } from 'https://deno.land/x/mongo@v0.29.4/src/types.ts'; 

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

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.connection = new Connection(
      'mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1'
    );
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
    public async findOne(queryObject: Record<string, string>, options?: FindOptions, callback?: (input: unknown) => unknown) {
      try {

        const db = await this.connection.connect();
        const collection = db.collection(this.collectionName);
        const data = await collection.findOne(queryObject, options);
       
        if(callback) return callback(data); 
        await this.connection.disconnect();
        return data;

      } catch (error) {
        throw new Error(`Error in findOne function. ${error}`);
      }
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

        if(callback) return callback(data); 
        await this.connection.disconnect();
        return dataRes;

      } catch (error) {
        throw new Error(`Error in find function. ${error}`);
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
  public async findAndModify(filter?: Record<string, unknown>, options?: Record<string, number | unknown>) {
    try {

      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.findAndModify(filter, options);

      await this.connection.disconnect();
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

  public async findByIdAndDelete(id: string, options?: FindOptions, callback?: (input: unknown) => unknown) {
    try {
    
      const stringId = new Bson.ObjectId(id)
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const data = await collection.deleteOne({_id: stringId}, options);
    
      if(callback) return callback(data); 
      await this.connection.disconnect();
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
}

const query = new Query('new');

// query.findOne({ username: 'newtest2' });
// query.find()
// query.countDocuments({ username: 'test' });
// query.estimatedDocumentCount();
// query.aggregate([
//   { $match: { username: 'test' } },
//   { $group: { _id: '$username', total: { $sum: 1 } } },
// ]);
// query.findAndModify({ username: 'emilia' }, 
// {
//   sort: { _id: 1 },
//   update: { $inc: { newField: +2 } },
//   new: true,
// });
// query.findByIdAndDelete("62642ee21bcc7078ae1dba3d")
// query.findOneAndRemove({username: "Bob"}, (input) => {console.log('callback executed', input)})
// query.findByIdAndRemove("626d8508c522d90bacb1c843", (input) => {console.log('callback executed', input)});

export { Query };