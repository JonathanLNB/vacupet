import {IPet} from "./IPet";
import {IVaccine} from "./IVaccine";

export interface IVaccinated {
    Id: string;
    ApplicationDate: Date;
    Pet?: IPet;
    Vaccine: IVaccine;
}
