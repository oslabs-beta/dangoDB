// deno-lint-ignore-file no-explicit-any


/**
 * 
 * @description This file defines valid data types and associated methods
 * 
 */

import { Bson } from '../deps.ts';


export class SchemaNumber {

  public value: any; 
  public valid: boolean | undefined;
  public convertedValue: number | Bson.Double | null | undefined;  

  constructor(value: any) {
    if (value === undefined) {
      throw new Error('A value is required.')
    }
    this.value = value;
    this.convertedValue;
    this.valid
  }  

  convertType() {
    if (this.value === null) {
      this.convertedValue = this.value;
    }

    else if (typeof this.value === 'object') {
      if (this.value instanceof Bson.Double) {
        this.convertedValue = this.value;
      }
    }
    
    else if (typeof this.value !== 'number' && typeof this.value !== 'string') {
      return;
    }
    
    else if (typeof this.value === 'string') {
      const stringNum: number = parseFloat(this.value);
      if (isNaN(stringNum)) {
        return;
      }
      const bsonNumber = new Bson.Double(stringNum);
      this.convertedValue = bsonNumber;
    }  

    else if (typeof this.value === 'number') {
      const bsonNumber = new Bson.Double(this.value);
      this.convertedValue = bsonNumber;
    }

    return this.convertedValue;
  }

  validateType() {
    this.valid = this.convertedValue === undefined ? false : true;
    return this.valid;
  }
}

export class SchemaDecimal128 {

  public value: any; 
  public valid: boolean | undefined;
  public convertedValue: number | Bson.Decimal128 | null | undefined;  

  constructor(value: any) {
    if (value === undefined) {
      throw new Error('A value is required.')
    }
    this.value = value;
    this.convertedValue;
    this.valid
  }  

  convertType() {
    if (this.value === null) {
      this.convertedValue = this.value;
    }

    else if (typeof this.value === 'object') {
      if (this.value instanceof Bson.Decimal128) {
        this.convertedValue = this.value;
      }
    }
    
    else if (typeof this.value !== 'number' && typeof this.value !== 'string') {
      return;
    }
    
    else if (typeof this.value === 'string') {
      const stringNum: number = parseFloat(this.value);
      if (isNaN(stringNum)) {
        return;
      }
      const decimal128Number = new Bson.Decimal128(this.value);
      this.convertedValue = decimal128Number;
    }  

    else if (typeof this.value === 'number') {
      const decimal128Number = new Bson.Decimal128(this.value.toString());
      this.convertedValue = decimal128Number;
    }

    return this.convertedValue;
  }

  validateType() {
    this.valid = this.convertedValue === undefined ? false : true;
    return this.valid;
  }
}

export class SchemaString {

  public value: any; 
  public valid: boolean | undefined;
  public convertedValue: string | String | null | undefined;  

  constructor(value: any) {
    if (value === undefined) {
      throw new Error('A value is required.')
    }
    this.value = value;
    this.convertedValue;
    this.valid
  }  

  convertType() {
    if (this.value === null) {
      this.convertedValue = this.value;
    }

    else if (typeof this.value === 'object') {
      if (this.value instanceof String) {
        this.convertedValue = this.value;
      }
    }
    
    else if (typeof this.value !== 'number' && typeof this.value !== 'string' && typeof this.value !== 'boolean') {
      return;
    }
    
    else if (typeof this.value === 'string') {
      this.convertedValue = this.value;
    }  

    else if (typeof this.value === 'number') {
      this.convertedValue = this.value.toString();
    }

    else if (typeof this.value === 'boolean') {
      this.convertedValue = this.value ? 'true' : 'false';
    }

    return this.convertedValue;
  }

  validateType() {
    this.valid = this.convertedValue === undefined ? false : true;
    return this.valid;
  }
}

export class SchemaBoolean {

  public value: any; 
  public valid: boolean | undefined;
  public convertedValue: boolean | Boolean | null | undefined;  

  constructor(value: number | string | boolean) {
    if (value === undefined) {
      throw new Error('A value is required.')
    }
    this.value = value;
    this.convertedValue;
    this.valid
  }  

  convertType() {
    if (this.value === null) {
      this.convertedValue = this.value;
    }

    else if (typeof this.value === 'object') {
      if (this.value instanceof Boolean) {
        this.convertedValue = this.value;
      }
    }
    
    else if (typeof this.value !== 'number' && typeof this.value !== 'string' && typeof this.value !== 'boolean') {
      return;
    }
    
    else if (typeof this.value === 'string') {
      if (this.value === 'true') this.convertedValue = true;
      else if (this.value === 'false') this.convertedValue = false;
    }  

    else if (typeof this.value === 'number') {
      if (this.value === 1) this.convertedValue = true;
      else if (this.value === 0) this.convertedValue = false;
    }

    else if (typeof this.value === 'boolean') {
      if (this.value) this.convertedValue = true;
      else if (!this.value) this.convertedValue = false;
    }

    return this.convertedValue;
  }

  validateType() {
    this.valid = this.convertedValue === undefined ? false : true;
    return this.valid;
  }
}

export class SchemaObjectId {

  public value: any; 
  public valid: boolean | undefined;
  public convertedValue: Bson.ObjectId | null | undefined;  

  constructor(value: any) {
    if (value === undefined) {
      throw new Error('A value is required.')
    }
    this.value = value;
    this.convertedValue;
    this.valid
  }  

  convertType() {
    if (this.value === null) {
      this.convertedValue = this.value;
    }

    else if (typeof this.value === 'object') {
      if (this.value instanceof Bson.ObjectId) {
        this.convertedValue = this.value;
      }
    }
    
    else if (Bson.ObjectId.isValid(this.value)) {
      //TODO
      this.convertedValue = new Bson.ObjectId(this.value);
    }

    return this.convertedValue;
  }

  validateType() {
    this.valid = this.convertedValue === undefined ? false : true;
    return this.valid;
  }
}

export class SchemaUUID {

  public value: any; 
  public valid: boolean | undefined;
  public convertedValue: Bson.UUID | null | undefined;  

  constructor(value: any) {
    if (value === undefined) {
      throw new Error('A value is required.')
    }
    this.value = value;
    this.convertedValue;
    this.valid
  }  

  convertType() {
    if (this.value === null) {
      this.convertedValue = this.value;
    }

    else if (typeof this.value === 'object') {
      if (this.value instanceof Bson.UUID) {
        this.convertedValue = this.value;
      }
    }
    
    else if (Bson.UUID.isValid(this.value)) {
      this.convertedValue = new Bson.UUID(this.value);
    }

    return this.convertedValue;
  }

  validateType() {
    this.valid = this.convertedValue === undefined ? false : true;
    return this.valid;
  }
}

export class SchemaDate {

  public value: any; 
  public valid: boolean | undefined;
  public convertedValue: Date | null | undefined;  

  constructor(value: any) {
    if (value === undefined) {
      throw new Error('A value is required.')
    }
    this.value = value;
    this.convertedValue;
    this.valid
  }  

  convertType() {
    if (this.value === null) {
      this.convertedValue = this.value;
    }

    else if (typeof this.value === 'object') {
      if (this.value instanceof Date) {
        this.convertedValue = this.value;
      }
    }
    
    else if (typeof this.value !== 'number' && typeof this.value !== 'string') {
      return;
    }
    
    else if (typeof this.value === 'string') {
      const convertedDate: number | Date = Date.parse(this.value)
      if (typeof convertedDate === 'number') {
        if (isNaN(convertedDate)) {
          return;
        }
      }
      else this.convertedValue = convertedDate;
    }
    
    else if (typeof this.value === 'number') {
      const convertedDate: number | Date = Date.parse(this.value.toString())
      if (typeof convertedDate === 'number') {
        if (isNaN(convertedDate)) {
          return;
        }
      }
      else this.convertedValue = convertedDate;
    }

    return this.convertedValue;
  }

  validateType() {
    this.valid = this.convertedValue === undefined ? false : true;
    return this.valid;
  }
}

// let newdec = new Bson.Decimal128('15.5135');
// console.log(newdec);

// let newdouble = new Bson.Double(parseFloat('test'));
// console.log(newdouble.valueOf());

// function func(num: number | string): boolean {
//     if (typeof num === 'number')
//         return num % 2 === 0
//     else return false;
// }

// const num = new SchemaNumber('test');
// console.log(num.validateType());
// console.log(num.validateConstraints(func))
// console.log(num.validateType() instanceof Bson.Double)

// const id = Bson.ObjectId.isValid('test');
// console.log(id);