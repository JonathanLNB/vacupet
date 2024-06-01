import {DataSource, Repository} from "typeorm"
import {PetType} from "../../Models/Database/Entities/PetType";

export class PetTypeRepository {
    repository: Repository<PetType>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(PetType);
    }

    public async createUpdatePetType(PetType: PetType): Promise<PetType> {
        try {
            return await this.repository.save(PetType);
        } catch (e) {
            console.error('Error saving a new PetType', e)
        }
    }

    public async deletePetType(id: string, ids?: string[], conditions?: object) {
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

    public async getAllPetTypes(relations?: object): Promise<PetType[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
