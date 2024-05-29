import {DataSource, Repository} from "typeorm"
import {Taxpayer} from "../../../Models/Database/Entities/Person/Owner";

export class TaxpayerRepository {
    repository: Repository<Taxpayer>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Taxpayer);
    }
    public async createUpdateTaxpayer(Taxpayer: Taxpayer): Promise<Taxpayer> {
        try {
            return await this.repository.save(Taxpayer);
        } catch (e) {
            console.error('Error saving a new Taxpayer', e)
        }
    }

    public async deleteTaxpayer(id: string, ids?: string[], conditions?: object) {
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

    public async getAllTaxpayers(relations?: object): Promise<Taxpayer[]> {
        if (relations) {
            return this.repository.find({relations: relations, order: {Lastname: "ASC"}});
        }
        return this.repository.find();
    }
}
