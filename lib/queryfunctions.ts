// deno-lint-ignore-file no-explicit-any

import { optionsObject } from './schema.ts'

function checkDataFields(queryObject: Record<string, any>) {
  for (const property in queryObject) {
    if (Object.prototype.hasOwnProperty.call(this.schema.schemaMap, property) {
      throw new Error ('Requested query object contains properties not present in the Schema.')
    }
  }
  return;
}

function checkRequired(property: null | Record<string, any>, propertyName: string, propertyOptions: optionsObject) {
  if (propertyOptions.required === true) {
    if (property === null) {
      throw new Error (`${propertyName} is Required by the Schema.`)
    }
  }
  return true;
}

function setDefault(queryObject: Record<string, any>, propertyName: string, propertyOptions: optionsObject) {
  if (!Object.prototype.hasOwnProperty.call(queryObject, propertyName)) {
    queryObject[propertyName] = propertyOptions.default;
  }
  return true;
}

populateQuery()


checkUnique() {

}

checkConstraints(callback: ((arg: any) => boolean)): boolean {
  if (typeof callback !== 'function') return false;
  return callback(this.value)
}

validateAgainstSchema() {

}