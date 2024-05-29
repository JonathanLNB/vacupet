import {DataSource, Repository} from "typeorm"
import {AccountType} from "../../Models/Database/Entities/AccountType";

export class AccountTypeRepository {
    repository: Repository<AccountType>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(AccountType);
    }

    public async getAllAccountTypes(relations?: object): Promise<AccountType[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
