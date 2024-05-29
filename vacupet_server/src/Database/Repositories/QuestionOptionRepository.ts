import {DataSource, Repository} from "typeorm"
import {QuestionOption} from "../../Models/Database/Entities/QuestionOption";

export class QuestionOptionRepository {
    repository: Repository<QuestionOption>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(QuestionOption);
    }
    public async createUpdateQuestionOption(QuestionOption: QuestionOption): Promise<QuestionOption> {
        try {
            return await this.repository.save(QuestionOption);
        } catch (e) {
            console.error('Error saving a new QuestionOption', e)
        }
    }

    public async deleteQuestionOption(id: string, ids?: string[], conditions?: object) {
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

    public async getAllQuestionOptions(relations?: object): Promise<QuestionOption[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }
}
