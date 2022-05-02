File Description:
    Create general structure of different data types including methods to 'cast' data types from one to another. For instance before a field designated as a string rejects an input that is a number, it should see if it's possible to convert that number to a string.

Notes:
    - Data Types:
        - Number (Equivalent to a BSON Double)
        - Decimal128
        - String
        - Boolean
        - ObjectID
        - UUID
        - Date
    - The file currently has a line at the top to allow explicit any's. We are validating data types through the inputs so any should be acceptable.

- Methods on Each:
    - ConvertToType - Attempts to convert the input to the given data type. Returns undefined if not possible. Null remains null.
    - ValidateType - If a type conversion is possible, returns true. If undefined is the input returns false.
    - ValidateConstraints - General function that accepts a callback and will validate whether the raw input ran through the callback will return true or false.

Issues:
    - Unclear right now is Classes for each Schema type is the correct path. It is also unclear of how these will relate to the overall schema that we generate. We may move some of these methods around or create new ones as it is fleshed out.
    - Some primitive data types like number, string, booleans may need additional logic to accomodate their object forms.
    - No nested or complex data types like objects/arrays are current represented
    - No Symbols as of now
    - No Int32
    - We can split this file per data type if it becomes cumbersome
    - Export structure not entirely clear.

Complete:
    - Number
    - Decimal128
    - String
    - Boolean

TODO:
    - ObjectID
    - UUID
    - Date
    - Full testing
    - Exports
    - Comments