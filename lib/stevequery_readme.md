


Query.deleteOne()

  Parameters:
  - queryObject: ( Type: Object, Record<string, unknown> )

    ex: { sampleField: 'sample' }
    conditions object can can contain 1 or more fields.

  - options [optional] ( Type: DeleteOptions  )

    interface DeleteOptions {
      collation?: Document;
      comment?: Document;
      hint?: Document | string;
      limit?: number;
      ordered?: boolean;
      writeConcern?: Document;
    }

  Returns: object with property deletedCount, value number
  // returns { deletedCount: 1 }

  Deletes the first document that matches the conditions from the DB collection. It returns an object with the property deletedCount,
  indicating how many documents were deleted. 

  Example: await Car.deleteOne({ make: 'Toyota', model: 'Camry', year: 2006 }); // returns { deletedCount: 1 }

Query.deleteMany()

  Parameters:
  - queryObject: ( Type: Object, Record<string, unknown> ) 
    see Query.deleteOne for more details.

  - options [optional] ( Type: DeleteOptions  )
    see Query.deleteOne for more details.

  Returns: object with property deletedCount, value number
  // returns { deletedCount: x }

  Deletes all of the documents that match the conditions from the DB collection. It returns an object with the property deletedCount,
  indicating how many documents were deleted. 

  Example: await Car.deleteOne({ make: 'Toyota', model: 'Camry' }); // returns { deletedCount: x } where x is the number of deleted documents.

Query.updateOne()

  Parameters:
  - queryObject: ( Type: Object, Record<string, unknown> )

    ex: { username: 'MBison' }
    queryObject can can contain 1 or more fields.

  - updateObject: ( Type: Object, Record<string, unknown> )

    ex: { country: 'Thailand' }
    updateObject can can contain 1 or more fields.

  - options [optional] ( Type: UpdateOptions )

    interface UpdateOptions {
      arrayFilters?: Document[];
      bypassDocumentValidation?: boolean;
      checkKeys?: boolean;
      collation?: Document;
      comment?: Document;
      hint?: Document;
      ignoreUndefined?: boolean;
      multi?: boolean;
      ordered?: boolean;
      serializeFunctions?: boolean;
      upsert?: boolean;
      writeConcern?: Document;
      wtimeout?: number;
      }

  Returns: object with properties upsertedId, upsertedCount, matchedCount, modifiedCount

  Updates one document without returning it. The fields in the updateObject will be set to their respective values.

  Example: await Car.updateOne({ username: 'MBison', country: 'Thailand', champion: false }, { champion: true } ); 
  // returns { upsertedId: undefined, upsertedCount: 0, matchedCount: 1, modifiedCount: 1 }

  note: If user wants to successfully use upsert option when no record exists, user needs to pass in complete document with
  valid types.

Query.updateMany()
  Parameters:
  - queryObject: ( Type: Object, Record<string, unknown> )

    ex: { program: 'Codesmith' }
    queryObject can can contain 1 or more fields.

  - updateObject: ( Type: Object, Record<string, unknown> )

    ex: { cohort: 'NY31' }
    updateObject can can contain 1 or more fields.

  - options [optional] ( Type: UpdateOptions )
    see Query.updateOne for more details.

  Returns: object with properties upsertedId, upsertedCount, matchedCount, modifiedCount

  Updates all documents that match queryObject without returning them. The matching fields in the DB collection will be set to the values in the updateObject.

  Example: await Bootcamp.updateMany({ school: 'Codesmith', cohort: 'NY32', completed: false  }, { completed: true } ); 
  // returns { upsertedId: undefined, upsertedCount: 0, matchedCount: 1, modifiedCount: 1 }

  note: If user wants to successfully use upsert option when no record exists, user needs to pass in complete document with
  valid types.


Query.dropCollection()
  
  Parameters: none

  Return: undefined, if successful

Delete currently selected collection.

Example: await Car.dropCollection();


