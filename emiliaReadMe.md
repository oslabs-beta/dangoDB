File Description:
    Create query methods that are offered either by the deno mongo driver or by mongoose. 


- class Query - . 

- Interfaces: 
    -MatchInterface - . 
    -GroupInterface - . 

- Methods:
    - findOne - Returns one document that satisfies the specified query criteria on the collection or view. 

    - find - Selects documents in a collection or view and returns a cursor to the selected documents. 

    - countDocuments - Returns the count of documents that match the query for a collection or view.

    - estimatedDocumentCount - Returns the count of all documents in a collection or view. The method wraps the count command.

    - aggregate - Aggregation operations process multiple documents and return computed results. You can use aggregation operations to:
        Group values from multiple documents together.
        Perform operations on the grouped data to return a single result.
        Analyze data changes over time. 

    -findAndModify - Find and modify a document in one, returning the matching document. 
    
    -deleteOne - . 
    -findByIdAndDelete - . 
    -findOneAndRemove - . 
    -findByIdAndRemove - . 