import {DataSource, Repository} from "typeorm"
import {Relation} from "../../../Models/Database/Entities/Person/Relation";

export class RelationRepository {
    repository: Repository<Relation>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Relation);
    }

    public async getAllRelations(relations?: object): Promise<Relation[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
