import * as mongodb from "mongodb";
export interface Submission {
    name: String;
    img: mongodb.Binary; // double check correct type
    score: number;
    _id?: mongodb.ObjectId;
}