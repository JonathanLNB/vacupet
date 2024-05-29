import {DataSource, Repository} from "typeorm"
import {IncomeForm} from "../../../../Models/Database/Entities/TaxCodeForms/Income/IncomeForm";

export class IncomeFormRepository {
    repository: Repository<IncomeForm>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(IncomeForm);
    }
    public async createUpdateIncomeForm(IncomeForm: IncomeForm): Promise<IncomeForm> {
        try {
            return await this.repository.save(IncomeForm);
        } catch (e) {
            console.error('Error saving a new IncomeForm', e)
        }
    }

    public async deleteIncomeForm(id: string, ids?: string[], conditions?: object) {
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

    public async getAllIncomeForms(relations?: object): Promise<IncomeForm[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
