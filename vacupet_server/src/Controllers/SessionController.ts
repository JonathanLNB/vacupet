import {UserRepository} from "../Database/Repositories/Person/UserRepository";
import {DataSource} from "typeorm";
import {IUser} from "../Models/Database/Interfaces/Person/IUser";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {Logger} from "logger-colors";

export class SessionController {
    private logger: Logger;
    private _userRepository: UserRepository;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._userRepository = new UserRepository(dataSource);
    }

    public async Login(firebaseID: string): Promise<IUser> {
        try {
            let user = await this._userRepository.getUserByFirebase(firebaseID, {
                    UserType: true,
                },
            );
            if (user) {
                return ObjectToInterface.ToUser(user);
            }
            return null;
        } catch (e) {
            this.logger.error("Error while login a user", e);
            throw new Error(e);
        }
    }
}
