import {DataSource, Repository} from "typeorm"
import {Setting} from "../../Models/Database/Entities/Setting";

export class SettingRepository {
    repository: Repository<Setting>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Setting);
    }

    public async createUpdateSetting(Setting: Setting): Promise<Setting> {
        try {
            return await this.repository.save(Setting);
        } catch (e) {
            console.error('Error saving a new Setting', e)
        }
    }

    public async deleteSetting(id: string, ids?: string[], conditions?: object) {
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

    public async getAllSettings(relations?: object): Promise<Setting[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
