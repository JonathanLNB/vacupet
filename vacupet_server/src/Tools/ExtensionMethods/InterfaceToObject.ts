import {IOwner} from "../../Models/Database/Interfaces/Person/IOwner";
import {Owner} from "../../Models/Database/Entities/Person/Owner";
import {IUser} from "../../Models/Database/Interfaces/Person/IUser";
import {User} from "../../Models/Database/Entities/Person/User";
import {ISetting} from "../../Models/Database/Interfaces/ISetting";
import {Setting} from "../../Models/Database/Entities/Setting";
import {Allergy} from "../../Models/Database/Entities/Allergy";
import {IAllergy} from "../../Models/Database/Interfaces/IAllergy";
import {PetType} from "../../Models/Database/Entities/PetType";
import {IPetType} from "../../Models/Database/Interfaces/IPetType";
import {Vaccine} from "../../Models/Database/Entities/Vaccine";
import {IVaccine} from "../../Models/Database/Interfaces/IVaccine";
import {Vaccinated} from "../../Models/Database/Entities/Vaccinated";
import {IVaccinated} from "../../Models/Database/Interfaces/IVaccinated";
import {Pet} from "../../Models/Database/Entities/Pet";
import {IPet} from "../../Models/Database/Interfaces/IPet";

export class InterfaceToObject {
    public static ToAllergy(iAllergy: IAllergy): Allergy {
        const allergy = new Allergy()
        if (iAllergy.Id)
            allergy.Id = iAllergy.Id;
        allergy.Name = iAllergy.Name;
        allergy.Description = iAllergy.Description;
        return allergy;
    }

    public static ToPetType(iPetType: IPetType): PetType {
        const petType = new PetType()
        if (iPetType.Id)
            petType.Id = iPetType.Id;
        petType.Name = iPetType.Name;
        return petType;
    }

    public static ToVaccine(iVaccine: IVaccine): Vaccine {
        const vaccine = new Vaccine()
        if (iVaccine.Id)
            vaccine.Id = iVaccine.Id;
        vaccine.Name = iVaccine.Name;
        vaccine.Description = iVaccine.Description;
        return vaccine;
    }

    public static ToSetting(iSetting: ISetting): Setting {
        const setting = new Setting()
        if (iSetting.Id)
            setting.Id = iSetting.Id;
        setting.Name = iSetting.Name;
        setting.Description = iSetting.Description;
        setting.Value = iSetting.Value;
        return setting;
    }

    public static ToUser(iUser: IUser): User {
        const owner = new User()
        if (iUser.Id)
            owner.Id = iUser.Id;
        owner.Firstname = iUser.Firstname;
        owner.Middlename = iUser.Middlename;
        owner.Lastname = iUser.Lastname;
        owner.Email = iUser.Email;
        owner.PhoneNumber = iUser.PhoneNumber;
        owner.DateOfBirth = iUser.DateOfBirth;
        owner.FirebaseId = iUser.FirebaseId;
        return owner;
    }

    public static ToOwner(iOwner: IOwner): Owner {
        const owner = new Owner()
        if (iOwner.Id)
            owner.Id = iOwner.Id;
        owner.User = this.ToUser(iOwner.User);
        owner.Address = iOwner.Address;
        return owner;
    }

    public static ToOwnerPets(iOwner: IOwner): Owner {
        const owner = this.ToOwner(iOwner);
        const pets: Pet[] = [];
        iOwner.Pets.forEach(pet => {
            pets.push(this.ToPet(pet));
        })
        owner.Pets = pets;
        return owner;
    }

    public static ToPet(iPet: IPet): Pet {
        const pet = new Pet()
        const allergies: Allergy[] = [];
        const vaccines: Vaccinated[] = [];
        if (iPet.Id)
            pet.Id = iPet.Id;
        pet.Name = iPet.Name;
        pet.DateOfBirth = iPet.DateOfBirth;
        pet.Gender = iPet.Gender;
        pet.Race = iPet.Race;
        pet.PetType = this.ToPetType(iPet.PetType)
        pet.Owner = this.ToOwner(iPet.Owner);
        iPet.Allergies.forEach(allergy => {
            allergies.push(this.ToAllergy(allergy))
        });
        iPet.Vaccinated.forEach(vaccinated => {
            vaccines.push(this.ToVaccinated(vaccinated))
        });
        pet.Allergies = allergies;
        pet.Vaccinated = vaccines;
        return pet;
    }

    public static ToVaccinated(iVaccinated: IVaccinated): Vaccinated {
        const vaccinated = new Vaccinated()
        if (iVaccinated.Id)
            vaccinated.Id = iVaccinated.Id;
        vaccinated.ApplicationDate = iVaccinated.ApplicationDate;
        vaccinated.Pet = this.ToPet(iVaccinated.Pet);
        vaccinated.Vaccine = this.ToVaccine(iVaccinated.Vaccine);
        return vaccinated;
    }
}
