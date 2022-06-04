/**
 *
 * @description This file defines the query class and its methods.
 *
 */
import { Connection } from './connections.ts';
import { Bson } from '../deps.ts';
import {
  CountOptions,
  InsertOptions,
  UpdateOptions,
  FindAndModifyOptions,
  DropOptions,
  AggregateOptions,
  FindOptions,
  DeleteOptions,
} from '../deps.ts';
import { dango } from './dango.ts';
import { Schema, optionsObject } from './schema.ts';

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
  public connection: Connection | boolean;
  public schema: Schema;
  public updatedQueryObject: { [key: string]: unknown };

  constructor(collectionName: string, schema: Schema) {
    this.collectionName = collectionName;
    this.connection = dango.currentConnection;
    this.schema = schema;
    this.updatedQueryObject = {};
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.find(allQueryObjects, options);
        const dataRes = await data.toArray();

        if (callback) return callback(data);

        return dataRes;
      }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.findOne(queryObject, options);

        if (callback) return callback(data);

        return data;
      }
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
    queryObject: Record<string, unknown>,
    callback?: (input: unknown) => unknown
  ) {
    try {
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.countDocuments(queryObject);

        if (callback) return callback(data);
        console.log(data);

        return data;
      }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.estimatedDocumentCount();

        return data;
      }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.aggregate(arg1);
        const dataRes = await data.toArray();

        return dataRes;
      }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.findAndModify(filter, options);

        console.log('findByIdAndModify Successful', data);
        return data;
      }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);

        if (typeof options === 'function') {
          callback = options;
          options = {};
        }

        const data = await collection.deleteOne({ _id: stringId }, options);
        console.log('findByIdAndDelete Successful', data);

        if (callback) {
          return callback(data);
        } else {
          return data;
        }
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
    queryObject: Record<string, unknown>,
    callback?: (input: unknown) => unknown
  ) {
    try {
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.findAndModify(queryObject, {
          remove: true,
        });

        console.log('findOneAndRemove Successful', data);

        if (callback) {
          return callback(data);
        } else {
          return data;
        }
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

      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.findAndModify(
          { _id: stringId },
          { remove: true }
        );

        console.log('findByIdAndRemove Successful', data);

        if (callback) return callback(data);

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
    callback?: (input: unknown) => unknown
  ) {
    try {
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        if (typeof options === 'function') callback = options;
        options = {};

        const data = await collection.replaceOne(filter, document, options);

        console.log('Successfully executed replaceOne', data);

        if (callback) return callback(data);

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
  public async insertOne(
    document: Record<string, unknown>,
    writeConcern?: InsertOptions
  ) {
    try {
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        await this.validateInsertAgainstSchema(
          document,
          this.schema,
          this.updatedQueryObject
        );
        const id = await collection.insertOne(
          this.updatedQueryObject,
          writeConcern
        );
        this.resetQueryObject();
        console.log('Successfully insertedOne');
        return id;
      }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);

        if (typeof options === 'function') callback = options;
        options = {};

        const validatedDocuments = [];
        for (const doc of document) {
          await this.validateInsertAgainstSchema(
            doc,
            this.schema,
            this.updatedQueryObject
          );
          validatedDocuments.push(this.updatedQueryObject);
          this.resetQueryObject();
        }
        const ids = await collection.insertMany(validatedDocuments, options);
        if (callback) return callback(ids);

        return ids;
      }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        await this.validateUpdateAgainstSchema(
          update,
          this.schema,
          this.updatedQueryObject
        );
        const newUpdate = { $set: this.updatedQueryObject };
        if (typeof options === 'function') callback = options;
        options = {};
        const data = await collection.updateOne(filter, newUpdate, options);
        this.resetQueryObject();
        if (callback) return callback(data);

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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        if (typeof options === 'function') callback = options;
        options = {};
        await this.validateReplaceAgainstSchema(
          filter,
          replacement,
          this.schema,
          this.updatedQueryObject
        );
        const data = await collection.replaceOne(
          filter,
          this.updatedQueryObject,
          options
        );
        this.resetQueryObject();
        if (callback) return callback(data);

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
  ) {
    try {
      const stringId = new Bson.ObjectId(id);

      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);

        if (typeof options === 'function') callback = options;
        options = {};

        const data = await collection.findOne({ _id: stringId }, options);
        if (callback) {
          return callback(data);
        } else {
          return data;
        }
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
    options?: UpdateOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    try {
      const filter = { _id: new Bson.ObjectId(id) };
      console.log(filter);

      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);

        await this.validateUpdateAgainstSchema(
          update,
          this.schema,
          this.updatedQueryObject
        );
        const newUpdate = { $set: this.updatedQueryObject };

        if (typeof options === 'function') callback = options;
        options = {};

        const data = await collection.updateOne(filter, newUpdate, options);
        this.resetQueryObject();
        if (callback) {
          return callback(data);
        } else {
          return data;
        }
      }
    } catch (error) {
      throw new Error(`Error in findByIdAndUpdate function. ${error}`);
    }
  }

  /**
   * DropCollection drops current model/collection that user is connected to.
   * @returns undefined
   * example: Model.dropCollection()
   */
  public async dropCollection() {
    try {
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        const data = await collection.drop();

        console.log('Collection successfully dropped.');

        return data;
      }
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
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);

        const data = await collection.deleteOne(document, options);
        if (callback) {
          return callback(data);
        } else {
          const formattedReturnObj = { deletedCount: data };

          return formattedReturnObj;
        }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }
        
        const data = await collection.deleteMany(document, options);
        const formattedReturnObj = { deletedCount: data };
        console.log(formattedReturnObj);
        if (callback) return callback(data);

        return formattedReturnObj;
        
      }
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
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }

        await this.validateUpdateAgainstSchema(
          update,
          this.schema,
          this.updatedQueryObject
        );
        const setUpdateObject = { $set: this.updatedQueryObject };

        const data = await collection.updateOne(
          document,
          setUpdateObject,
          options
        );
        this.resetQueryObject();

        if (callback) return callback(data);

        return data;
      }
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
    options?: UpdateOptions | ((input: unknown) => unknown),
    callback?: (input: unknown) => unknown
  ) {
    // if upsert is true, and no matching documents are found, updateObject( regardless of how complete it is) will be inserted.
    try {
      if (
        typeof this.connection === 'boolean' ||
        typeof this.connection.db === 'boolean'
      ) {
        if (this.connection === false) {
          throw new Error('No connection established before query.');
        }
      } else {
        const collection = this.connection.db.collection(this.collectionName);
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }

        await this.validateUpdateAgainstSchema(
          update,
          this.schema,
          this.updatedQueryObject
        );
        const setUpdateObject = { $set: this.updatedQueryObject };
        const data = await collection.updateMany(
          document,
          setUpdateObject,
          options
        );
        this.resetQueryObject();

        if (callback) return callback(data);

        return data;
      }
    } catch (error) {
      throw new Error(`Error in updateMany function. ${error}`);
    }
  }

  /**
   * Method validates schema for insert queries by calling each schema option. Validation steps will throw an error if validation fails.
   *
   * @param queryObject which is the client document to insert into the database
   * @param schema which is the current schema, either at the outer level of a document or is an embedded schema
   * @param updatedQueryObject which is the converted version of the user's queryObject with properly coverted types for each value
   * @param embeddedUniqueProperty When checking a property in an embedded document with the schema option 'unique', set to true, this array will
   * contain property keys from outer levels
   * @returns true or undefined.
   */
  async validateInsertAgainstSchema(
    queryObject: Record<string, unknown>,
    schema: Schema,
    updatedQueryObject: Record<string, unknown>,
    embeddedUniqueProperty: string[] = []
  ) {
    const currentSchemaMap = schema.schemaMap;

    this.checkDataFields(queryObject, currentSchemaMap);
    for (const property in currentSchemaMap) {
      // current SchemaMap's current property value is either an instance of a Schema or a SchemaOption
      // If Schema is stored, validate embedded object.
      if (currentSchemaMap[property] instanceof Schema) {
        updatedQueryObject[property] = {};
        embeddedUniqueProperty.push(property);
        await this.validateInsertAgainstSchema(
          queryObject[property] as Record<string, unknown>,
          currentSchemaMap[property] as Schema,
          updatedQueryObject[property] as Record<string, unknown>,
          embeddedUniqueProperty
        );
        embeddedUniqueProperty.pop();
      } else {
        this.checkRequired(
          queryObject,
          property,
          currentSchemaMap[property] as optionsObject
        );
        this.setDefault(
          queryObject,
          property,
          currentSchemaMap[property] as optionsObject
        );
        this.populateQuery(
          queryObject,
          property,
          currentSchemaMap[property] as optionsObject,
          updatedQueryObject
        );
        await this.checkUnique(
          property,
          currentSchemaMap[property] as optionsObject,
          updatedQueryObject,
          embeddedUniqueProperty
        );
        this.checkConstraints(
          property,
          currentSchemaMap[property] as optionsObject
        );
      }
    }
    return true;
  }

  /**
   * Method validates schema for replace queries by calling each schema option. Validation steps will throw an error if validation fails.
   * checkUnique step is different from validateInsertAgainstSchema for edge case where document property flagged as unique replaces itself.
   *
   * @param findObject The query used to match documents
   * @param queryObject which is the client document to insert into the database
   * @param schema which is the current schema, either at the outer level of a document or is an embedded schema
   * @param updatedQueryObject which is the converted version of the user's queryObject with properly coverted types for each value
   * @param embeddedUniqueProperty When checking a property in an embedded document with the schema option 'unique', set to true, this array will
   * contain property keys from outer levels
   * @returns true or undefined.
   */
  async validateReplaceAgainstSchema(
    findObject: Record<string, unknown>,
    queryObject: Record<string, unknown>,
    schema: Schema,
    updatedQueryObject: Record<string, unknown>,
    embeddedUniqueProperty: string[] = []
  ) {
    const currentSchemaMap = schema.schemaMap;
    this.checkDataFields(queryObject, currentSchemaMap);
    for (const property in currentSchemaMap) {
      // current SchemaMap's current property value is either an instance of a Schema or a SchemaOption
      // If Schema is stored, validate embedded object.
      if (currentSchemaMap[property] instanceof Schema) {
        updatedQueryObject[property] = {};
        embeddedUniqueProperty.push(property);
        await this.validateReplaceAgainstSchema(
          findObject,
          queryObject[property] as Record<string, unknown>,
          currentSchemaMap[property] as Schema,
          updatedQueryObject[property] as Record<string, unknown>,
          embeddedUniqueProperty
        );
        embeddedUniqueProperty.pop();
      } else {
        this.checkRequired(queryObject, property, currentSchemaMap[property]);
        this.setDefault(queryObject, property, currentSchemaMap[property]);
        this.populateQuery(
          queryObject,
          property,
          currentSchemaMap[property],
          updatedQueryObject
        );
        await this.checkUniqueForReplace(
          property,
          currentSchemaMap[property],
          findObject,
          updatedQueryObject,
          embeddedUniqueProperty
        );
        this.checkConstraints(property, currentSchemaMap[property]);
      }
    }
    return true;
  }

  /**
   * Method validates schema for update queries by calling each schema option. Validation steps will throw an error if validation fails.
   * checkRequired and setDefault steps are not needed in validateInsertAgainstSchema method.
   *
   * @param queryObject which is the client document field to update in the database
   * @param schema which is the current schema, either at the outer level of a document or is an embedded schema
   * @param updatedQueryObject which is the converted version of the user's queryObject with properly coverted types for each value
   * @param embeddedUniqueProperty When checking a property in an embedded document with the schema option 'unique', set to true, this array will
   * contain property keys from outer levels
   * @returns true or undefined.
   */
  async validateUpdateAgainstSchema(
    queryObject: Record<string, unknown>,
    schema: Schema,
    updatedQueryObject: Record<string, unknown>,
    embeddedUniqueProperty: string[] = []
  ) {
    const currentSchemaMap = schema.schemaMap;
    this.checkDataFields(queryObject, currentSchemaMap);
    for (const property in queryObject) {
      // current SchemaMap's current property value is either an instance of a Schema or a SchemaOption
      // If Schema is stored, validate embedded object.
      if (currentSchemaMap[property] instanceof Schema) {
        updatedQueryObject[property] = {};
        embeddedUniqueProperty.push(property);
        await this.validateUpdateAgainstSchema(
          queryObject[property] as Record<string, unknown>,
          currentSchemaMap[property],
          updatedQueryObject[property] as Record<string, unknown>,
          embeddedUniqueProperty
        );
        embeddedUniqueProperty.pop();
      } else {
        this.populateQuery(
          queryObject,
          property,
          currentSchemaMap[property],
          updatedQueryObject
        );
        await this.checkUnique(
          property,
          currentSchemaMap[property],
          updatedQueryObject,
          embeddedUniqueProperty
        );
        this.checkConstraints(property, currentSchemaMap[property]);
      }
    }
    return true;
  }

  /**
   * Method loops through all fields in query objects and throws an error if any properties exist which are not present in the schema.
   *
   * @param queryObject which is the client document field to update or insert into the database
   * @param schemaMap which contains the schemaMap for the current level in the user's document
   * @returns true or undefined.
   */
  checkDataFields(
    queryObject: Record<string, unknown>,
    schemaMap: Record<string, unknown>
  ) {
    for (const property in queryObject) {
      if (!Object.prototype.hasOwnProperty.call(schemaMap, property)) {
        throw new Error(
          'Requested query object contains properties not present in the Schema.'
        );
      }
    }
    return true;
  }

  /**
   * Method validates a property with the option of 'required' has a given value and throws an error if any property does not meet schema criteria.
   *
   * @param queryObject which is the client document field to update or insert into the database
   * @param propertyName which is the property key to check
   * @param propertyOptions which is the propertyOptions object for the given property from the schema
   * @returns true or undefined.
   */
  checkRequired(
    queryObject: Record<string, unknown>,
    propertyName: string,
    propertyOptions: optionsObject
  ) {
    if (propertyOptions.required === true) {
      if (!Object.prototype.hasOwnProperty.call(queryObject, propertyName)) {
        throw new Error(`${propertyName} is Required by the Schema.`);
      }
    }
    return true;
  }

  /**
   * Method populates original queryObject with properties not present in the query but present in the schema with their specified default values.
   *
   * @param queryObject which is the client document field to update or insert into the database
   * @param propertyName which is the property key to check
   * @param propertyOptions which is the propertyOptions object for the given property from the schema
   * @returns true or undefined.
   */
  setDefault(
    queryObject: Record<string, unknown>,
    propertyName: string,
    propertyOptions: optionsObject
  ) {
    if (!Object.prototype.hasOwnProperty.call(queryObject, propertyName)) {
      queryObject[propertyName] = propertyOptions.default;
    }
    return true;
  }

  /**
   * Method populates the property updatedQueryObject object to be used in the actual query.
   * Creates an instance of the given schema datatype with the user value from their query.
   * Casts the value to the datatype and returns an error if impossible.
   *
   * @param queryObject which is the client document field to update or insert into the database
   * @param propertyName which is the property key to check
   * @param propertyOptions which is the propertyOptions object for the given property from the schema
   * @param updatedQueryObject which is the formatted version of the user's queryObject with properly coverted types for each value.
   * This may refer to the outer object or embedded objects within.
   * @returns true or undefined.
   */
  populateQuery(
    queryObject: Record<string, unknown>,
    propertyName: string,
    propertyOptions: optionsObject,
    updatedQueryObject: Record<string, unknown>
  ) {
    const valueAsDatatype = new propertyOptions.type(queryObject[propertyName]);
    valueAsDatatype.convertType();
    valueAsDatatype.validateType();
    if (valueAsDatatype.valid === false) {
      throw new Error(
        'Data was not able to be translated to given specified schema data type.'
      );
    }
    updatedQueryObject[propertyName] = valueAsDatatype.convertedValue;
  }

  /**
   * Method queries the database to see if a document already exists with a duplicate value for the given property.
   *
   * @param propertyName which is the property key to check
   * @param propertyOptions which is the propertyOptions object for the given property from the schema
   * @param updatedQueryObject which is the formatted version of the user's queryObject with properly coverted types for each value
   * This may refer to the outer object or embedded objects within.
   * @param embeddedUniqueProperty When checking a property in an embedded document with the schema option unique, set to true, this array will
   * contain property keys from outer levels
   * @returns true or undefined.
   */
  async checkUnique(
    propertyName: string,
    propertyOptions: optionsObject,
    updatedQueryObject: Record<string, unknown>,
    embeddedUniqueProperty: string[]
  ) {
    if (propertyOptions.unique === true) {
      // query object to check if unique value already exists in database collection
      const queryObjectForUnique: Record<string, unknown> = {};
      // constructs correctly formatted string for property key of queryObjectForUnique
      const formattedPropertyName = this.formatQueryField(
        propertyName,
        embeddedUniqueProperty
      );
      queryObjectForUnique[formattedPropertyName] =
        updatedQueryObject[propertyName];
      const propertyExists = await this.findOne(queryObjectForUnique);
      if (propertyExists !== undefined) {
        throw new Error(
          'Property designated as unique in Schema already exists.'
        );
      }
    }
    return true;
  }

  /**
   * Method queries the database to see if a document already exists with a duplicate value for the given property.
   * This method is different from checkUnique due to edge case where document property flagged as unique replaces itself.
   *
   * @param propertyName which is the property key to check
   * @param findObject The query used to match documents
   * @param updatedQueryObject which is the formatted version of the user's queryObject with properly coverted types for each value
   * This may refer to the outer object or embedded objects within.
   * @param embeddedUniqueProperty When checking a property in an embedded document with the schema option unique, set to true, this array will
   * contain property keys from outer levels
   * @returns true or undefined.
   */
  async checkUniqueForReplace(
    propertyName: string,
    propertyOptions: optionsObject,
    findObject: Record<string, unknown>,
    updatedQueryObject: Record<string, unknown>,
    embeddedUniqueProperty: string[]
  ) {
    if (propertyOptions.unique === true) {
      let originalPropertyValue = await this.findOne(findObject);
      if (originalPropertyValue === undefined) {
        throw new Error('No database entry found on query.');
      } else if (originalPropertyValue === null)
        throw new Error('No database entry found on query.');
      else if (typeof originalPropertyValue === 'object') {
        // iterate through embeddedUniqueProperty array to access embedded objects that directly contains current propertyName
        if (embeddedUniqueProperty.length) {
          embeddedUniqueProperty.forEach((prop) => {
            //@ts-ignore Fix later.
            originalPropertyValue = originalPropertyValue[prop];
          });
        }
        // convert originalPropertyValue's type to match matching property's type in the updatedQueryObject
        const valueAsDatatype = new propertyOptions.type(
          //@ts-ignore Fix later.
          originalPropertyValue[propertyName]
        );
        valueAsDatatype.convertType();
        valueAsDatatype.validateType();
        if (valueAsDatatype.valid === false) {
          throw new Error(
            'Data was not able to be translated to given specified schema data type.'
          );
        }
        const formattedOriginalPropertyValue = JSON.stringify(
          valueAsDatatype.convertedValue
        );
        const formattedUpdatedQueryObjectValue = JSON.stringify(
          updatedQueryObject[propertyName]
        );

        // query object to check if unique value already exists in database collection
        const queryObjectForUnique: Record<string, unknown> = {};
        // constructs correctly formatted string for property key of queryObjectForUnique
        const formattedPropertyName = this.formatQueryField(
          propertyName,
          embeddedUniqueProperty
        );
        queryObjectForUnique[formattedPropertyName] =
          updatedQueryObject[propertyName];
        const propertyExists = await this.findOne(queryObjectForUnique);

        // If property value exists in database collection, AND the property value from the found document (ln 1096) doesn't match
        // the property value in the updatedQueryObject, throw an error.
        if (
          propertyExists !== undefined &&
          formattedOriginalPropertyValue !== formattedUpdatedQueryObjectValue
        ) {
          throw new Error(
            `Property designated as unique in Schema already exists. ${formattedPropertyName}: ${formattedUpdatedQueryObjectValue}`
          );
        }
      }
    }
    return true;
  }

  /**
   * Method validates that the casted datatype satisfies the user defined callback function.
   *
   * @param propertyName which is the property key to check
   * @param propertyOptions which is the propertyOptions object for the given property from the schema
   * @returns true or undefined.
   */
  checkConstraints(propertyName: string, propertyOptions: optionsObject) {
    if (propertyOptions.validator === null) return true;
    if (typeof propertyOptions.validator !== 'function') {
      throw new Error(
        'Callback given as validator in Schema is not a function.'
      );
    }
    const isConstraintMet = propertyOptions.validator(
      this.updatedQueryObject[propertyName]
    );
    if (isConstraintMet !== true) {
      throw new Error('Callback given as validator in Schema is violated.');
    }
    return true;
  }

  /**
   * Method resets the updatedQueryObject to an empty object after an insert, replace, or update query.
   *
   * @returns undefined.
   */
  resetQueryObject() {
    this.updatedQueryObject = {};
    return;
  }

  /**
   * Method
   *
   * @param propertyName which is the property key to check, will be the last property in the returned string
   * @param embeddedUniqueProperty When checking a property in an embedded document with the schema option 'unique', set to true, this array will
   * contain property keys from outer levels.
   * @returns a string that is either equal to propertyName or a concatenated string containing properties from parent levels with dot notation
   * in order to format a proper string key to execute a database query for a value inside an embedded document.
   */
  formatQueryField(propertyName: string, embeddedUniqueProperty: string[]) {
    let string = '';
    if (embeddedUniqueProperty.length === 0) {
      return propertyName;
    } else {
      while (embeddedUniqueProperty.length > 0) {
        if (string === '') string += embeddedUniqueProperty.shift();
        else string += `.${embeddedUniqueProperty.shift()}`;
      }
      string += `.${propertyName}`;
    }
    return string;
  }
}

export { Query };
