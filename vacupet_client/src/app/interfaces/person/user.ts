import {UserType} from "../user-type";
import {Person} from "./person";
import {Owner} from "./owner";

export interface User extends Person {
    IsActive: boolean;
    FirebaseId?: string;
    Password?: string;
    UpdatedAt?: Date;
    CreatedAt?: Date;
    UserType: UserType;
    Owner?: Owner;
}
