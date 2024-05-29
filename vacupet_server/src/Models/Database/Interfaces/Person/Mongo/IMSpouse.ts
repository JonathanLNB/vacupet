import mongoose from "mongoose";

export interface IMSpouse extends mongoose.Document {
    Firstname: string;
    Middlename: string;
    Lastname: string;
    SSN_ITIN: string;
    Occupation: string;
    DateOfBirth: Date;
}
