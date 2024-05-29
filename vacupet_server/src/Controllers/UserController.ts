import {DataSource} from "typeorm";
import {UserRepository} from "../Database/Repositories/UserRepository";
import {FirebaseRepository} from "../Database/Repositories/FirebaseRepository";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {IUser} from "../Models/Database/Interfaces/IUser";
import {User} from "../Models/Database/Entities/Person/User";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {InterfaceToObject} from "../Tools/ExtensionMethods/InterfaceToObject";

export class UserController {

    _dataSource: DataSource;
    _userRepository: UserRepository;
    _firebaseService: FirebaseRepository

    constructor(dataSource: DataSource) {
        this._userRepository = new UserRepository(dataSource);//initialize the repository
        this._firebaseService = new FirebaseRepository();
    }

    public async createUser(user: User, password: string): Promise<GenericResponse> {
        try {
            let firebaseUser = await this._firebaseService.addUser(ObjectToInterface.ToFirebaseUser(user, password));
            user.FirebaseId = firebaseUser.Uid;
            if (firebaseUser.Success) {
                let newUser = await this._userRepository.createUpdateUser(user);
                if (newUser) {
                    return {Success: true, Response: firebaseUser};
                } else {
                    return {Success: false, Message: "Impossible to create user in DB"}
                }
            } else {
                return {Success: false, Message: "Impossible to create user in Firebase"}
            }
        } catch (e) {
            console.error("An error occurred while adding a new user", e)
            return {Success: false, Message: `${e.Message}`}
        }
    }

    public async updateUser(user: User, password: string): Promise<GenericResponse> {
        try {
            let firebaseUser = await this._firebaseService.updateUser(ObjectToInterface.ToFirebaseUser(user, password));
            user.FirebaseId = firebaseUser.Uid;
            if (firebaseUser) {
                await this._userRepository.partiallyUpdateUser(user.Id, user);
                return {Success: true, Response: firebaseUser};
            } else {
                return {Success: false, Message: "Impossible to create user in firebase"}
            }
        } catch (e) {
            console.error("An error occurred while updating a user", e)
            return {Success: false, Message: `${e.Message}`}
        }
    }

    public async deleteUser(UserId: string): Promise<GenericResponse> {
        try {
            await this._userRepository.deleteUser(UserId);
            return {Success: true};
        } catch (e) {
            return {Success: false};
        }
    }

    public async getAllUsers(): Promise<IUser[]> {
        let parsedOffices: IUser[]
        try {
            let Users = await this._userRepository.getAllUsers({
                UserType: true,
            });
            if (Users) {
                parsedOffices = Users.map((User) => {
                    return ObjectToInterface.ToUser(User);
                });
            }
            return parsedOffices;
        } catch (e) {
            console.error("Error while getting all branches users", e);
            throw new Error(e);
        }
    }
}
