import {DataSource, Repository} from "typeorm"
import {Allergy} from "../../Models/Database/Entities/Allergy";

export class AllergyRepository {
    repository: Repository<Allergy>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Allergy);
    }

    public async createUpdateAllergy(Allergy: Allergy): Promise<Allergy> {
        try {
            return await this.repository.save(Allergy);
        } catch (e) {
            console.error('Error saving a new Allergy', e)
        }
    }

    public async deleteAllergy(id: string, ids?: string[], conditions?: object) {
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

    public async getAllAllergies(relations?: object): Promise<Allergy[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
