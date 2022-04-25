/**
 * @description Dependency file imports dependencies for use by local modules.
 * To add additional dependencies, add an export statement.
 */

 export {
    MongoClient,
    Database,
    Collection
} from "https://deno.land/x/mongo@v0.29.4/mod.ts";