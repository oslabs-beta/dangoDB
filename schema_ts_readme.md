File Description:
    Create a schema object. The user will pass in a schema object with optional options parameters. Each property in the schema will be populated with all possible properties.

Notes:
    - Optional Properties:
        - Type: Required. The value will be the class specified by the user.
        - Required: If a property is not present, the data set will be rejected
        - Unique: If the value of the current property already exists within the data set then the data set will be rejected
        - Default: Specifies the default value of a given field. If no default is specified, a default value of Null is assumed.
        - Validator: A user defined function that returns a boolean. If the function returns anything but true the data set is rejected.

    - The schemaMap object is what is populated with all properties and options.
    - Each property is iterated over and the SchemaOptions object is created and set as the value.
    - If only a type is given in the user input to Schema then the rest of the schema options are set to the default.

Issues:
    - Types object may be moved somewhere else.

Complete:
    - Schema Class
    - SchemaOptions Class

TODO:
    - Full testing
    - Comments