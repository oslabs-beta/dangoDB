/**
 * @description Dependency file imports dependencies for use by local modules.
 * To add additional dependencies, add an export statement.
 */

export {
  MongoClient,
  Database,
  Collection,
  Bson
} from "https://deno.land/x/mongo@v0.29.4/mod.ts";

export type {
  CountOptions,
  InsertOptions,
  UpdateOptions,
  FindAndModifyOptions,
  DropOptions,
  AggregateOptions,
  FindOptions,
  DeleteOptions,
} from 'https://deno.land/x/mongo@v0.29.4/src/types.ts';

export {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  it,
} from 'https://deno.land/std@0.138.0/testing/bdd.ts';

export {
  assert,
  assertAlmostEquals,
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertFalse,
  assertInstanceOf,
  assertIsError,
  assertMatch,
  assertNotEquals,
  assertNotMatch,
  assertNotStrictEquals,
  assertObjectMatch,
  assertRejects,
  assertStrictEquals,
  assertStringIncludes,
  assertThrows,
  equal,
  fail,
  unimplemented,
  unreachable,
} from 'https://deno.land/std@0.138.0/testing/asserts.ts';

export { load } from "https://deno.land/std/dotenv/mod.ts";