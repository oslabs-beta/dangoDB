// deno-lint-ignore-file no-explicit-any

import { dango } from './dango.ts';

// console.log(dango);
await dango.connect('mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1');
// console.log(dango.currentConnection);

const dangoSchema = dango.schema({
  name: { type: 'string'},
  // age: {type: 'number', required: false, default: 60, validator: ((num: number) => num > 50)},
  age: {type: 'number', required: true, default: 60},
  food: {type: 'string', required: false, default: true},
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
// // console.log(dangoModel);
// console.log(await dangoModel.insertOne({name: 'Joker', age: 51}));
// console.log(await dangoModel.findOne({name: 'buttface'}));
// console.log(await dangoModel.insertOne({name: 'Poker', age: 70}));
// console.log(await dangoModel.findOne({name: 'Fred'}));
// console.log(await dangoModel.findById('626aaa96500d65b1228e6940'));
// console.log(await dangoModel.insertOne({username: 'dango rules'}))
// console.log(await dangoModel.findOne({ username: "dango rules" }));
// console.log(await dangoModel.deleteOne({ username: "dango rules"}, (input) => {console.log('callback executed', input)}));
// console.log(await dangoModel.updateMany({ name: 'Joker'}, { food: 'dango' }));
// console.log(await dangoModel.find({name: 'Joker' }));
// console.log(await dangoModel.findByIdAndUpdate('62733a0b76beb44c3c17e674', { age: 'Merlin'}))
// console.log(await dangoModel.findOneAndReplace({ name: 'Merlin' }, { name: 'Merlin', age: 100, food: 'starbursts'}));
// console.log(await dangoModel.find({name: 'Merlin' }));
// console.log(await dangoModel.findOneAndUpdate({ name: "Banantha" }, { food: "babies"}, (input) => {console.log('callback executed', input)}));
// console.log(await dangoModel.find({ username: "jack" }));
// console.log(await dangoModel.find()); 
// console.log(await dangoModel.find({ username: 'test'}, { limit: 2 }));
// console.log(await dangoModel.insertMany([ { name: 'Viper' }, { name: 'Slider', age: 26 } ]));
// console.log(await dangoModel.findOne({ name: "Viper" }));
// console.log(await dangoModel.findOne({ name: "Slider" }));
// console.log(await dangoModel.countDocuments({ name: 'Carp'}));
console.log(await dangoModel.estimatedDocumentCount());

// Test if we can bring connection into query specifically
// Test queries from model

await dango.disconnect();
console.log(dango.currentConnection);