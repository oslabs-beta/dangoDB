/*Create a query class*/

import { Collection } from '../deps.ts';
import { Connection } from './connections.ts';

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
  // Refactor how connection is brought in
  public connection: Connection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.connection = new Connection(
      'mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1'
    );
  }
  /*Returns one document that satisfies the specified query criteria on the collection or view.  */
  public async findOne(queryObject: Record<string, string>) {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.findOne(queryObject);
      console.log(data);

      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in findOne function. ${error}`);
    }
  }
  /*Selects documents in a collection or view and returns a cursor to the selected documents. */
  public async find(allQueryObjects?: object) {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.find(allQueryObjects);
      const dataRes = await data.toArray();

      console.log(dataRes);

      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in find function. ${error}`);
    }
  }
  /* Returns the count of documents that match the query for a collection or view. */
  public async countDocuments(queryObject: Record<string, string>) {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.countDocuments(queryObject);

      console.log(data);

      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in countDocuments function. ${error}`);
    }
  }
  /*estimatedDocumentCount() = Returns the count of all documents in a collection or view. The method wraps the count command. */
  public async estimatedDocumentCount() {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.estimatedDocumentCount();

      console.log(data);

      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in estimatedDocumentCount function. ${error}`);
    }
  }
  /*Aggregation operations process multiple documents and return computed results. You can use aggregation operations to:
      Group values from multiple documents together.
      Perform operations on the grouped data to return a single result.
      Analyze data changes over time. */

  //  public async aggregate(arg1: [{$match:{[unknownKeyName:string]: string}}]) {
  public async aggregate(arg1: [MatchInterface, GroupInterface]) {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.aggregate(arg1);
      const dataRes = await data.toArray();

      console.log(dataRes);

      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in aggregate function. ${error}`);
    }
  }
}

const query = new Query('new');

// query.findOne({ username: 'test' });
query.find()
// query.countDocuments({ username: 'test' });
// query.estimatedDocumentCount();
// query.aggregate([
//   { $match: { username: 'test' } },
//   { $group: { _id: '$username', total: { $sum: 1 } } },
// ]);

export { Query };
