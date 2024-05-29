import {IMRelation} from "./IMRelation";
import mongoose from "mongoose";

export interface IMDependent extends mongoose.Document {
    Firstname: string;
    Middlename: string;
    Lastname: string;
    SSN_ITIN: string;
    Occupation: string;
    DateOfBirth: Date;
    Relation: IMRelation;
}
