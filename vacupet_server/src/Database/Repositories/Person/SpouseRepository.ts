import {DataSource, Repository} from "typeorm"
import {Spouse} from "../../../Models/Database/Entities/Person/Spouse";

export class SpouseRepository {
    repository: Repository<Spouse>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Spouse);
    }
    public async createUpdateSpouse(Spouse: Spouse): Promise<Spouse> {
        try {
            return await this.repository.save(Spouse);
        } catch (e) {
            console.error('Error saving a new Spouse', e)
        }
    }

    public async deleteSpouse(id: string, ids?: string[], conditions?: object) {
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
}
