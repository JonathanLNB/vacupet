import {DataSource, Repository} from "typeorm"
import {TransferMethod} from "../../Models/Database/Entities/TransferMethod";

export class TransferMethodRepository {
    repository: Repository<TransferMethod>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(TransferMethod);
    }

    public async getAllTransferMethods(relations?: object): Promise<TransferMethod[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
