import {DataSource, Repository} from "typeorm"
import {BankMethodType} from "../../Models/Database/Entities/BankMethodType";

export class BankMethodTypeRepository {
    repository: Repository<BankMethodType>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(BankMethodType);
    }

    public async getAllBankMethodsType(relations?: object): Promise<BankMethodType[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
