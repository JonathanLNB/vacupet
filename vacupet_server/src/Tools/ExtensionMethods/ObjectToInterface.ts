import {ISetting} from "../../Models/Database/Interfaces/ISetting";
import {Setting} from "../../Models/Database/Entities/Setting";
import {User} from "../../Models/Database/Entities/Person/User";
import {FirebaseUser} from "../../Models/Interfaces/FirebaseUser";
import {IUser} from "../../Models/Database/Interfaces/Person/IUser";
import {UserType} from "../../Models/Database/Entities/UserType";
import {IUserType} from "../../Models/Database/Interfaces/IUserType";
import {IAllergy} from "../../Models/Database/Interfaces/IAllergy";
import {Allergy} from "../../Models/Database/Entities/Allergy";
import {PetType} from "../../Models/Database/Entities/PetType";
import {IPetType} from "../../Models/Database/Interfaces/IPetType";
import {Vaccine} from "../../Models/Database/Entities/Vaccine";
import {IVaccine} from "../../Models/Database/Interfaces/IVaccine";
import {Owner} from "../../Models/Database/Entities/Person/Owner";
import {IOwner} from "../../Models/Database/Interfaces/Person/IOwner";
import {Pet} from "../../Models/Database/Entities/Pet";
import {IPet} from "../../Models/Database/Interfaces/IPet";
import {Vaccinated} from "../../Models/Database/Entities/Vaccinated";
import {IVaccinated} from "../../Models/Database/Interfaces/IVaccinated";

export class ObjectToInterface {
    public static ToAllergy(allergy: Allergy): IAllergy {
        return {
            Id: allergy.Id,
            Name: allergy.Name,
            Description: allergy.Description
        };
    }

    public static ToVaccine(vaccine: Vaccine): IVaccine {
        return {
            Id: vaccine.Id,
            Name: vaccine.Name,
            Description: vaccine.Description
        };
    }

    public static ToPetType(petType: PetType): IPetType {
        return {
            Id: petType.Id,
            Name: petType.Name,
        };
    }

    public static ToUserType(userType: UserType): IUserType {
        return {
            Id: userType.Id,
            Name: userType.Name
        };
    }

    public static ToSetting(setting: Setting): ISetting {
        return {
            Id: setting.Id,
            Name: setting.Name,
            Description: setting.Description,
            Value: setting.Value
        };
    }

    public static ToUser(user: User): IUser {
        return {
            Id: user.Id,
            Firstname: user.Firstname,
            Middlename: user.Middlename,
            Lastname: user.Lastname,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            IsActive: user.IsActive,
            CreatedAt: user.CreatedAt,
            UpdatedAt: user.UpdatedAt,
            DateOfBirth: user.DateOfBirth,
            FirebaseId: user.FirebaseId,
            UserType: user.UserType ? this.ToUserType(user.UserType) : null,
        };
    }

    public static ToOwner(owner: Owner): IOwner {
        const ownerO: IOwner = {
            Id: owner.Id,
            Address: owner.Address,
            User: owner.User ? this.ToUser(owner.User) : null
        };
        if (owner.Pets && owner.Pets.length > 0) ownerO.Pets = owner.Pets.map(pet => this.ToPet(pet));
        else ownerO.Pets = [];
        return ownerO;
    }

    public static ToFirebaseUser(user: User, password?: string): FirebaseUser {
        let firebaseUser: FirebaseUser = {
            Email: user.Email,
            Disabled: false,
            Name: user.Firstname + " " + user.Middlename,
            LastName: user.Lastname,
            PhoneNumber: user.PhoneNumber,
        };

        if (user.FirebaseId)
            firebaseUser.Uid = user.FirebaseId

        if (password)
            firebaseUser.Password = password;

        return firebaseUser;
    }

    public static ToPet(pet: Pet): IPet {
        const petO: IPet = {
            Id: pet.Id,
            Name: pet.Name,
            DateOfBirth: pet.DateOfBirth,
            PetType: pet.PetType ? this.ToPetType(pet.PetType) : null,
            Owner: pet.Owner ? this.ToOwner(pet.Owner) : null,
        };
        if (pet.Allergies && pet.Allergies.length > 0)
            petO.Allergies = pet.Allergies.map(option => this.ToAllergy(option));
        else
            petO.Allergies = [];
        if (pet.Vaccinated && pet.Vaccinated.length > 0)
            petO.Vaccinated = pet.Vaccinated.map(option => this.ToVaccinated(option));
        else
            petO.Vaccinated = [];
        return petO
    }

    public static ToVaccinated(vaccinated: Vaccinated): IVaccinated {
        const vaccinatedO: IVaccinated = {
            Id: vaccinated.Id,
            ApplicationDate: vaccinated.ApplicationDate,
            Vaccine: vaccinated.Vaccine ? this.ToVaccine(vaccinated.Vaccine) : null
        };
        return vaccinatedO;
    }
}
