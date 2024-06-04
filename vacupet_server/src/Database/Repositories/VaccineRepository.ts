import {DataSource, Repository} from "typeorm"
import {Vaccine} from "../../Models/Database/Entities/Vaccine";

export class VaccineRepository {
    repository: Repository<Vaccine>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Vaccine);
    }

    public async createUpdateVaccine(Vaccine: Vaccine): Promise<Vaccine> {
        try {
            return await this.repository.save(Vaccine);
        } catch (e) {
            console.error('Error saving a new Vaccine', e)
        }
    }

    public async deleteVaccine(id: string, ids?: string[], conditions?: object) {
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

    public async getAllVaccines(relations?: object): Promise<Vaccine[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
