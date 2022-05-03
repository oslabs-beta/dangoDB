Notes:
  Queries - 
    Replace One
    Insert One
    Insert Many
    Find One and Update
    Find By ID
    Find By ID and Update
    Fine One and Replace

replaceOne() - Replace One takes in up to four parameters, filter, document, the optional 'options' and optional callback. Filter is the client input criteria which can be any type. Doc is the client input for what will replace the filter input, also any type. Options include multipleCastError, strict, upsert, writeConcern and timestamps.  ReplaceOne replaces the filters existing document with the input doc - same as update() in the mongoDB Driver. Returns a query.

insertOne() - Insert One takes one parameter, a document, which inserts a document into the database. InsertOne() has taken over the deprecated Insert() and is pulled from the MongoDB driver. Returns a query. * Stretch - If the document does not specify an _id field, then MongoDB driver will add the _id field and assign a unique ObjectId() for the document before inserting. Most drivers create an ObjectId and insert the _id field, but the MongoDB will create and populate the _id if the driver or application does not.

insertMany() - Insert Many takes in three parameters, documents include an array or objects and an optional options, and an optional callback. Inserts an array or object into the database Currently if one document has a validation error, no documents will be saved. Returns a promise.

findOne() - Find One and Update takes in four parameters, filter, document, the optional 'options' and optional callback. Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callbacks. The query executes if callback is passed, otherwise it returns a query. *Potential options we might want: new, upsert, runValidators, rawResult.

findById() - Find By Id takes in up to four parameters, id, optional: projection, options, and callback, and returns a query. It find a singl document by its _id field - is ALMOST equivalent to findOne(). The difference being findById(unefined) translates to findOne({_id: null}) where findOne(undefined) or findOne({_id: undefined}) equate to findOne({}).

findByIdAndUpdate() - Find By Id and Update takes up to four parameters, id, update, optional: options, callback and returns a query. Finds a matching document by _id, updates it according to the update arg, passing any options, and returns the found document (if any) to the callbacks. Uses findOneAndUpdate. Potential options: new, upsert, runValidators, sort, rawResult, strict and select.

findOneAndReplace() - Find One and Replace takes up to four parameters, filter, replacement optional: options and callback, and returns a query. Find a matching document, removes it, and passed the found document (if any) to the callback. Executes if callback is passed. Available options: sort, rawResult.