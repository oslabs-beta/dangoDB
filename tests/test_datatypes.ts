import {
  assertInstanceOf,
  assertStrictEquals,
  assertThrows,
  beforeEach,
  describe,
  it,
} from '../deps.ts';

import { 
  SchemaNumber, 
  SchemaDecimal128, 
  SchemaString, 
  SchemaBoolean, 
  SchemaObjectId, 
  SchemaUUID, 
  SchemaDate 
} from '../lib/datatypes.ts'

import {
  Bson
} from '../deps.ts'

describe('Schema Number', () => {
  let newObject: unknown
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaNumber();
      });
    });
  });
  describe('creating an instance of the class with a null input', () => {
    beforeEach(() => {
      newObject = new SchemaNumber(null)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaNumber)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaNumber) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to null', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, null);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a Bson Double input', () => {
    beforeEach(() => {
      newObject = new SchemaNumber(new Bson.Double(3.1415))
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaNumber)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaNumber) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Double', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.Double);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a non-string or number input', () => {
    beforeEach(() => {
      newObject = new SchemaNumber([5])
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaNumber)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaNumber) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to a Double. Value will be undefined', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input that cannot be cast to a number', () => {
    beforeEach(() => {
      newObject = new SchemaNumber('dangoDB')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaNumber)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaNumber) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to a Double. Value will be undefined', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input that can be cast to a number', () => {
    beforeEach(() => {
      newObject = new SchemaNumber('5')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaNumber)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaNumber) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Double', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.Double);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a number input', () => {
    beforeEach(() => {
      newObject = new SchemaNumber(5)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaNumber)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaNumber) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Double', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.Double);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
});

describe('Schema Decimal128', () => {
  let newObject: unknown
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaDecimal128();
      });
    });
  });
  describe('creating an instance of the class with a null input', () => {
    beforeEach(() => {
      newObject = new SchemaDecimal128(null)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDecimal128)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDecimal128) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to null', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, null);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a Decimal128 input', () => {
    beforeEach(() => {
      newObject = new SchemaDecimal128(new Bson.Decimal128('3.1415'))
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDecimal128)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDecimal128) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Double', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.Decimal128);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a non-string or number input', () => {
    beforeEach(() => {
      newObject = new SchemaDecimal128([5])
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDecimal128)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDecimal128) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to a Decimal128. Value will be undefined', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input that cannot be cast to a Decimal128', () => {
    beforeEach(() => {
      newObject = new SchemaDecimal128('dangoDB')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDecimal128)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDecimal128) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to a Decimal128. Value will be undefined', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input that can be cast to a Decimal128', () => {
    beforeEach(() => {
      newObject = new SchemaDecimal128('3.1415')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDecimal128)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDecimal128) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Decimal128', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.Decimal128);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a number input', () => {
    beforeEach(() => {
      newObject = new SchemaDecimal128(3.1415)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDecimal128)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDecimal128) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Decimal128', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.Decimal128);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaDecimal128) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
});

describe('Schema String', () => {
  let newObject: unknown
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaString();
      });
    });
  });
  describe('creating an instance of the class with a null input', () => {
    beforeEach(() => {
      newObject = new SchemaString(null)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaString)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaString) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to null', () => {
      if (newObject instanceof SchemaString) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, null);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaString) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a String object input', () => {
    beforeEach(() => {
      newObject = new SchemaString(new String('dangoDB'));
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaString)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaString) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a string', () => {
      if (newObject instanceof SchemaString) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, String);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaString) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a non-string or number or boolean input', () => {
    beforeEach(() => {
      newObject = new SchemaString(['dangoDB'])
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaString)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaString) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to a string. Value will be undefined', () => {
      if (newObject instanceof SchemaString) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaString) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input', () => {
    beforeEach(() => {
      newObject = new SchemaString('dangoDB')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaString)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaString) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a string', () => {
      if (newObject instanceof SchemaString) {
        newObject.convertType();
        assertStrictEquals(typeof newObject.convertedValue, 'string');
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaString) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a number input', () => {
    beforeEach(() => {
      newObject = new SchemaString(3.1415)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaString)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaString) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a string', () => {
      if (newObject instanceof SchemaString) {
        newObject.convertType();
        assertStrictEquals(typeof newObject.convertedValue, 'string');
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaString) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a boolean input', () => {
    beforeEach(() => {
      newObject = new SchemaString(true)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaString)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaString) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a string', () => {
      if (newObject instanceof SchemaString) {
        newObject.convertType();
        assertStrictEquals(typeof newObject.convertedValue, 'string');
      }
    });
    it('will cast the input and set property convertedValue to a value of "true"', () => {
      if (newObject instanceof SchemaString) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, 'true');
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaString) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
});

describe('Schema Boolean', () => {
  let newObject: unknown
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaBoolean();
      });
    });
  });
  describe('creating an instance of the class with a null input', () => {
    beforeEach(() => {
      newObject = new SchemaBoolean(null)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaBoolean)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaBoolean) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to null', () => {
      if (newObject instanceof SchemaBoolean) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, null);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaBoolean) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a Boolean object input', () => {
    beforeEach(() => {
      newObject = new SchemaBoolean(new Boolean(false));
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaBoolean)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaBoolean) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a boolean', () => {
      if (newObject instanceof SchemaBoolean) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Boolean);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaBoolean) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a non-string or number or boolean input', () => {
    beforeEach(() => {
      newObject = new SchemaBoolean([true])
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaBoolean)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaBoolean) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to a boolean. Value will be undefined', () => {
      if (newObject instanceof SchemaBoolean) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaBoolean) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input', () => {
    let newObject1: unknown;
    let newObject2: unknown;
    beforeEach(() => {
      newObject1 = new SchemaBoolean('true');
      newObject2 = new SchemaBoolean('false');
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject1, SchemaBoolean)
    });
    it('will have a convertType method', () => {
      if (newObject1 instanceof SchemaBoolean) {
        assertInstanceOf(newObject1.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a boolean of string value', () => {
      if (newObject1 instanceof SchemaBoolean) {
        newObject1.convertType();
        assertStrictEquals(typeof newObject1.convertedValue, 'boolean');
        assertStrictEquals(newObject1.convertedValue, true);
      }
      if (newObject2 instanceof SchemaBoolean) {
        newObject2.convertType();
        assertStrictEquals(typeof newObject2.convertedValue, 'boolean');
        assertStrictEquals(newObject2.convertedValue, false);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject1 instanceof SchemaBoolean) {
        newObject1.validateType();
        assertStrictEquals(newObject1.valid, false);
        newObject1.convertType()
        newObject1.validateType();
        assertStrictEquals(newObject1.valid, true);
      }
    });
  });
  describe('creating an instance of the class with number input', () => {
    let newObject1: unknown;
    let newObject2: unknown;
    beforeEach(() => {
      newObject1 = new SchemaBoolean(1);
      newObject2 = new SchemaBoolean(0);
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject1, SchemaBoolean)
    });
    it('will have a convertType method', () => {
      if (newObject1 instanceof SchemaBoolean) {
        assertInstanceOf(newObject1.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a boolean of number value (1 = true, 0 = false)', () => {
      if (newObject1 instanceof SchemaBoolean) {
        newObject1.convertType();
        assertStrictEquals(typeof newObject1.convertedValue, 'boolean');
        assertStrictEquals(newObject1.convertedValue, true);
      }
      if (newObject2 instanceof SchemaBoolean) {
        newObject2.convertType();
        assertStrictEquals(typeof newObject2.convertedValue, 'boolean');
        assertStrictEquals(newObject2.convertedValue, false);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject1 instanceof SchemaBoolean) {
        newObject1.validateType();
        assertStrictEquals(newObject1.valid, false);
        newObject1.convertType()
        newObject1.validateType();
        assertStrictEquals(newObject1.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a boolean input', () => {
    beforeEach(() => {
      newObject = new SchemaBoolean(true)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaBoolean)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaBoolean) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a boolean', () => {
      if (newObject instanceof SchemaBoolean) {
        newObject.convertType();
        assertStrictEquals(typeof newObject.convertedValue, 'boolean');
        assertStrictEquals(newObject.convertedValue, true);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaBoolean) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
});

describe('Schema ObjectId', () => {
  let newObject: unknown
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaObjectId();
      });
    });
  });
  describe('creating an instance of the class with a null input', () => {
    beforeEach(() => {
      newObject = new SchemaObjectId(null)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaObjectId)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaObjectId) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to null', () => {
      if (newObject instanceof SchemaObjectId) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, null);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaObjectId) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a ObjectId input', () => {
    beforeEach(() => {
      newObject = new SchemaObjectId(new Bson.ObjectId('62743a2d6e85141671a45ea7'));
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaObjectId)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaObjectId) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to an ObjectId', () => {
      if (newObject instanceof SchemaObjectId) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.ObjectId);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaObjectId) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an invalid ObjectId', () => {
    beforeEach(() => {
      newObject = new SchemaObjectId('dangoDB')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaObjectId)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaObjectId) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to an ObjectId. Value will be undefined', () => {
      if (newObject instanceof SchemaObjectId) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaObjectId) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input that can be cast to an ObjectId', () => {
    beforeEach(() => {
      newObject = new SchemaObjectId('62743a2d6e85141671a45ea7')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaObjectId)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaObjectId) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be able to cast the input and set property convertedValue to an ObjectId', () => {
      if (newObject instanceof SchemaObjectId) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.ObjectId);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaObjectId) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
});

describe('Schema UUID', () => {
  let newObject: unknown
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaUUID();
      });
    });
  });
  describe('creating an instance of the class with a null input', () => {
    beforeEach(() => {
      newObject = new SchemaUUID(null)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaUUID)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaUUID) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to null', () => {
      if (newObject instanceof SchemaUUID) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, null);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaUUID) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a UUID input', () => {
    beforeEach(() => {
      newObject = new SchemaUUID(new Bson.UUID());
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaUUID)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaUUID) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to an UUID', () => {
      if (newObject instanceof SchemaUUID) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.UUID);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaUUID) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an invalid UUID', () => {
    beforeEach(() => {
      newObject = new SchemaUUID('dangoDB')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaUUID)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaUUID) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to an UUID. Value will be undefined', () => {
      if (newObject instanceof SchemaUUID) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaUUID) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input that can be cast to a UUID', () => {
    let validUUID!: string
    beforeEach(() => {
      validUUID = new Bson.UUID().toString();
      newObject = new SchemaUUID(validUUID)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaUUID)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaUUID) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be able to cast the input and set property convertedValue to an UUID', () => {
      if (newObject instanceof SchemaUUID) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Bson.UUID);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaUUID) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
});

describe('Schema Date', () => {
  let newObject: unknown
  describe('creating an instance of the class with no input', () => {
    it('will throw an error', () => {
      assertThrows(() => {
        //@ts-ignore Ignore TS warning to run test
        newObject = new SchemaDate();
      });
    });
  });
  describe('creating an instance of the class with a null input', () => {
    beforeEach(() => {
      newObject = new SchemaDate(null)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDate)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDate) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to null', () => {
      if (newObject instanceof SchemaDate) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, null);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaNumber) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a Date object input', () => {
    beforeEach(() => {
      newObject = new SchemaDate(new Date())
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDate)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDate) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Date', () => {
      if (newObject instanceof SchemaDate) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Date);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaDate) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a non-string or number input', () => {
    beforeEach(() => {
      newObject = new SchemaDate([5])
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDate)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDate) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to a Date. Value will be undefined', () => {
      if (newObject instanceof SchemaDate) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaDate) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input that cannot be cast to a date', () => {
    beforeEach(() => {
      newObject = new SchemaDate('dangoDB')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDate)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDate) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will be unable cast the input and set property convertedValue to a Date. Value will be undefined', () => {
      if (newObject instanceof SchemaDate) {
        newObject.convertType();
        assertStrictEquals(newObject.convertedValue, undefined);
      }
    });
    it('will set property valid to false after invoking validateType', () => {
      if (newObject instanceof SchemaDate) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
      }
    });
  });
  describe('creating an instance of the class with string input that can be cast to a date', () => {
    beforeEach(() => {
      newObject = new SchemaDate('1991-03-15')
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDate)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDate) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Dated', () => {
      if (newObject instanceof SchemaDate) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Date);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaDate) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
  describe('creating an instance of the class with a number input', () => {
    beforeEach(() => {
      newObject = new SchemaDate(668995200000)
    });
    it('will create an instance of the class', () => {
      assertInstanceOf(newObject, SchemaDate)
    });
    it('will have a convertType method', () => {
      if (newObject instanceof SchemaDate) {
        assertInstanceOf(newObject.convertType, Function);
      }
    });
    it('will cast the input and set property convertedValue to a Date', () => {
      if (newObject instanceof SchemaDate) {
        newObject.convertType();
        assertInstanceOf(newObject.convertedValue, Date);
      }
    });
    it('will set property valid to true after invoking validateType', () => {
      if (newObject instanceof SchemaDate) {
        newObject.validateType();
        assertStrictEquals(newObject.valid, false);
        newObject.convertType()
        newObject.validateType();
        assertStrictEquals(newObject.valid, true);
      }
    });
  });
});