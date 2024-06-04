import {IPet} from "./IPet";
import {IVaccine} from "./IVaccine";

export interface IVaccinated {
    Id: string;
    ApplicationDate: Date;
    NextApplicationDate: Date;
    Weight: number;
    Pet?: IPet;
    Vaccine: IVaccine;
}
