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