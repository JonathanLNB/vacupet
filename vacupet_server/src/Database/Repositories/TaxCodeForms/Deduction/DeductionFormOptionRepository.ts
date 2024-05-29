import {DataSource, Repository} from "typeorm"
import {DeductionFormOption} from "../../../../Models/Database/Entities/TaxCodeForms/Deduction/DeductionFormOption";

export class DeductionFormOptionRepository {
    repository: Repository<DeductionFormOption>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(DeductionFormOption);
    }
    public async createUpdateDeductionFormOption(DeductionFormOption: DeductionFormOption): Promise<DeductionFormOption> {
        try {
            return await this.repository.save(DeductionFormOption);
        } catch (e) {
            console.error('Error saving a new DeductionFormOption', e)
        }
    }

    public async deleteDeductionFormOption(id: string, ids?: string[], conditions?: object) {
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

    public async getAllDeductionFormOptions(relations?: object): Promise<DeductionFormOption[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
