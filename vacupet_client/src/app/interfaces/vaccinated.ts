import {Pet} from "./pet";
import {Vaccine} from "./vaccine";

export interface Vaccinated {
    Id: string;
    ApplicationDate: Date;
    NextApplicationDate: Date;
    Weight: number;
    Pet?: Pet;
    Vaccine: Vaccine;
}
