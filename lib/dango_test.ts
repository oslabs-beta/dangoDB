// deno-lint-ignore-file no-explicit-any

import { dango } from './dango.ts';

console.log(dango);
await dango.connect('mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1');
console.log(dango.currentConnection);

const dangoSchema = dango.schema({
  name: 'string',
  age: {type: 'number', required: true, default: 60},
})

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

const dangoModel = dango.model('new', dangoSchema);
console.log(dangoModel);
console.log(await dangoModel.find());

// Test if we can bring connection into query specifically
// Test queries from model

await dango.disconnect();
console.log(dango.currentConnection);