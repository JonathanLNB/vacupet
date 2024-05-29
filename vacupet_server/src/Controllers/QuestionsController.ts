import {DataSource} from "typeorm";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {IQuestion} from "../Models/Database/Interfaces/IQuestion";
import {QuestionRepository} from "../Database/Repositories/QuestionRepository";
import {InterfaceToObject} from "../Tools/ExtensionMethods/InterfaceToObject";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {Logger} from "logger-colors";
import {IQuestionOption} from "../Models/Database/Interfaces/IQuestionOption";
import {QuestionOptionsController} from "./QuestionOptionsController";

export class QuestionsController {
    private _questionsRepository: QuestionRepository;
    private _questionOptionsController: QuestionOptionsController;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._questionsRepository = new QuestionRepository(dataSource);
        this._questionOptionsController = new QuestionOptionsController(this.logger, dataSource);
    }

    public async createQuestion(question: IQuestion): Promise<GenericResponse> {
        try {
            let assignedQuestionOptions: IQuestionOption[] = [];
            if (question.Options) {
                if (typeof question.Options === "string") {
                    question.Options = JSON.parse(question.Options) as IQuestionOption[];
                }
                assignedQuestionOptions = await this.createOptions(question.Options);
            }
            question.Options = assignedQuestionOptions
            let addQuestion = await this._questionsRepository.createUpdateQuestion(InterfaceToObject.ToQuestion(question));
            return {Success: true, Response: ObjectToInterface.ToQuestion(addQuestion)}
        } catch (e) {
            this.logger.error(`Question not added or updated: ${e.message}`);
            return {Success: false, Message: "Question not added or updated"}
        }

    }

    public async getAllQuestions(): Promise<IQuestion[]> {
        try {
            let questions = await this._questionsRepository.getAllQuestions();
            if (questions) {
                let parsedQuestions = questions.map(question => ObjectToInterface.ToQuestion(question));
                return parsedQuestions;
            }
        } catch (e) {
            this.logger.error(`Error getting questions: ${e.message}`);
        }
        return null;
    }

    public async getQuestionsByTaxCode(idTaxCode: string): Promise<IQuestion[]> {
        try {
            let questions = await this._questionsRepository.getQuestionsByTaxCodeId(idTaxCode);
            if (questions) {
                let parsedQuestions = questions.map(question => ObjectToInterface.ToQuestion(question));
                return parsedQuestions;
            }
        } catch (e) {
            this.logger.error(`Error getting questions: ${e.message}`);
        }
        return null;
    }

    public async createOptions(questionOptions: IQuestionOption[]): Promise<IQuestionOption[]> {
        try {
            let assignedQuestionOptions: IQuestionOption[] = [];
            for (const questionOption of questionOptions) {
                if (!questionOption.Id) {
                    let questionOptionResponse = await this._questionOptionsController.createQuestionOption(questionOption);
                    if (questionOptionResponse.Success) {
                        let newQuestion = questionOptionResponse.Response as IQuestionOption;
                        assignedQuestionOptions.push(newQuestion);
                    } else {
                        this.logger.error(`Error saving question options: ${questionOptionResponse.Message}`);
                    }
                } else {
                    assignedQuestionOptions.push(questionOption);
                }
            }
            return assignedQuestionOptions;
        } catch (e) {
            throw e;
        }
    }

    public async deleteByTaxCode(idTaxCode: string, idQuestion: string) {
        this._questionOptionsController.deleteByQuestion(idQuestion);
        this._questionsRepository.deleteQuestion("", null, {TaxCode: idTaxCode});
    }
}
