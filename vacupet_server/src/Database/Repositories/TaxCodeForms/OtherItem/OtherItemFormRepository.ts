import {DataSource, Repository} from "typeorm"
import {OtherItemForm} from "../../../../Models/Database/Entities/TaxCodeForms/OtherItem/OtherItemForm";

export class OtherItemFormRepository {
    repository: Repository<OtherItemForm>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(OtherItemForm);
    }
    public async createUpdateOtherItemForm(OtherItemForm: OtherItemForm): Promise<OtherItemForm> {
        try {
            return await this.repository.save(OtherItemForm);
        } catch (e) {
            console.error('Error saving a new OtherItemForm', e)
        }
    }

    public async deleteOtherItemForm(id: string, ids?: string[], conditions?: object) {
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

    public async getAllOtherItemForms(relations?: object): Promise<OtherItemForm[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
