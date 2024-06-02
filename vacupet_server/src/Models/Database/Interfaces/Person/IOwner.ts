import {IPet} from "../IPet";
import {IUser} from "./IUser";

export interface IOwner {
    Id: string;
    Address: string
    User: IUser;
    Pets?: IPet[];
}
