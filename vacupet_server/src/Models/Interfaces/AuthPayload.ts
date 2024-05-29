import {User} from "../Database/Entities/Person/User";

export interface AuthPayload {
    iat: number;
    user: User;
    exp: number;
}

