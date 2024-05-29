import {DataSource, Repository} from "typeorm"
import {OtherItemFormOption} from "../../../../Models/Database/Entities/TaxCodeForms/OtherItem/OtherItemFormOption";

export class OtherItemFormOptionRepository {
    repository: Repository<OtherItemFormOption>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(OtherItemFormOption);
    }
    public async createUpdateOtherItemFormOption(OtherItemFormOption: OtherItemFormOption): Promise<OtherItemFormOption> {
        try {
            return await this.repository.save(OtherItemFormOption);
        } catch (e) {
            console.error('Error saving a new OtherItemFormOption', e)
        }
    }

    public async deleteOtherItemFormOption(id: string, ids?: string[], conditions?: object) {
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

    public async getAllOtherItemFormOptions(relations?: object): Promise<OtherItemFormOption[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
