import {DataSource, Repository} from "typeorm"
import {QuestionType} from "../../Models/Database/Entities/QuestionType";

export class QuestionTypeRepository {
    repository: Repository<QuestionType>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(QuestionType);
    }

    public async getAllQuestionTypes(relations?: object): Promise<QuestionType[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
