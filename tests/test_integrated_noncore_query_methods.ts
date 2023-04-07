// Required Flags for Test:
//  - --allow-read
//  - --allow-net
//  - --allow-env

import {
  assertEquals,
  afterAll, 
  beforeAll,
  describe,
  it,
  // @ts-ignore
} from '../deps.ts';

import { dango } from '../lib/dango.ts';
import { load } from '../deps.ts';
import { mockAddress } from './mock_address.js';

const env = await load();
const CONNECTION_STRING = env["URI_STRING"];

describe('non-core query methods', async () => {

  if(!CONNECTION_STRING) {
    console.log('No Connection String, ending test_unit_other_query tests');
    return;
  }

  let directoryQuery: any;

  let queryObject: Record<string, unknown>;

  beforeAll( async () => {

    await dango.connect(CONNECTION_STRING);

    const addressSchemaTemplate = {
      type: 'string',
      houseNumber: 'string',
      street: 'string',
      city: 'string',
      state: 'string',
      zipcode: 'string',
    }

    const AddressSchema = dango.schema(addressSchemaTemplate);

    const personSchemaTemplate = {
      firstName: 'string',
      lastName: 'string',
      gender: 'string',
      address: AddressSchema,
      phoneNumber: 'string',
    };
    
    const PersonSchema = dango.schema(personSchemaTemplate);
    const collectionName = 'personDirectory';
    directoryQuery = dango.model(collectionName, PersonSchema);

    await directoryQuery.insertMany(mockAddress);

  });

  afterAll( async () => {
    await directoryQuery.dropCollection();
    await dango.disconnect();
  });

  it('estimatedDocumentCount matches number of documents in collection', async () => {

    const length = mockAddress.length;
    const result = await directoryQuery.estimatedDocumentCount();
    assertEquals(result,length);
  });

  it('countDocuments returns correct number of documents matching filter', async () => {

    let personCount = 0;
    mockAddress.forEach((person) => {
      if(person.firstName === 'Alex') personCount += 1;
    });

    queryObject = { firstName: 'Alex'};
    const result = await directoryQuery.countDocuments(queryObject);
    assertEquals(result, personCount);

  });

  it('aggregate function using match and group stages', async () => {

    interface ReturnCountData {
      _id: string;
      count: number;
    }

    let nyCount = 0;
    let njCount = 0;

    mockAddress.forEach(person => {
      if(person.address.state === 'NY') nyCount += 1;
      else if(person.address.state === 'NJ') njCount += 1;
    })

    const groupStage = {
      $group: {
        _id: '$address.state',
        count: { $sum: 1 },
      },
    };

    const matchStage = {
      $match: {
        'address.state': { 
          $gt: 'CT',
        },
      },
    };

    const result = await directoryQuery.aggregate([matchStage, groupStage]);
    console.log('aggregate with match and group stages: ', result);
    let returnNYCount = 0;
    let returnNJCount = 0;
    // Note: TS error if either returnNYCount or returnNJCOunt were typed as 'Number' or 'number'.
    // Needed to assign both to zeros for implicit type assignment

    result.forEach((data: ReturnCountData) => {
      if(data._id === 'NY') returnNYCount = data.count;
      else if(data._id === 'NJ') returnNJCount = data.count;
    });

    assertEquals(nyCount, returnNYCount);
    assertEquals(njCount, returnNJCount);

  });


});