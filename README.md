# dangoDB
A MongoDB ODM for Deno

Table of Contents

1. Background / Overview
2. Getting Started
3. Query Functions
4. Schema Options
5. Schema Generator GUI
6. Section for our tech stack?

Background / Overview

// include a spiel about the lack of MongoDB ODM's for Deno?
Deno is a relatively new(young?) runtime environment. At this time, there are no major ODM libraries for Deno that are similar Mongoose, Prisma
or TypeORM, so that's where dangoDB comes in. 

dangoDB is a MongoDB Object Data Modeling (ODM) library that was developed for Deno. In Deno,
developers using our library(or tool?) can construct schemas, models, and enforce them with our built-in 
schema/type validation. The query functions available from the deno_mongo driver can all be accessed with ease. 

In addition, we built a user-friendly web-based GUI that auto-generates schema for clients(users?) to copy and paste directly into their code. 
(insert link)


Getting Started

First be sure that you have Deno runtime installed. 

Installation

In your TypeScript file, import the dango module from deno.land (website URL link)

import { dango } from ' ' // img?

The next thing we need to do is open a connection to your MongoDB database using your URI string.

await dango.connect(URI); // img or shell

Then we will want to define a schema and create a reference to it as illustrated below.

const dinosaurSchema = dango.schema({
  name: { type: 'string', required: true },
});

Great! Now we have a schema with one property, name, which will be a 'string.' The next step is compiling our schema into a Model.

const Dinosaur = dango.model('Dinosaur', dinosaurSchema);

Now, let's insert a document into the Dinosaur model.

await Dinosaur.insertOne({ name: 'Stegosaurus' });

Now, let's say we wanted to display all the dinosaurs in our collection. We can access all of the dinosaur documents through our Dinosaur model.


const dinosaurs = await Dinosaur.find({ });
console.log(dinosaurs); // [ { name: 'Triceratops' }, { name: 'Brontosaurus' }, { name: 'Stegosaurus' }];

Now you've successfully inserted a document into the Person collection at your MongoDB database. 

Congratulations. That's the end of our quick start. We imported dangoDB, opened up a connection, created a schema, inserted a document for Stegosaurus, and
queried all the dinosaurs in our Dinosaur model in your MongoDB using dangoDB. Explore the rest of the readme.MD for more detailed instructions on how to use dangoDB.



QUERY FUNCTIONS

All queries in dangoDB are performed using dangoDB models. Listed below are all the functions for CRUD operations.

CRUD Operations

- Model.deleteMany()
- Model.deleteOne()
- Model.find()
- Model.findById()
- Model.findByIdAndDelete()
- Model.findByIdAndRemove()
- Model.findByIdAndUpdate()
- Model.findOne()
- Model.findOneAndDelete()
- Model.findOneAndRemove()
- Model.findOneAndReplace()
- Model.findOneAndUpdate()
- Model.insertOne()
- Model.insertMany()
- Model.replaceOne()
- Model.updateMany()
- Model.updateOne()

Other Operations

- Model.aggregate()
- Model.countDocuments()
- Model.dropCollection()
- Model.estimatedCount()

CRUD Operations

Model.deleteMany()
Parameters:
- queryObject - Query to specify which documents to delete.
- options - [optional]
- callback - [callback]
Returns:
- object with property deletedCount, value number

Deletes all of the documents that match the conditions from the DB collection. It returns an object with the property deletedCount,
indicating how many documents were deleted. 

Model.deleteOne()
Parameters:
- queryObject - The query used to find matching document.
- options [optional]
- callback [optional]
Return:
- object with property deletedCount, value number

Deletes the first document that matches the conditions from the DB collection. It returns an object with the property deletedCount,
indicating how many documents were deleted. 

Model.find()
Parameters:
- queryObject - The query used to find matching documents.
- options - [optional] Additional options for the operation (e.g. lean, populate, projection)
- callback - [optional]
Returns:
- All matching documents in an array.

Returns all documents that satisfy the specified query criteria on the collection or view. 

Model.findById()
Parameters:
- queryObject - The query used to find matching document, using id.
- options - [optional] - Additional options for the operation (e.g. lean, populate, projection)
- callback - [optional]
Returns:
- Matching document.

Returns document that matches user provided ObjectId.

Model.findByIdAndDelete()


Model.findByIdAndUpdate()

Model.findOne()
Parameters:
- queryObject - Query used to find matching document. 
- options - [optional]
- callback - [optional]
Return:
- Matching document.

Returns first document that matches query.

Model.findOneAndDelete()


Model.findOneAndReplace()
Parameters:
- filter - Query used to find matching document
- replace - User document to replace matching document at database 
- options - [optional]
- callback - [optional]
Return:
- object displaying count for how many documents were upserted, matching, modified.

Finds a matching document, removes it, and passes in user's document. Replacement document retains same ObjectId as original document. 

Model.findOneAndUpdate()

Model.insertOne()
Parameters:
- document - User provided object to be inserted into the database.
Returns:
- Returns ObjectId of inserted document.

Inserts one document into database collection. 

Model.insertMany()
Parameters:
- document - Array of document(s) to be inserted into database.
- options - [optional] 
- callback - [optional]
Return:
- documents that passed validation.

Insert multiple documents into database. 

Model.updateMany()
Parameters:
- document - query used to find document(s) to update
- update - object containing field(s) and values to set them to
- options - [optional]
- callback - [optional]
Returns:
- object with properties upsertedId, upsertedCount, matchedCount, modifiedCount

Updates all documents that match queryObject. The matching fields in the DB collection will be set to the values in the updateObject.

Model.updateOne()
Parameters:
- document - query used to find document to update
- update - object containing field(s) and values to set them to
- options - [optional]
- callback - [optional]
Returns:
- object with properties upsertedId, upsertedCount, matchedCount, modifiedCount

Updates one document. The fields in the updateObject will be set to their respective values.


SCHEMA OPTIONS

When creating a schema, a type can be assigned to each property in string format, or an object with schema options properties.

Schema Options
- type - number, decimal128, stirng, boolean, objectid, UUID, date, object
- required - true or false, specifies whether a value is required in an insert document or replacement document. 
- default - default value if no value is provided by user
- unique - true or false, specifies whether a value will be designated as unique for the property.
- validator - user can provide function test that values to be inserted/update need to pass before being inserted.

User object to pass into dango.schema(): 

  { name: 'string', age: 'number' }

  { name: 
    { type: 'string', required: true, default: null, unique: true: validator: null }
  }

To set the type for an embedded object, create a schema for that object, and assign that schema to the property that corresponds with the object.

addressSchema = dango.schema({ house_number: 'number', unit: 'string', street: 'string', city: 'string'});

personSchema = dango.schema({ 
  name: 'string', 
  address: addressSchema 
})


SCHEMA GENERATOR GUI

With dangoDB's easy to navigate web-based GUI, users can easily select schema options for each property in a schema, and generate proper
schema code that can be copied and pasted directly into your project.




