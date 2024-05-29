import {UserRepository} from "../Database/Repositories/UserRepository";
import {DataSource} from "typeorm";
import {IUser} from "../Models/Database/Interfaces/IUser";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";

export class SessionController {
    private _userRepository: UserRepository;

    constructor(dataSource: DataSource) {
        this._userRepository = new UserRepository(dataSource);
    }

    public async Login(firebaseID: string): Promise<IUser> {
        let user = await this._userRepository.getUserByFirebase(firebaseID, {
                UserType: true,
            },
        );
        if (user) {
            return ObjectToInterface.ToUser(user);
        }
        return null;
    }
}
