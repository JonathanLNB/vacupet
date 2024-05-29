import {DataSource, Repository} from "typeorm"
import {OptionType} from "../../../Models/Database/Entities/TaxCodeForms/OptionType";

export class OptionTypeRepository {
    repository: Repository<OptionType>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(OptionType);
    }
    public async createUpdateOptionType(OptionType: OptionType): Promise<OptionType> {
        try {
            return await this.repository.save(OptionType);
        } catch (e) {
            console.error('Error saving a new OptionType', e)
        }
    }

    public async deleteOptionType(id: string, ids?: string[], conditions?: object) {
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

    public async getAllOptionTypes(relations?: object): Promise<OptionType[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
