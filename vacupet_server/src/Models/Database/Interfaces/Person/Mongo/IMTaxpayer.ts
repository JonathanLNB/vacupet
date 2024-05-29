import mongoose from "mongoose";

export interface IMTaxpayer extends mongoose.Document {
    IdTaxpayer: string;
    Firstname: string;
    Middlename: string;
    Lastname: string;
    SSN_ITIN: string;
    Occupation: string;
    DateOfBirth: Date;
    Email: string;
    PhoneNumber: string;
}
