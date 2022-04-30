import { Collection } from '../deps.ts';
import { Connection } from './connections.ts';
import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

// const { ObjectId } = Bson;



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

  // ------- Find By Id -------
  /* Finds a single document by its _id field */
  public async findById(id: string) {
    try {
    
      const stringId = new Bson.ObjectId(id)
     
      const db = await this.connection.connect();

      const collection = db.collection(this.collectionName);
      const data = await collection.findOne({_id: stringId});
      console.log(data);

      await this.connection.disconnect();

    } catch (error) {
      throw new Error(`Error in findById function. ${error}`);
    }
  }


}

const query = new Query('new');
// query.find();
query.findById('626aaab6ecf055a1a1c60c1e');

export { Query };