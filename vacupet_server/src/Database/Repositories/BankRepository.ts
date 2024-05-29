import {DataSource, Repository} from "typeorm"
import {Bank} from "../../Models/Database/Entities/Bank";

export class BankRepository {
    repository: Repository<Bank>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Bank);
    }

    public async createUpdateBank(Bank: Bank): Promise<Bank> {
        try {
            return await this.repository.save(Bank);
        } catch (e) {
            console.error('Error saving a new Bank', e)
        }
    }

    public async deleteBank(id: string, ids?: string[], conditions?: object) {
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

    public async getAllBanks(relations?: object): Promise<Bank[]> {
        if (relations) {
            return this.repository.find({relations: relations, order: {Name: "ASC"}});
        }
        return this.repository.find({order: {Name: "ASC"}});
    }
}
