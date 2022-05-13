// deno-lint-ignore-file no-explicit-any

import { dango } from './dango.ts';
import { Bson } from '../deps.ts';
import { SchemaOptions } from './schema.ts';

// console.log(dango);
await dango.connect('mongodb+srv://kaiz0923:qckgc2WHjd9Fq1ad@starwars.5sykv.mongodb.net/mongo-test?authMechanism=SCRAM-SHA-1');
// console.log(dango.currentConnection);

// nested schema
// const addressSchema = dango.schema({
//   number: { type: 'string', required: true },
//   unit: { type: 'string', required: false },
//   town: { type: 'string', required: true },
//   state: { type: 'string', required: true },
//   zipcode: { type: 'string', required: true },
// });

// test schemas
const phoneSchema = dango.schema({
  cell: 'string',
  home: 'string',
})

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
  name: { type: 'string', required: true,},
  address: addressSchema,
  test: { type: 'string', required: true,},
  address2: addressSchema,
  age: {type: 'number', required: true, validator: ((num: number) => num > 17)}
});

console.log('infoSchema: ', infoSchema);

// console.log('----> name property on infoSchema  :', infoSchema.schemaMap.name);
// console.log('----> address property on infoSchema  :', infoSchema.schemaMap.address);
// console.log('----> schemaMap.address is class SchemaOptions  :', infoSchema.schemaMap.address instanceof SchemaOptions);

// console.log(dangoSchema);
// console.log('test', dangoSchema.schemaMap.name.type);
// console.log(dangoSchema.schemaMap.name)
// console.log(dangoSchema.schemaMap.age)

// Test model creation

const infoModel = dango.model('info', infoSchema);
// console.log(await infoModel.find({}));
// console.log(`Printing Bson.object type: ${Object}`);
// console.log(await infoModel.insertOne({
//   name: 'Grouch',
//   address: {
//     number: '1',
//     // unit: '8D',
//     town: 'Queens',
//     state: 'NY',
//     zipcode: '10004'
//   },
// }));

// TEST
console.log(await infoModel.insertOne({
  name: 'Grouch',
  address: {
    number: '1',
    // unit: '8D',
    town: 'Queens',
    state: 'NY',
    zipcode: '10004',
    phone: {
      cell: '718-123-4567',
    },
  },
  test: 'test!!!',
  address2: {
    number: '1',
    // unit: '8D',
    town: 'Queens',
    state: 'NY',
    zipcode: '10004',
    phone: {
      home: '718-123-4567',
    },
  },
  age: 18,
}));

console.log(await infoModel.find({}));


// Test if we can bring connection into query specifically
// Test queries from model

await dango.disconnect();
console.log(dango.currentConnection);