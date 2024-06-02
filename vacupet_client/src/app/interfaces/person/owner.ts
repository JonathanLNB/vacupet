import {User} from "./user";
import {Pet} from "../pet";

export interface Owner {
    Id: string;
    Address: string
    User: User;
    Pets?: Pet[];
}
