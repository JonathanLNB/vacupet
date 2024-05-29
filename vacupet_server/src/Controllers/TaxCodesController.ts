import {DataSource} from "typeorm";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {ITaxCode} from "../Models/Database/Interfaces/ITaxCode";
import {TaxCodeRepository} from "../Database/Repositories/TaxCodeRepository";
import {InterfaceToObject} from "../Tools/ExtensionMethods/InterfaceToObject";
import {IQuestion} from "../Models/Database/Interfaces/IQuestion";
import {QuestionsController} from "./QuestionsController";
import {Logger} from "logger-colors";
import {ITaxCodeType} from "../Models/Database/Interfaces/ITaxCodeType";
import {IIncomeForm} from "../Models/Database/Interfaces/TaxCodeForm/Income/IIncomeForm";
import {IDeductionForm} from "../Models/Database/Interfaces/TaxCodeForm/Deduction/IDeductionForm";
import {IOtherItemForm} from "../Models/Database/Interfaces/TaxCodeForm/OtherItem/IOtherItemForm";
import {IncomeFormController} from "./TaxCodeForms/Income/IncomeFormController";
import {DeductionFormController} from "./TaxCodeForms/Deduction/DeductionFormController";
import {OtherItemFormController} from "./TaxCodeForms/OtherItem/OtherItemFormController";
import {TaxCodeTypes} from "../Enums/TaxCodeTypes";

export class TaxCodesController {
    private _taxcodesRepository: TaxCodeRepository;
    private _questionController: QuestionsController;
    private _incomeFormController: IncomeFormController;
    private _deductionFormController: DeductionFormController;
    private _otherItemFormController: OtherItemFormController;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._taxcodesRepository = new TaxCodeRepository(dataSource);
        this._questionController = new QuestionsController(logger, dataSource);
        this._incomeFormController = new IncomeFormController(logger, dataSource);
        this._deductionFormController = new DeductionFormController(logger, dataSource);
        this._otherItemFormController = new OtherItemFormController(logger, dataSource);
    }

    public async createTaxCode(taxcode: ITaxCode): Promise<ITaxCode> {
        try {
            let assignedQuestions: IQuestion[] = [];
            if (taxcode.Questions) {
                if (typeof taxcode.Questions === "string") {
                    taxcode.Questions = JSON.parse(taxcode.Questions) as IQuestion[];
                }
                assignedQuestions = await this.createQuestions(taxcode.Questions);
            }
            if (taxcode.TaxCodeType) {
                if (typeof taxcode.TaxCodeType === "string") {
                    taxcode.TaxCodeType = JSON.parse(taxcode.TaxCodeType) as ITaxCodeType;
                }
            }
            if (taxcode.IncomeForm) {
                if (typeof taxcode.IncomeForm === "string") {
                    taxcode.IncomeForm = JSON.parse(taxcode.IncomeForm) as IIncomeForm;
                    if (!taxcode.IncomeForm.Id) {
                        let incomeFormResponse = await this._incomeFormController.createIncomeForm(taxcode.IncomeForm);
                        if (incomeFormResponse.Success) {
                            taxcode.IncomeForm = incomeFormResponse.Response as IIncomeForm
                        } else {
                            this.logger.error(`Error saving IncomeForm: ${incomeFormResponse.Message}`);
                        }
                    }
                }
            }
            if (taxcode.DeductionForm) {
                if (typeof taxcode.DeductionForm === "string") {
                    taxcode.DeductionForm = JSON.parse(taxcode.DeductionForm) as IDeductionForm;
                    if (!taxcode.DeductionForm.Id) {
                        let deductionFormResponse = await this._deductionFormController.createDeductionForm(taxcode.DeductionForm);
                        if (deductionFormResponse.Success) {
                            taxcode.DeductionForm = deductionFormResponse.Response as IDeductionForm
                        } else {
                            this.logger.error(`Error saving DeductionForm: ${deductionFormResponse.Message}`);
                        }
                    }
                }
            }
            if (taxcode.OtherItemForm) {
                if (typeof taxcode.OtherItemForm === "string") {
                    taxcode.OtherItemForm = JSON.parse(taxcode.OtherItemForm) as IOtherItemForm;
                    if (!taxcode.OtherItemForm.Id) {
                        let otherItemFormResponse = await this._otherItemFormController.createOtherItemForm(taxcode.OtherItemForm);
                        if (otherItemFormResponse.Success) {
                            taxcode.OtherItemForm = otherItemFormResponse.Response as IOtherItemForm
                        } else {
                            this.logger.error(`Error saving OtherItemForm: ${otherItemFormResponse.Message}`);
                        }
                    }
                }
            }
            taxcode.Questions = assignedQuestions;
            let addTaxCode = await this._taxcodesRepository.createUpdateTaxCode(InterfaceToObject.ToTaxCode(taxcode));
            return addTaxCode;
        } catch (e) {
            this.logger.error(`Error saving TaxCode: ${e.message}`);
        }

    }

    public async deleteTaxCode(idTaxCode: string) {
        try {
            let questions: IQuestion[] = await this._questionController.getQuestionsByTaxCode(idTaxCode);
            for (const question of questions) {
                await this._questionController.deleteByTaxCode(idTaxCode, question.Id)
            }
            await this._taxcodesRepository.deleteTaxCode(idTaxCode);
        } catch (e) {
            throw e;
        }
    }

    public async getAllTaxCodes(): Promise<ITaxCode[]> {
        let relations = {
            TaxCodeType: true,
            IncomeForm: {
                NumForm: true,
                Taxpayer: true,
                Spouse: true,
                IncomeFormOptions: true
            },
            DeductionForm: {
                NumForm: true,
                Taxpayer: true,
                Spouse: true,
                Dependent: true,
                DeductionFormOptions: true,
            },
            OtherItemForm: {
                Taxpayer: true,
                Spouse: true,
                Dependent: true,
                OtherItemFormOptions: true
            },
            Questions: {
                QuestionType: true,
                Options: true,
            }
        };
        let taxcodes = await this._taxcodesRepository.getAllTaxCodes(relations);
        if (taxcodes) {
            let parsedTaxCodes = taxcodes.map(taxcode => ObjectToInterface.ToTaxCode(taxcode));
            return parsedTaxCodes;
        }
        return null;
    }

    public async getTaxCodesByType(type: TaxCodeTypes): Promise<ITaxCode[]> {
        let relations = {
            TaxCodeType: true,
            IncomeForm: {
                NumForm: true,
                Taxpayer: true,
                Spouse: true,
                IncomeFormOptions: true
            },
            DeductionForm: {
                NumForm: true,
                Taxpayer: true,
                Spouse: true,
                Dependent: true,
                DeductionFormOptions: true,
            },
            OtherItemForm: {
                Taxpayer: true,
                Spouse: true,
                Dependent: true,
                OtherItemFormOptions: true
            },
            Questions: {
                QuestionType: true,
                Options: true,
            }
        };
        let taxcodes = await this._taxcodesRepository.getTaxCodesByType(type, relations);
        if (taxcodes) {
            let parsedTaxCodes = taxcodes.map(taxcode => ObjectToInterface.ToTaxCode(taxcode));
            return parsedTaxCodes;
        }
        return null;
    }

    public async createQuestions(questions: IQuestion[]): Promise<IQuestion[]> {
        try {
            let assignedQuestions: IQuestion[] = [];
            for (const question of questions) {
                if (!question.Id) {
                    let questionResponse = await this._questionController.createQuestion(question);
                    if (questionResponse.Success) {
                        let newQuestion = questionResponse.Response as IQuestion;
                        assignedQuestions.push(newQuestion);
                    } else {
                        this.logger.error(`Error saving question: ${questionResponse.Message}`);
                    }
                } else {
                    assignedQuestions.push(question);
                }
            }
            return assignedQuestions;
        } catch (e) {
            this.logger.error(`Error saving Questions: ${e.message}`);
        }
    }
}
