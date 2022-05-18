// deno-lint-ignore-file no-explicit-any

import { dango } from './dango.ts';
import { Bson } from '../deps.ts';
import { SchemaOptions } from './schema.ts';

// console.log(dango);
await dango.connect('mongodb+srv://kaiz0923:qckgc2WHjd9Fq1ad@starwars.5sykv.mongodb.net/mongo-test?authMechanism=SCRAM-SHA-1');
// console.log(dango.currentConnection);
// backupConnect: 'mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1'
// collectionName: 'new'

// test schemas
const phoneSchema = dango.schema({
  cell: { type: 'string', required: false },
  home: 'string',
});

const addressSchema = dango.schema({
  number: { type: 'string', required: true },
  unit: { type: 'string', required: false },
  town: { type: 'string', required: true },
  state: { type: 'string', required: true },
  zipcode: { type: 'string', required: true },
  phone: phoneSchema,
  house_id: {type: 'number', required: true, unique: true},
});

// outer schema
const infoSchema = dango.schema({
  name: { type: 'string', required: true, unique: true },
  address: addressSchema,
  test: { type: 'string', required: false, default: null },
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
  name: 'Mr. Z',
  address: {
    number: '1555',
    // unit: '8D',
    town: 'Bronx',
    state: 'NY',
    zipcode: '12222',
    phone: {
      cell: '718-100-5000',
    },
    house_id: 88888,
  },
  // test: 'test!!!',
  age: 35,
}));

// TEST FOR validateReplaceAgainstSchema
// console.log(await infoModel.findOneAndReplace({
//   name: 'Mr. F'
// },
// {
//   name: 'Mr. F',
//   address: {
//     number: '5000',
//     unit: '3D',
//     town: 'BK',
//     state: 'NY',
//     zipcode: '11222',
//     phone: {
//       cell: '718-300-1235',
//     },
//     house_id: 54321,
//   },
//   // test: 'Not a test',
//   age: 60,
// }));

// console.log(await infoModel.findOneAndUpdate({
//   name: 'Mr. D', 
// }, {
//   name: 'Mr. D'
// }));


// 1 level schema test
// console.log(await infoModel.find({ cell: '718-123-4567' }));
// console.log(await infoModel.find({ id: 100 }));
// Searching within embedded documents
// console.log(await infoModel.find({ 'address2.number': '1200' }));


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