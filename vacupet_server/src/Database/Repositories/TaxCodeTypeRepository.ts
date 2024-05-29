import {DataSource, Repository} from "typeorm"
import {TaxCodeType} from "../../Models/Database/Entities/TaxCodeType";

export class TaxCodeTypeRepository {
    repository: Repository<TaxCodeType>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(TaxCodeType);
    }

    public async getAllTaxCodeTypes(relations?: object): Promise<TaxCodeType[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
