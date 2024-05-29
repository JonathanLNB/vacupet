import {DataSource, Repository} from "typeorm"
import {State} from "../../Models/Database/Entities/State";

export class StateRepository {
    repository: Repository<State>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(State);
    }

    public async createUpdateState(State: State): Promise<State> {
        try {
            return await this.repository.save(State);
        } catch (e) {
            console.error('Error saving a new State', e)
        }
    }

    public async deleteState(id: string, ids?: string[], conditions?: object) {
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

    public async getAllStates(relations?: object): Promise<State[]> {
        if (relations) {
            return this.repository.find({relations: relations, order: {Order: "ASC"}});
        }
        return this.repository.find({order: {Order: "ASC"}});
    }
}
