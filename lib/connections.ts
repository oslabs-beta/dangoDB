import { MongoClient, Database } from '../deps.ts';

/**
 * Counts number of documents matching filter in a database collection.
 * @param connectionString A URI string from the user.
 * @returns A connection object.
 * example: new Connection(''mongodb+srv://example-uri');
 */
class Connection {
  private client!: MongoClient;
  public connected: boolean;
  public db: Database | boolean;

  constructor(private connectionString: string) {
    if (!connectionString)
      throw new Error('Connect method requires at least one argument');
    this.connected = false;
    this.connectionString = connectionString;
    this.db = false;
  }

  /**
   * Establishes connection to the database.
   * Reassigns Connection class properties of connected to true and db to the connected database.
   */
  public async connect() {
    try {
      this.client = new MongoClient();
      const db = await this.client.connect(this.connectionString);
      this.connected = true;
      console.log('Connected to Database.');
      this.db = db;
      return this.db;
    } catch (error) {
      throw new Error(`Could not connect to database. ${error}`);
    }
  }

  /**
   * Closes connection to the database.
   * Reassigns Connection class properties of connected to false and db to false.
   */
  public disconnect() {
    if (this.connected) {
      this.client.close();
      this.connected = false;
      this.db = false;
      console.log('Disconnected from Database.');
    } else {
      throw new Error(`No connection established to disconnect.`);
    }
  }
}

export { Connection };
