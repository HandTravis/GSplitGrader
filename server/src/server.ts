import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { submissionRouter } from "./submission.routes";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error(
        "ATLAS_URI env variable has not been defined in .env"
    );
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use("/submission", submissionRouter);
        // fire up server
        app.listen(5200, () => {
            console.log('Server running at http://localhost:5200...');
        });
    })
    .catch((error) => console.error(error));