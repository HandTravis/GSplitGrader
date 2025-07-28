import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";
import { Request, Response } from "express";
import fs from 'fs/promises';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

export const submissionRouter = express.Router();

const { ROBOFLOW_URI } = process.env;

submissionRouter.use(express.json());
submissionRouter.get("/", async (req, res) => {
    try {
        const submissions = await collections.submissions?.find({}).toArray();
        if (submissions) {
            res.status(200).send(submissions);
        } else {
            res.status(404).send("No submissions found");
        }
    } catch (error) {
        res.status(500).send(error instanceof Error? error.message : "An unknown error occurred");
    }
});

submissionRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params.id;
        const query = { _id: new ObjectId(id) };
        const submission = await 
    collections?.submissions?.findOne(query);
        if (submission) {
            res.status(200).send(submission);
        } else {
            res.status(404).send(`Submission with id ${id} not found`);
        }
    } catch (error) {
        res.status(404).send('Failed to find submission');
    }
});

// submissionRouter.post("/", async (req, res) => {
//     try {
//         const newSubmission = req.body;
//         const result = await collections?.submissions?.insertOne(newSubmission);
//         if (result?.acknowledged) {
//             res.status(201).send(`New submission created with id ${result.insertedId}`);
//         } else {
//             res.status(500).send("Failed to create new submission");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(400).send(error instanceof Error ? error.message : "An unknown error occurred");
//     }
// });

submissionRouter.post("/upload", async (req: Request, res: Response) => {
    try {
      const base64Image = req.body.image;
      if (!base64Image) {
        return res.status(400).send("No image data provided");
      }
  
      const response = await fetch('https://serverless.roboflow.com/infer/workflows/travis-hand/detect-and-classify-2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.ROBOFLOW_URI,
          inputs: {
            image: { type: 'base64', value: base64Image }
          }
        })
      });
  
      const result = await response.json();
  
      const dbResult = await collections?.submissions?.insertOne(result);
      if (dbResult?.acknowledged) {
        return res.status(201).send({
          message: "Submission successful",
          submissionId: dbResult.insertedId,
          inference: result,
        });
      } else {
        return res.status(500).send("Failed to create new submission");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to process image");
    }
  });
  

submissionRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params.id;
        const query = { _id: new ObjectId(id) };
        const updatedSubmission = req.body;
        const result = await collections?.submissions?.updateOne(query, { $set: updatedSubmission });
        if (result && result.matchedCount) {
            res.status(200).send(`Submission with id ${id} updated`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Submission with id ${id} not found`);
        } else {
            res.status(304).send(`Failed to update submission with id ${id}`);
        }
    } catch (error) {
        console.error(error)
        res.status(400).send(error instanceof Error ? error.message : "An unknown error occurred");
    }
});

submissionRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.submissions?.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Submission with id ${id} deleted`);
        } else if (!result) {
            res.status(400).send("Failed to delete submission");
        } else if (!result?.deletedCount) {
            res.status(404).send(`Submission with id ${id} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "An unknown error occurred");
    }
});