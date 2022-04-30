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

  // ----- Format Bson Id ------
  // private async formatBsonId(filter?: Record<string, unknown>) {
  //   // if a filter param exists
  //   if (filter) {
  //     // if the filter param has an _id
  //     if (filter?._id) {
  //       // assign id to the filter._id
  //       const id = filter._id;
  //       // if id is a string
  //       if (typeof id === 'string') {
  //         // reassign filter._id to a new Bson formated id
  //         filter._id = await new Bson.ObjectId(id);
  //       } else if (Array.isArray(id.$in)) {
  //         id.$in = await id.$in.map((_id: Record<string, unknown>) => {
  //           if (typeof _id === "string") {
  //            const data = await new Bson.ObjectId(_id);
  //            console.log(data)
  //           }
  //         })
  //       }
  //     }
  //   }
  // }

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

  // ------ Find One and Update -------
  /* Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callbacks  */
  public async findOneAndUpdate(filter: Record<string, unknown>, update: Record<string, unknown>, options?: Record<string, number | unknown> ) {
    try {
      const db = await this.connection.connect();
      const collection = db.collection(this.collectionName);
      const newUpdate = { $set: update };
      const data = await collection.updateOne(filter, newUpdate, options)
      console.log(data);

      await this.connection.disconnect();

    } catch (error) {
      throw new Error(`Error in findOneAndUpdate function. ${error}`);
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
      console.log(data);

      await this.connection.disconnect();

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
      console.log(data);

      if (callback) await callback(data);

      await this.connection.disconnect();

    } catch (error) {
      throw new Error(`Error in findByIdAndUpdate function. ${error}`);
    }
  }

}

const query = new Query('new');
// query.find();
// query.findById('626aaab6ecf055a1a1c60c1e');
query.findOne({ username: "omgThisWorksAgain" });
// query.findByIdAndUpdate('626aa9c8b1d75dd60462cf15', { username: "omgThisWorksAgain"}, (input) => {console.log('callback executed', input)});

// query.findOneAndUpdate({ username: "newNewtest2" }, { password: "thisisnew"});

export { Query };