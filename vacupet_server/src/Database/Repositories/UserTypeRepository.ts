import {DataSource, Repository} from "typeorm"
import {UserType} from "../../Models/Database/Entities/UserType";

export class UserTypeRepository {
    repository: Repository<UserType>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(UserType);
    }

    public async getAllUserTypes(relations?: object): Promise<UserType[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
