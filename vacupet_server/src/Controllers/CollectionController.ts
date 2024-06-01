import {DataSource} from "typeorm";
import {UserTypeRepository} from "../Database/Repositories/UserTypeRepository";
import {IUserType} from "../Models/Database/Interfaces/IUserType";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";

export class CollectionController {

    _dataSource: DataSource;
    _userTypeRepository: UserTypeRepository;

    constructor(dataSource: DataSource) {
        this._userTypeRepository = new UserTypeRepository(dataSource)
    }

    public async getAllUserTypes(): Promise<IUserType[]> {
        let userTypes: IUserType[]
        try {
            let userTypesAux = await this._userTypeRepository.getAllUserTypes();
            if (userTypesAux) {
                userTypes = userTypesAux.map((userType) => {
                    return ObjectToInterface.ToUserType(userType);
                });
            }
            return userTypes;
        } catch (e) {
            console.error("Error while getting all user types", e);
            throw new Error(e);
        }
    }
}
