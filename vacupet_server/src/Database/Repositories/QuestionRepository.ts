import {DataSource, Repository} from "typeorm"
import {Question} from "../../Models/Database/Entities/Question";

export class QuestionRepository {
    repository: Repository<Question>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(Question);
    }

    public async createUpdateQuestion(Question: Question): Promise<Question> {
        try {
            return await this.repository.save(Question);
        } catch (e) {
            console.error('Error saving a new Question', e)
        }
    }

    public async deleteQuestion(id: string, ids?: string[], conditions?: object) {
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

    public async getAllQuestions(relations?: object): Promise<Question[]> {
        if (relations) {
            return this.repository.find({relations: relations});
        }
        return this.repository.find();
    }

    public async getQuestionsByTaxCodeId(taxcodeId: string): Promise<Question[]> {
        return this.repository.findBy({TaxCode: {Id: taxcodeId}});
    }
}
