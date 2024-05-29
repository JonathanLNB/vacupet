import {DataSource} from "typeorm";
import {Logger} from "logger-colors";
import {IncomeFormRepository} from "../../../Database/Repositories/TaxCodeForms/Income/IncomeFormRepository";
import {IIncomeFormOption} from "../../../Models/Database/Interfaces/TaxCodeForm/Income/IIncomeFormOption";
import {IIncomeForm} from "../../../Models/Database/Interfaces/TaxCodeForm/Income/IIncomeForm";
import {InterfaceToObject} from "../../../Tools/ExtensionMethods/InterfaceToObject";
import {IncomeFormOptionController} from "./IncomeFormOptionController";
import {ObjectToInterface} from "../../../Tools/ExtensionMethods/ObjectToInterface";
import {ITaxCode} from "../../../Models/Database/Interfaces/ITaxCode";
import {IOptionType} from "../../../Models/Database/Interfaces/TaxCodeForm/IOptionType";
import {GenericResponse} from "../../../Models/Interfaces/GenericResponse";

export class IncomeFormController {
    private _incomeformsRepository: IncomeFormRepository;
    private _incomeformoptionController: IncomeFormOptionController;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._incomeformsRepository = new IncomeFormRepository(dataSource);
        this._incomeformoptionController = new IncomeFormOptionController(logger, dataSource);
    }

    public async createIncomeForm(incomeform: IIncomeForm): Promise<GenericResponse> {
        try {
            let assignedIncomeFormOptions: IIncomeFormOption[] = [];
            if (incomeform.IncomeFormOptions) {
                if (typeof incomeform.IncomeFormOptions === "string") {
                    incomeform.IncomeFormOptions = JSON.parse(incomeform.IncomeFormOptions) as IIncomeFormOption[];
                }
                assignedIncomeFormOptions = await this.createIncomeFormOptions(incomeform.IncomeFormOptions);
            }
            if (incomeform.NumForm) {
                if (typeof incomeform.NumForm === "string") {
                    incomeform.NumForm = JSON.parse(incomeform.NumForm) as IOptionType;
                }
            }
            if (incomeform.Taxpayer) {
                if (typeof incomeform.Taxpayer === "string") {
                    incomeform.Taxpayer = JSON.parse(incomeform.Taxpayer) as IOptionType;
                }
            }
            if (incomeform.Spouse) {
                if (typeof incomeform.Spouse === "string") {
                    incomeform.Spouse = JSON.parse(incomeform.Spouse) as IOptionType;
                }
            }
            incomeform.IncomeFormOptions = assignedIncomeFormOptions;
            let addIncomeForm = await this._incomeformsRepository.createUpdateIncomeForm(InterfaceToObject.ToIncomeForm(incomeform));
            return {Success: true, Response: ObjectToInterface.ToIncomeForm(addIncomeForm)}
        } catch (e) {
            this.logger.error(`Income Form not added or updated: ${e.message}`);
            return {Success: false, Message: "income Form not added or updated"}
        }

    }

    public async deleteIncomeForm(idIncomeForm: string) {
        try {
            await this._incomeformsRepository.deleteIncomeForm(idIncomeForm);
        } catch (e) {
            throw e;
        }
    }

    public async getAllIncomeForms(): Promise<IIncomeForm[]> {
        let incomeforms = await this._incomeformsRepository.getAllIncomeForms();
        if (incomeforms) {
            let parsedIncomeForms = incomeforms.map(incomeform => ObjectToInterface.ToIncomeForm(incomeform));
            return parsedIncomeForms;
        }
        return null;
    }

    public async createIncomeFormOptions(incomeformoptions: IIncomeFormOption[]): Promise<IIncomeFormOption[]> {
        try {
            let assignedIncomeFormOptions: IIncomeFormOption[] = [];
            for (const incomeformoption of incomeformoptions) {
                if (!incomeformoption.Id) {
                    let incomeformoptionResponse = await this._incomeformoptionController.createIncomeFormOption(incomeformoption);
                    if (incomeformoptionResponse.Success) {
                        let newIncomeFormOption = incomeformoptionResponse.Response as IIncomeFormOption;
                        assignedIncomeFormOptions.push(newIncomeFormOption);
                    } else {
                        console.error(`Error saving IncomeFormOption: ${incomeformoptionResponse.Message}`);
                    }
                } else {
                    assignedIncomeFormOptions.push(incomeformoption);
                }
            }
            return assignedIncomeFormOptions;
        } catch (e) {
            throw e;
        }
    }
}
