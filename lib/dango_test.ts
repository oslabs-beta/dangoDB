// deno-lint-ignore-file no-explicit-any

import { dango } from './dango.ts';

// console.log(dango);
await dango.connect('mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1');
// console.log(dango.currentConnection);

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
// console.log(dangoModel);
console.log(await dangoModel.find());
// console.log(await dangoModel.findById('626aaa96500d65b1228e6940'));
// console.log(await dangoModel.insertOne({username: 'dango rules'}))
// console.log(await dangoModel.findOne({ username: "dango rules" }));
// console.log(await dangoModel.deleteOne({ username: "dango rules"}, (input) => {console.log('callback executed', input)}));
// console.log(await dangoModel.updateOne({ username: 'jack'}, { age: 69  }));
// console.log(await dangoModel.findOneAndUpdate({ username: "anotherOne" }, { username:"MyBrainHurts"}, (input) => {console.log('callback executed', input)}));
// console.log(await dangoModel.find({ username: "jack" }));

// console.log(await dangoModel.find({ username: 'test'}, { limit: 2 }));
// Test if we can bring connection into query specifically
// Test queries from model

await dango.disconnect();
console.log(dango.currentConnection);