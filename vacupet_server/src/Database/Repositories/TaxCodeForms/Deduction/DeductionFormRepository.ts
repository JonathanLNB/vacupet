import {DataSource, Repository} from "typeorm"
import {DeductionForm} from "../../../../Models/Database/Entities/TaxCodeForms/Deduction/DeductionForm";

export class DeductionFormRepository {
    repository: Repository<DeductionForm>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(DeductionForm);
    }
    public async createUpdateDeductionForm(DeductionForm: DeductionForm): Promise<DeductionForm> {
        try {
            return await this.repository.save(DeductionForm);
        } catch (e) {
            console.error('Error saving a new DeductionForm', e)
        }
    }

    public async deleteDeductionForm(id: string, ids?: string[], conditions?: object) {
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

    public async getAllDeductionForms(relations?: object): Promise<DeductionForm[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
