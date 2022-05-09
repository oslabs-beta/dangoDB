import { dango } from './dango.ts';

const MY_URI = 'mongodb+srv://wgreco13:g3HUuathwbVEisEj@cluster0.adcc3.mongodb.net/dangoDB?authMechanism=SCRAM-SHA-1'

await dango.connect(MY_URI);

const greaterThan30 = (num: number) => {return num > 30};

const myCollection = 'dangoDBBaby';
const myNewSchema = dango.schema({
  name: 'string',
  age: { type: 'number', required: false, validator: greaterThan30, unique: true},
  someDecimal: { type: 'decimal128', default: 1.25 }
});

const myModel = dango.model(myCollection, myNewSchema);

// await myModel.insertOne({ name: 'Fred', age: 55 });
// console.log(await myModel.findOne({ name: 'Fred' }));
await myModel.insertOne({ name: 'Carrie', age: 29 });

await dango.disconnect();