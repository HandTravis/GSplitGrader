import * as mongodb from "mongodb";
import { Submission } from "./submission";

export const collections: {
    submissions?: mongodb.Collection<Submission>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("GSplitCluster2");
    await applySchemaValidation(db);

    const submissionsCollection = db.collection<Submission>("submissions");
    collections.submissions = submissionsCollection;
}


async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "img", "score"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                img: {
                    bsonType: "string",
                    description: "'img' is required and is a jpg",
                    minLength: 5
                },
                score: {
                    bsonType: "number",
                    description: "'score' is provided after your submission is graded",
                    enum: ["junior", "mid", "senior"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "submissions",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("submissions", {validator: jsonSchema});
        }
    });
}
