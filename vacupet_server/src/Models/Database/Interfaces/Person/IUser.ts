import {IPerson} from "./IPerson";
import {IUserType} from "../IUserType";
import {IOwner} from "./IOwner";

export interface IUser extends IPerson {
    IsActive: boolean;
    FirebaseId: string;
    UpdatedAt: Date;
    CreatedAt: Date;
    UserType: IUserType;
    Owner?: IOwner;
}
