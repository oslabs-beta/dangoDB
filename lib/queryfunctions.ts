// deno-lint-ignore-file no-explicit-any

import { optionsObject } from './schema.ts'

// Takes in object argument for query. Checks if any fields exist that are not in schemaMap property of schema object. Throw error if so.
function checkDataFields(queryObject: Record<string, any>) {
  for (const property in queryObject) {
    if (Object.prototype.hasOwnProperty.call(this.schema.schemaMap, property) {
      throw new Error ('Requested query object contains properties not present in the Schema.')
    }
  }
  return true;
}

// Runs after checkDataFields. Loops through properties in Schema. Calls each check function on each property
async function validateInsertAgainstSchema(queryObject: Record<string, any>) {
  this.checkDataFields(queryObject);
  for (const property of this.schema.schemaMap) {
    this.checkRequired(queryObject, property, this.schema.schemaMap[property]);
    this.setDefault(queryObject, property, this.schema.schemaMap[property]);
    this.populateQuery(queryObject, property, this.schema.schemaMap[property]);
    //Do we need async here
    await this.checkUnique(property, this.schema.schemaMap[property])
    this.checkConstraints(property, this.schema.schemaMap[property])
  }
  return true;
}

async function validateReplaceAgainstSchema(findObject: Record<string, any>, queryObject: Record<string, any>) {
  this.checkDataFields(queryObject);
  for (const property of this.schema.schemaMap) {
    this.checkRequired(queryObject, property, this.schema.schemaMap[property]);
    this.setDefault(queryObject, property, this.schema.schemaMap[property]);
    this.populateQuery(queryObject, property, this.schema.schemaMap[property]);
    //Do we need async here
    await this.checkUniqueForReplace(property, this.schema.schemaMap[property], findObject)
    this.checkConstraints(property, this.schema.schemaMap[property])
  }
  return true;
}

async function validateUpdateAgainstSchema(queryObject: Record<string, any>) {
  this.checkDataFields(queryObject);
  for (const property of queryObject) {
    this.populateQuery(queryObject, property, this.schema.schemaMap[property]);
    //Do we need async here
    await this.checkUnique(property, this.schema.schemaMap[property])
    this.checkConstraints(property, this.schema.schemaMap[property])
  }
}

// For a given property checks if 'required' property is true. If required and property does not exist on query object throws an error.
function checkRequired(queryObject: Record<string, any>, propertyName: string, propertyOptions: optionsObject) {
  if (propertyOptions.required === true) {
    if (!Object.prototype.hasOwnProperty.call(queryObject, propertyName)) {
      throw new Error (`${propertyName} is Required by the Schema.`)
    }
  }
  return true;
}

// For a given property, if it does not exist on the query object, it will populate the original query object with that property and the default value specified.
function setDefault(queryObject: Record<string, any>, propertyName: string, propertyOptions: optionsObject) {
  if (!Object.prototype.hasOwnProperty.call(queryObject, propertyName)) {
    queryObject[propertyName] = propertyOptions.default;
  }
  return true;
}

// Populates a result object.
// Creates a new datatype using value of query object as input. Data type class is value of type on options object
// Run data type method of convertValue. Will set property of this.convertedValue if conversion possible. If not, it will set it to undefined
// Run data type method of  validateType. Will set property of this.valid to true if it's valid. If not, it will set this.valid to false
// Throw error if this.valid is false.
// Set a property on query object to populate. Call it this.queryObject = {}. 

// this.updatedQueryObject = {}
function populateQuery(queryObject: Record<string, any>, propertyName: string, propertyOptions: optionsObject) {
  const valueAsDatatype = new propertyOptions.type(queryObject[propertyName]);
  valueAsDatatype.convertType();
  valueAsDatatype.validateType();
  if (valueAsDatatype.isValid === false) {
    throw new Error('Data was not able to be translated to given specified schema data type.');
  }
  this.updatedQueryObject[propertyName] = valueAsDatatype.convertedValue;
}


// Runs a find one query if Unique property is set to true on schema. Will check each property set to true on the populated result document. Throw error if duplicate exists.
// Should ignore 'null' if that is the value.
async function checkUnique(propertyName: string, propertyOptions: optionsObject) {
  const queryObjectForUnique: Record<string, any> = {}
  queryObjectForUnique[propertyName] = this.updatedQueryObject[propertyName];
  if (propertyOptions.unique === true) {
    const propertyExists = await this.findOne(queryObjectForUnique);
    if (propertyExists !== undefined) {
      throw new Error('Property designated as unique in Schema already exists.');
    }
  }
  return true;
}

async function checkUniqueForReplace(propertyName: string, propertyOptions: optionsObject, findObject: Record<string, any>) {
  const queryObjectForUnique: Record<string, any> = {}
  queryObjectForUnique[propertyName] = this.updatedQueryObject[propertyName];
  if (propertyOptions.unique === true) {
    const originalPropertyValue = await this.findOne(findObject);
    const propertyExists = await this.findOne(queryObjectForUnique);
    if (propertyExists !== undefined && originalPropertyValue[propertyName] !== this.updatedQueryObject[propertyName]) {
      throw new Error('Property designated as unique in Schema already exists.');
    }
  }
  return true;
}


// Runs the convertedValue through a user specified callback function. If true, proceed with database modifications. If false, throw error.
// Need to check if this is set up correctly, has been moved.
function checkConstraints(propertyName: string, propertyOptions: optionsObject) {
  if (propertyOptions.validator === null) return true;
  if (typeof propertyOptions.validator !== 'function') {
    throw new Error('Callback given as validator in Schema is not a function.');
  }
  const isConstraintMet = propertyOptions.validator(this.updatedQueryObject[propertyName])
  if (isConstraintMet !== true) {
    throw new Error('Callback given as validator in Schema is violated.');
  }
  return true;
}

// Update functions will need some combination of these functions as well. Insert is more straight forward.