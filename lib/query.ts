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
}

const query = new Query('new');
query.findOne({ username: 'test' });

export { Query };
