/*Create a query class*/

import { Collection } from '../deps.ts';
import { Connection } from './connections.ts';

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

  // ------- Replace One ---------
  
  public async replaceOne(filterId: Record<string, string>, queryObject: Record<string, string>) {
    try {
      //connect to the db
      const db = await this.connection.connect();
      // find the id given in the filter - the find method is available for use
      const collection = db.collection(this.collectionName);
      const data = await collection.replaceOne(filterId, queryObject)
      console.log(data); // returned as ex.{ upsertedId: undefined, upsertedCount: 0, matchedCount: 1, modifiedCount: 1 }

      // do we want to include upsert: true option to check if no documents match the filter of which we can add one?
      /* should return a document containing a boolen acknowledged: true if succesful, a matchedCount showing how many matches there were and if we want to do the upsert method, the _id for that.
      */
      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in replaceOne function. ${error}`);
    }
  }

  // -------- Insert One --------
  public async insertOne(queryObject: Record<string, string>) {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const id = await collection.insertOne(queryObject);
      console.log(id);

      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in insertOne function. ${error}`);
    }
  }

  // -------- Insert Many --------
  public async insertMany(queryObject: Record<string, string>[]) {
    try {
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const ids = await collection.insertMany(queryObject);
      console.log(ids);

      await this.connection.disconnect();
    } catch (error) {
      throw new Error(`Error in insertMany function. ${error}`);
    }
  }


}
//_id: new ObjectId("62642ee21bcc7078ae1dba3d")


const query = new Query('new');
// query.findOne({username: 'CK'});
// query.replaceOne({username: 'newuser'}, {username: 'newNewUser'});
// query.insertOne({username: 'Bob'});
// const arr = [{username: 'CK'}, {username: 'Keanu'}, {username: 'Gaston'}]
// query.insertMany(arr);
export { Query };
