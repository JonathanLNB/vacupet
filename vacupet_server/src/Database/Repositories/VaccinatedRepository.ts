import {DataSource, Repository} from "typeorm"
import {Vaccinated} from "../../Models/Database/Entities/Vaccinated";

export class VaccinatedRepository {
    repository: Repository<Vaccinated>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Vaccinated);
    }

    public async createUpdateVaccinated(Vaccinated: Vaccinated): Promise<Vaccinated> {
        try {
            return await this.repository.save(Vaccinated);
        } catch (e) {
            console.error('Error saving a new Vaccinated', e)
        }
    }

    public async deleteVaccinated(id: string, ids?: string[], conditions?: object) {
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

    public async getAllVaccinated(relations?: object): Promise<Vaccinated[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
