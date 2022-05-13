// deno-lint-ignore-file no-explicit-any

import { dango } from './dango.ts';
import { Bson } from '../deps.ts';
import { SchemaOptions } from './schema.ts';

// console.log(dango);
await dango.connect('mongodb+srv://kaiz0923:qckgc2WHjd9Fq1ad@starwars.5sykv.mongodb.net/mongo-test?authMechanism=SCRAM-SHA-1');
// console.log(dango.currentConnection);

// test schemas
const phoneSchema = dango.schema({
  cell: 'string',
  home: 'string',
});

const addressSchema = dango.schema({
  number: { type: 'string', required: true },
  unit: { type: 'string', required: false },
  town: { type: 'string', required: true },
  state: { type: 'string', required: true },
  zipcode: { type: 'string', required: true },
  phone: phoneSchema,
});

// outer schema
const infoSchema = dango.schema({
  name: { type: 'string', required: true },
  address: addressSchema,
  test: { type: 'string', required: true },
  address2: addressSchema,
  age: { type: 'number', required: true, validator: ((num: number) => num > 17) }
});

// const simpleSchema = dango.schema({
//   id: { type: 'number', required: true, unique: true, validator: ((num: number) => num > 99) },
//   name: { type: 'string', required: true },
//   DOB: { type: 'date'},
// });

// console.log('infoSchema: ', infoSchema);
// console.log('simpleSchema: ', simpleSchema);

// Test model creation

const infoModel = dango.model('info', infoSchema);

// TEST
console.log(await infoModel.insertOne({
  name: 'Grouch',
  address: {
    number: '105',
    // unit: '8D',
    town: 'Queens',
    state: 'NY',
    zipcode: '11345',
    phone: {
      cell: '718-123-4567',
    },
  },
  test: 'test!!!',
  address2: {
    number: '1200',
    // unit: '8D',
    town: 'Queens',
    state: 'NY',
    zipcode: '12345',
    phone: {
      home: '718-888-8888',
    },
  },
  age: 35,
}));

// console.log(await infoModel.find({}));
// let birthday = new Date(1995, 11, 17);

// const infoModel = dango.model('info', simpleSchema);
// console.log(await infoModel.insertOne({
//   id: 100,
//   name: "Joe",
//   DOB: birthday,
// }));



// Test if we can bring connection into query specifically
// Test queries from model

await dango.disconnect();
console.log(dango.currentConnection);