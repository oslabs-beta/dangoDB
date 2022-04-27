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

  
  // public async deleteOne(queryObject: Record<string, string>) {
  //   try {
  //     const db = await this.connection.connect();

  //     const collection = db.collection(this.collectionName);
  //     const data = await collection.deleteOne(queryObject);
  //     // console.log(data);
  //   } catch (error) {
  //   //  need to update error handling
  //     throw new Error(`Error in deleteOne function. ${error}`);
  //   }
  // }

  // need to modify 2nd param to be Record or Array, check mongoose docs
  // updates specified field/fields, uses $set operator
  // updateObject might be an object with several properties, or even nested - update to account for that variability
  
  // public async updateOne(queryObject: Record<string, string>, updateObject: Record<string, string>) {
  //   try {
  //     const db = await this.connection.connect();

  //     const collection = db.collection(this.collectionName);
  //     const setUpdateObject = { $set: updateObject };
  //     const data = await collection.updateOne(queryObject, setUpdateObject);
  //     // console.log(data);
  //   } catch (error) {
  //     //  need to update error handling
  //       throw new Error(`Error in updateOne function. ${error}`);
  //   }
  // } 


}

console.log('------> starting tests');
const query = new Query('new');
query.findOne({ username: 'test' });

// delete this after testing
// query.find({});

export { Query };
