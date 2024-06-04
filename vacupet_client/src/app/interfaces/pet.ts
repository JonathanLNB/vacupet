import {Allergy} from "./allergy";
import {Owner} from "./person/owner";
import {PetType} from "./pet-type";
import {Vaccinated} from "./vaccinated";

export interface Pet {
  Id?: string;
  Name?: string;
  DateOfBirth?: Date;
  DateOfBirthS?: string;
  Gender: boolean;
  Race?: string;
  PetType?: PetType;
  Owner?: Owner;
  Allergies?: Allergy[];
  Vaccinated?: Vaccinated[]
}
