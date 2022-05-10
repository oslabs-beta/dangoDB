// deno-lint-ignore-file no-explicit-any

import { dango } from './dango.ts';
import { Bson } from '../deps.ts';
import { SchemaOptions } from './schema.ts';

// const { Object } = Bson;

// console.log(dango);
await dango.connect('mongodb+srv://kaiz0923:qckgc2WHjd9Fq1ad@starwars.5sykv.mongodb.net/mongo-test?authMechanism=SCRAM-SHA-1');
// console.log(dango.currentConnection);

const infoSchema = dango.schema({
  name: { type: 'string'},
  address: { type: 'object' },
  // age: {type: 'number', required: false, default: 60, validator: ((num: number) => num > 50)},
  // age: {type: 'number', required: true, default: 60},
  // food: {type: 'string', required: false, default: true},
});
console.log('----> name property on infoSchema  :', infoSchema.schemaMap.name);
console.log('----> address property on infoSchema  :', infoSchema.schemaMap.address);
console.log('----> schemaMap.address is class SchemaOptions  :', infoSchema.schemaMap.address instanceof SchemaOptions);

// const testObj = {
//   name: 'string',
//   age: {type: 'number', required: true, default: 60},
// }
// console.log(testObj.age.type)


// console.log(dangoSchema);
// console.log('test', dangoSchema.schemaMap.name.type);
// console.log(dangoSchema.schemaMap.name)
// console.log(dangoSchema.schemaMap.age)

// Test model creation

const infoModel = dango.model('info', infoSchema);
// // console.log(dangoModel);
console.log(await infoModel.find({}));
// console.log(`Printing Bson.object type: ${Object}`);
// console.log(await infoModel.insertOne({
//   name: 'Jim',
//   address: {
//     number_street: '123',
//     unit: '3B',
//     town: 'Brooklyn',
//     state: 'NY',
//     zipcode: '10002'
//   },
// }));

// console.log(await infoModel.find({}));


// Test if we can bring connection into query specifically
// Test queries from model

await dango.disconnect();
console.log(dango.currentConnection);