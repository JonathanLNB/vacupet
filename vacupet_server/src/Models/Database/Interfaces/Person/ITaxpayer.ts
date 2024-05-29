import {IPerson} from "./IPerson";

export interface ITaxpayer extends IPerson {
    ProSeriesID: string
    Status: boolean;
    Email: string;
    PhoneNumber: string;
    Notes: string;
    Checklist?: any[];
}
