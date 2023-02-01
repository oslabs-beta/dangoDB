// Required Flags for Test:
//  - --allow-read
//  - --allow-net

import {
  assertInstanceOf,
  assertStrictEquals,
  assertThrows,
  beforeEach,
  describe,
  it,
} from '../deps.ts';

import { dotenv } from '../deps.ts';
import { dango } from '../lib/dango.ts';
import { afterAll, beforeAll } from '../deps.ts';
import { assertEquals } from '../deps.ts';

const ENV = dotenv.config({ path: '../.env'});

describe('non-core query methods', async () => {

  let test_query: any;

  let queryObject: Record<string, unknown>;

  beforeAll( async () => {
    const connection_string = ENV.URI_STRING;
    await dango.connect(connection_string);

    const UserSchema = {
      name: 'string',
    };
    
    const testSchema = dango.schema(UserSchema);
    const collectionName = 'testCollection';
    test_query = dango.model(collectionName, testSchema);

  });

  afterAll( async () => {
    await dango.disconnect();
  });

  it('estimatedCount matches number of documents in collection', async () => {

    const result = await test_query.estimatedDocumentCount();
    // console.log('result: ', await result);
    assertEquals(await result, 2);
  });

});