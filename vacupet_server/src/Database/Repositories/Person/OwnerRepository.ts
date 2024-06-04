import {DataSource, Repository} from "typeorm"
import {Owner} from "../../../Models/Database/Entities/Person/Owner";

export class OwnerRepository {
    repository: Repository<Owner>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Owner);
    }

    public async createUpdateOwner(Owner: Owner): Promise<Owner> {
        try {
            return await this.repository.save(Owner);
        } catch (e) {
            console.error(e)
            console.error('Error saving a new Owner', e)
        }
    }

    public async deleteOwner(id: string, ids?: string[], conditions?: object) {
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


    public async getAllOwners(relations?: object): Promise<Owner[]> {
        if (relations) {
            return this.repository.find({
                relations: relations, order: {
                    User: {
                        Lastname: 'ASC'
                    }
                }
            });
        }
        return this.repository.find();
    }
}
