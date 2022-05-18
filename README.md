# dangoDB
A MongoDB ODM for Deno

Table of Contents

1. Background / Overview
2. Getting Started
3. Queries
4. Schema Options
5. Schema Generator GUI
6. Section for our tech stack?

Background / Overview

// include a spiel about the lack of MongoDB ODM's for Deno?
Deno is a relatively new(young?) runtime environment. At this time, there are no major ODM libraries for Deno that are similar Mongoose, Prisma
or TypeORM. 

dangoDB is an Object Data Modeling (ODM) library for MongoDB that was developed for Deno. In Deno,
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



QUERIES

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

Model.deleteOne()

Model.find()
Parameters:
- queryObject - The query used to find matching documents.
- [options] - Additional options for the operation (e.g. lean, populate, projection)
- [callback] 
Returns:
- Returns all matching documents in an array.

Returns all documents that satisfy the specified query criteria on the collection or view. 

Model.findById()
Parameters:
- queryObject - The query used to find matching documents, using id.
- [options] - Additional options for the operation (e.g. lean, populate, projection)
- [callback]
Returns:
- Returns first matching document found in database.




Model.findByIdAndDelete()

Model.findByIdAndRemove()

Model.findByIdAndUpdate()

Model.findOne()

Model.findOneAndDelete()

Model.findOneAndRemove()

Model.findOneAndReplace()

Model.findOneAndUpdate()

Model.insertOne()
Parameters:
- document - user provided object to be inserted into the database.
Returns:
- 

Model.insertMany()

Model.updateMany()

Model.updateOne()







