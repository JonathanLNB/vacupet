import {DataSource} from "typeorm";
import {UserRepository} from "../../Database/Repositories/Person/UserRepository";
import {FirebaseRepository} from "../../Database/Repositories/FirebaseRepository";
import {GenericResponse} from "../../Models/Interfaces/GenericResponse";
import {IUser} from "../../Models/Database/Interfaces/Person/IUser";
import {User} from "../../Models/Database/Entities/Person/User";
import {ObjectToInterface} from "../../Tools/ExtensionMethods/ObjectToInterface";
import {Logger} from "logger-colors";
import {OwnerRepository} from "../../Database/Repositories/Person/OwnerRepository";
import {UserTypes} from "../../Enums/UserTypes";
import {PetRepository} from "../../Database/Repositories/PetRepository";

export class UserController {

    private logger: Logger;
    private _userRepository: UserRepository;
    private _ownerRepository: OwnerRepository;
    private _petRepository: PetRepository;
    private _firebaseService: FirebaseRepository

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._userRepository = new UserRepository(dataSource);
        this._ownerRepository = new OwnerRepository(dataSource);
        this._petRepository = new PetRepository(dataSource);
        this._firebaseService = new FirebaseRepository();
    }

    public async createUser(user: User, password: string): Promise<GenericResponse> {
        try {
            let firebaseUser = await this._firebaseService.addUser(ObjectToInterface.ToFirebaseUser(user, password), user.UserType.Id === UserTypes.OWNER);
            user.FirebaseId = firebaseUser.Uid;
            console.log("Hola");
            if (firebaseUser.Success) {
                console.log("Success");
                let newUser = await this._userRepository.createUpdateUser(user);
                console.log("Creando usuario");
                if (newUser) {
                    console.log("Success");
                    if (newUser.UserType.Id === UserTypes.ADMIN) {
                        return {Success: true, Response: firebaseUser};
                    } else {
                        console.log("Creando Owner");
                        user.Owner.User = newUser;
                        let newOwner = await this._ownerRepository.createUpdateOwner(user.Owner);
                        if (newOwner) {
                            console.log("Success");
                            console.log("Creando Pets");
                            user.Owner.Pets.forEach((pet) => {
                                pet.Owner = newOwner;
                                this._petRepository.createUpdatePet(pet);
                            })
                            console.log("Success");
                            return {Success: true, Response: firebaseUser};
                        } else {
                            return {Success: false, Message: "Impossible to create owner in DB"}
                        }
                    }
                } else {
                    return {Success: false, Message: "Impossible to create user in DB"}
                }
            } else {
                return {Success: false, Message: "Impossible to create user in Firebase"}
            }
        } catch (e) {
            this.logger.error("An error occurred while adding a new user", e)
            return {Success: false, Message: `${e.Message}`}
        }
    }

    public async updateUser(user: User, password: string): Promise<GenericResponse> {
        try {
            let firebaseUser = await this._firebaseService.updateUser(ObjectToInterface.ToFirebaseUser(user, password));
            user.FirebaseId = firebaseUser.Uid;
            if (firebaseUser) {
                let newUser = await this._userRepository.createUpdateUser(user);
                if (newUser) {
                    if (newUser.UserType.Id === UserTypes.ADMIN) {
                        return {Success: true, Response: firebaseUser};
                    } else {
                        user.Owner.User = newUser;
                        let newOwner = await this._ownerRepository.createUpdateOwner(user.Owner);
                        if (newOwner) {
                            user.Owner.Pets.forEach((pet) => {
                                pet.Owner = newOwner;
                                this._petRepository.createUpdatePet(pet);
                            })
                            return {Success: true, Response: firebaseUser};
                        } else {
                            return {Success: false, Message: "Impossible to create owner in DB"}
                        }
                    }
                } else {
                    return {Success: false, Message: "Impossible to create user in DB"}
                }
            } else {
                return {Success: false, Message: "Impossible to create user in firebase"}
            }
        } catch (e) {
            this.logger.error("An error occurred while updating a user", e)
            return {Success: false, Message: `${e.Message}`}
        }
    }

    public async deleteUser(UserId: string): Promise<GenericResponse> {
        try {
            const user = await this._userRepository.getUserById(UserId);
            await this._firebaseService.deleteUser(user.FirebaseId);
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
            this.logger.error("Error while getting all users", e);
            throw new Error(e);
        }
    }
}
