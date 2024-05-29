import {DataSource} from "typeorm";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {IQuestionOption} from "../Models/Database/Interfaces/IQuestionOption";
import {QuestionOptionRepository} from "../Database/Repositories/QuestionOptionRepository";
import {InterfaceToObject} from "../Tools/ExtensionMethods/InterfaceToObject";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {Logger} from "logger-colors";

export class QuestionOptionsController {
    private _questionsOptionsRepository: QuestionOptionRepository;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this._questionsOptionsRepository = new QuestionOptionRepository(dataSource);
    }

    public async createQuestionOption(question: IQuestionOption): Promise<GenericResponse> {
        try {
            let addQuestionOption = await this._questionsOptionsRepository.createUpdateQuestionOption(InterfaceToObject.ToQuestionOption(question));
            return {Success: true, Response: ObjectToInterface.ToQuestionOption(addQuestionOption)};
        } catch (e) {
            this.logger.error(`Question option not added or updated: ${e.message}`);
            return {Success: false, Message: "Question not added or updated"}
        }

    }

    public async getAllQuestionOptions(): Promise<IQuestionOption[]> {
        try {
            let questionsOptions = await this._questionsOptionsRepository.getAllQuestionOptions();
            if (questionsOptions) {
                let parsedQuestionOptions = questionsOptions.map(question => ObjectToInterface.ToQuestionOption(question));
                return parsedQuestionOptions;
            }
        } catch (e) {
            this.logger.error(`Error getting question options: ${e.message}`);
        }
        return null;
    }

    public async deleteByQuestion(idQuestion: string) {
        this._questionsOptionsRepository.deleteQuestionOption("", null, {
            Question: idQuestion
        })
    }
}
