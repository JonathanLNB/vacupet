import {DataSource, Repository} from "typeorm"
import {User} from "../../Models/Database/Entities/Person/User";

export class UserRepository {
    repository: Repository<User>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(User);
    }

    public async createUpdateUser(User: User): Promise<User> {
        try {
            return await this.repository.save(User);
        } catch (e) {
            console.error('Error saving a new User', e)
        }
    }

    public async deleteUser(id: string, ids?: string[], conditions?: object) {
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

    public async partiallyUpdateUser(id: string, updates: object, updateOptions?: object) {
        if (updateOptions) {
            await this.repository.update(updateOptions, updates);
            return;
        }
        await this.repository.update(id, updates);
    }

    public async getUserByFirebase(firebaseID: string, relations?: object): Promise<User> {
        let Users: User[];
        if (relations) {
            Users = await this.repository.find({
                where: {
                    FirebaseId: firebaseID
                },
                relations: relations
            });
        } else {
            Users = await this.repository.findBy({
                FirebaseId: firebaseID
            });
        }
        if (Users) {
            return Users.length < 1 ? null : Users[0];
        }
        return null;
    }

    public async getAllUsers(relations?: object): Promise<User[]> {
        if (relations) {
            return this.repository.find({relations: relations, order: {Lastname: "ASC"}});
        }
        return this.repository.find();
    }
}
