import {DataSource, Repository} from "typeorm"
import {Pet} from "../../Models/Database/Entities/Pet";

export class PetRepository {
    repository: Repository<Pet>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Pet);
    }

    public async createUpdatePet(Pet: Pet): Promise<Pet> {
        try {
            return await this.repository.save(Pet);
        } catch (e) {
            console.error('Error saving a new Pet', e)
        }
    }

    public async deletePet(id: string, ids?: string[], conditions?: object) {
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

    public async getAllPets(relations?: object): Promise<Pet[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
