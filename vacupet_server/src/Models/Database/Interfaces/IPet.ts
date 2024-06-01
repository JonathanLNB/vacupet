import {IAllergy} from "./IAllergy";
import {IOwner} from "./Person/IOwner";
import {IPetType} from "./IPetType";
import {IVaccinated} from "./IVaccinated";

export interface IPet {
    Id: string;
    Name: string;
    DateOfBirth: Date;
    Gender: boolean;
    Race: string;
    PetType: IPetType;
    Owner: IOwner;
    Allergies?: IAllergy[];
    Vaccinated?: IVaccinated[]
}
