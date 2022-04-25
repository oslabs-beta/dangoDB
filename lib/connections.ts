import { MongoClient } from '../deps.ts';

class Connection {
    constructor(private connectionString: string) {
        this.connectionString = connectionString;
    }

    async connect() {
        try {
            const client = new MongoClient();
            const db = await client.connect(this.connectionString);
            console.log('connect');
            return db;
        } 
        catch (error) {
            console.log('error');
            return error;
        }
    }
}

const test = new Connection('mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1');
test.connect();


// export new Connection('mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1');