import { MongoClient } from '../deps.ts';

/* Create a MongoDB connection. */
class Connection {
  private client!: MongoClient;
  public connected: boolean;

  constructor(private connectionString: string) {
    if (!connectionString) throw new Error('Connect method requires at least one argument');
    this.connected = false;
    this.connectionString = connectionString;
  }

  /*Connect to the database */
  public async connect() {
    try {
      this.client = new MongoClient();
      const db = await this.client.connect(this.connectionString);
      this.connected = true;
      console.log('connect');

      return db;

    } catch (error) {
      console.log('error');
      throw new Error(`Could not connect. ${error}`);
    }
  }

  // /* Test connection */
  // public async ping () {
  //     await this.connect;
  // }

  /* Close the connection from the database  */
  //should this be async? 
  public disconnect() {
    if (this.connected) {
      this.client.close();
      this.connected = false;   
      console.log('closed connection');
    } else {
      console.log('did not work');
    } 
  }
}
/* TEST */
const test = new Connection(
  'mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1'
);

await test.connect();
test.disconnect(); 
// export new Connection('mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1');


export { Connection };