import {DataSource, Repository} from "typeorm"
import {IncomeFormOption} from "../../../../Models/Database/Entities/TaxCodeForms/Income/IncomeFormOption";

export class IncomeFormOptionRepository {
    repository: Repository<IncomeFormOption>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(IncomeFormOption);
    }
    public async createUpdateIncomeFormOption(IncomeFormOption: IncomeFormOption): Promise<IncomeFormOption> {
        try {
            return await this.repository.save(IncomeFormOption);
        } catch (e) {
            console.error('Error saving a new IncomeFormOption', e)
        }
    }

    public async deleteIncomeFormOption(id: string, ids?: string[], conditions?: object) {
        try {
            if (conditions) {
                await this.repository.delete(conditions);
                return;
            }
            if (ids) {
                await this.repository.delete(ids);
                return;
            }
            await this.repository.delete(id);
        } catch (e) {
            console.error("Something went wrong while deleting the object", e)
        }
    }

    public async getAllIncomeFormOptions(relations?: object): Promise<IncomeFormOption[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
