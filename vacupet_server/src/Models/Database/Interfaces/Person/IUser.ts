import {IPerson} from "./IPerson";
import {IUserType} from "../IUserType";

export interface IUser extends IPerson {
    IsActive: boolean;
    FirebaseId: string;
    UpdatedAt: Date;
    CreatedAt: Date;
    UserType: IUserType;
    Owner?: IUser;
}
