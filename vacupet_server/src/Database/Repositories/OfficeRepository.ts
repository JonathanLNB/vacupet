import {DataSource, Repository} from "typeorm"
import {Office} from "../../Models/Database/Entities/Office";

export class OfficeRepository {
    repository: Repository<Office>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Office);
    }
    public async createUpdateOffice(Office: Office): Promise<Office> {
        try {
            return await this.repository.save(Office);
        } catch (e) {
            console.error('Error saving a new Office', e)
        }
    }

    public async deleteOffice(id: string, ids?: string[], conditions?: object) {
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

    public async getAllOffices(relations?: object): Promise<Office[]> {
        if (relations) {
            return this.repository.find({relations: relations, order: {Name: "ASC"}});
        }
        return this.repository.find({order: {Name: "ASC"}});
    }
}
