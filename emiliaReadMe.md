File Description:
    Create query methods that are offered either by the deno mongo driver or by mongoose. Have we addedd custom methods? 


- class Query - Should we write any info about this class? . 

- Interfaces: 
    -MatchInterface - an interface which desribes the shape of the match operator type. 

    -GroupInterface - an interface which describes the shape of the group operator type. 

- Methods:
    findOne, 
    find, 
    countDocuments, 
    estimatedDocumentCount, 
    aggregate, 
    findAndModify, 
    deleteOne, 
    findByIdAndDelete,
    findOneAndRemove, 
    findByIdAndRemove; 

    findOne() - Returns one document that satisfies the specified query criteria on the collection or view. 

    find() - Selects documents in a collection or view and returns a cursor to the selected documents. 

    countDocuments() - Returns the count of documents that match the query for a collection or view.

    estimatedDocumentCount() - Returns the count of all documents in a collection or view. The method wraps the count command.

    aggregate() - Aggregation operations process multiple documents and return computed results. You can use aggregation operations to:
        Group values from multiple documents together.
        Perform operations on the grouped data to return a single result.
        Analyze data changes over time. 

    findAndModify() - Find and modify a document in one, returning the matching document. 
    
    deleteOne() - Deletes the first document that matches conditions from the collection. It returns an object with the property deletedCount indicating how many documents were deleted. Behaves like findOneAndRemove(), but deletes at most one document regardless of the single option. 

    findByIdAndDelete() - Issue a MongoDB findOneAndDelete() command by a document's _id field. In other words, findByIdAndDelete(id) is a shorthand for findOneAndDelete({ _id: id }). This function triggers the following middleware: findOneAndDelete(); 

    findOneAndDelete() - Issue a MongoDB findOneAndDelete() command. Finds a matching document, removes it, and passes the found document (if any) to the callback. Executes the query if callback is passed. This function triggers the following middleware. This function differs slightly from Model.findOneAndRemove() in that findOneAndRemove() becomes a MongoDB findAndModify() command, as opposed to a findOneAndDelete() command. For most mongoose use cases, this distinction is purely pedantic. You should use findOneAndDelete() unless you have a good reason not to.

    findOneAndRemove() - Issue a mongodb findAndModify remove command. Finds a matching document, removes it, passing the found document (if any) to the callback. Executes the query if callback is passed. 

    findByIdAndRemove() - Issue a mongodb findAndModify remove command by a document's _id field. findByIdAndRemove(id, ...) is equivalent to findOneAndRemove({ _id: id }, ...). Finds a matching document, removes it, passing the found document (if any) to the callback. Executes the query if callback is passed. This function triggers the following middleware: findOneAndRemove(). 


    ToDo: 
        -update error handling? 
        -refactor how the connection is brought in? 
        -does everything that needs options have options passed in? 
        -add console log messages