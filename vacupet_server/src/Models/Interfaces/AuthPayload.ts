import {IUser} from "../Database/Interfaces/Person/IUser";

export interface AuthPayload {
    iat: number;
    user: IUser;
    exp: number;
}

