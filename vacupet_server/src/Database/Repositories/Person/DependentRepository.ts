import {DataSource, Repository} from "typeorm"
import {Dependent} from "../../../Models/Database/Entities/Person/Dependent";

export class DependentRepository {
    repository: Repository<Dependent>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Dependent);
    }
    public async createUpdateDependent(Dependent: Dependent): Promise<Dependent> {
        try {
            return await this.repository.save(Dependent);
        } catch (e) {
            console.error('Error saving a new Dependent', e)
        }
    }

    public async deleteDependent(id: string, ids?: string[], conditions?: object) {
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
