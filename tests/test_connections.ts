// Required Flags for Test:
//  - --allow-read
//  - --allow-net
//  - --allow-env

import {
  assertInstanceOf,
  assertRejects,
  assertStrictEquals,
  assertThrows,
  afterEach,
  beforeEach,
  describe,
  it,
} from '../deps.ts';

import { load } from '../deps.ts';

import { MongoClient, Database } from '../deps.ts';

import { Connection } from '../lib/connections.ts';

const env = await load();
const CONNECTION_STRING = env["URI_STRING"];

describe('Connection constructor', () => {
  let newObject: unknown;
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new Connection();
      });
    });
  });
  describe('creating an instance of the class with a valid URI string', () => {
    beforeEach(() => {
      newObject = new Connection(CONNECTION_STRING);
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, Connection);
    });
    it('will have a connected property assigned the value of false', () => {
      if (newObject instanceof Connection) {
        assertStrictEquals(newObject.connected, false);
      }
    });
    it('will have a connectionString property assigned the value of the URI connection string', () => {
      if (newObject instanceof Connection) {
        //@ts-ignore Ignore TS warning to run test
        assertStrictEquals(newObject.connectionString, CONNECTION_STRING);
      }
    });
    it('will have a db property assigned the value of false', () => {
      if (newObject instanceof Connection) {
        assertStrictEquals(newObject.db, false);
      }
    });
    it('will have a client property assigned the value of undefined', () => {
      if (newObject instanceof Connection) {
        //@ts-ignore Ignore TS warning to run test
        assertStrictEquals(newObject.client, undefined);
      }
    });
    it('will have a connect method', () => {
      if (newObject instanceof Connection) {
        assertInstanceOf(newObject.connect, Function);
      }
    });
    it('will have a disconnect method', () => {
      if (newObject instanceof Connection) {
        assertInstanceOf(newObject.disconnect, Function);
      }
    });
  });
});
describe('Connection methods', () => {
  let newObject: unknown;
  describe('using the connect method', () => {
    describe('creating a Connection object with a valid URI', () => {
      beforeEach(() => {
        newObject = new Connection(CONNECTION_STRING);
      });
      afterEach(async () => {
        if (newObject instanceof Connection) {
          await newObject.disconnect();
        }
      });
      it('will set connected property to true', async () => {
        if (newObject instanceof Connection) {
          await newObject.connect();
          assertStrictEquals(newObject.connected, true);
        }
      });
      it('will connect to the MongoClient and set client property to the connection', async () => {
        if (newObject instanceof Connection) {
          await newObject.connect();
          //@ts-ignore Ignore TS warning to run test
          assertInstanceOf(newObject.client, MongoClient);
        }
      });
      it('will connect to the database and set db property to the connection', async () => {
        if (newObject instanceof Connection) {
          await newObject.connect();
          assertInstanceOf(newObject.db, Database);
        }
      });
    });
    describe('creating a Connection object with an invalid URI', () => {
      beforeEach(() => {
        newObject = new Connection('BAD_URI_STRING');
      });
      it('will throw an error', async () => {
        await assertRejects(async () => {
          if (newObject instanceof Connection) {
            await newObject.connect();
          }
        });
      });
      it('will not change the value of the connected property', async () => {
        if (newObject instanceof Connection) {
          try {
            await newObject.connect();
          } catch (err) {
            assertStrictEquals(newObject.connected, false);
          }
        }
      });
      it('will not change the value of the db property', async () => {
        if (newObject instanceof Connection) {
          try {
            await newObject.connect();
          } catch (err) {
            assertStrictEquals(newObject.db, false);
          }
        }
      });
    });
  });
  describe('using the disconnect method', () => {
    describe('invoking disconnect after a connection is established', () => {
      beforeEach(() => {
        newObject = new Connection(CONNECTION_STRING);
      });
      it('should reset the value of the connected property', async () => {
        if (newObject instanceof Connection) {
          await newObject.connect();
          await newObject.disconnect();
          assertStrictEquals(newObject.connected, false);
        }
      });
      it('should reset the value of the db property', async () => {
        if (newObject instanceof Connection) {
          await newObject.connect();
          await newObject.disconnect();
          assertStrictEquals(newObject.db, false);
        }
      });
    });
    describe('invoking disconnect before a connection is established', () => {
      it('will throw an error', () => {
        if (newObject instanceof Connection) {
          assertRejects(async () => {
            if (newObject instanceof Connection) {
              await newObject.disconnect();
            }
          });
        }
      });
      it('will not change the value of the connected property', async () => {
        if (newObject instanceof Connection) {
          try {
            await newObject.disconnect();
          } catch (err) {
            assertStrictEquals(newObject.connected, false);
          }
        }
      });
      it('will not change the value of the db property', async () => {
        if (newObject instanceof Connection) {
          try {
            await newObject.disconnect();
          } catch (err) {
            assertStrictEquals(newObject.db, false);
          }
        }
      });
    });
  });
});
