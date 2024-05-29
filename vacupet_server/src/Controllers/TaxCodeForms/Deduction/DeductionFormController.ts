import {DataSource} from "typeorm";
import {Logger} from "logger-colors";
import {DeductionFormRepository} from "../../../Database/Repositories/TaxCodeForms/Deduction/DeductionFormRepository";
import {IDeductionFormOption} from "../../../Models/Database/Interfaces/TaxCodeForm/Deduction/IDeductionFormOption";
import {IDeductionForm} from "../../../Models/Database/Interfaces/TaxCodeForm/Deduction/IDeductionForm";
import {InterfaceToObject} from "../../../Tools/ExtensionMethods/InterfaceToObject";
import {DeductionFormOptionController} from "./DeductionFormOptionController";
import {ObjectToInterface} from "../../../Tools/ExtensionMethods/ObjectToInterface";
import {ITaxCode} from "../../../Models/Database/Interfaces/ITaxCode";
import {IOptionType} from "../../../Models/Database/Interfaces/TaxCodeForm/IOptionType";
import {GenericResponse} from "../../../Models/Interfaces/GenericResponse";

export class DeductionFormController {
    private _deductionformsRepository: DeductionFormRepository;
    private _deductionformoptionController: DeductionFormOptionController;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._deductionformsRepository = new DeductionFormRepository(dataSource);
        this._deductionformoptionController = new DeductionFormOptionController(logger, dataSource);
    }

    public async createDeductionForm(deductionform: IDeductionForm): Promise<GenericResponse> {
        try {
            let assignedDeductionFormOptions: IDeductionFormOption[] = [];
            if (deductionform.DeductionFormOptions) {
                if (typeof deductionform.DeductionFormOptions === "string") {
                    deductionform.DeductionFormOptions = JSON.parse(deductionform.DeductionFormOptions) as IDeductionFormOption[];
                }
                assignedDeductionFormOptions = await this.createDeductionFormOptions(deductionform.DeductionFormOptions);
            }
            if (deductionform.NumForm) {
                if (typeof deductionform.NumForm === "string") {
                    deductionform.NumForm = JSON.parse(deductionform.NumForm) as IOptionType;
                }
            }
            if (deductionform.Taxpayer) {
                if (typeof deductionform.Taxpayer === "string") {
                    deductionform.Taxpayer = JSON.parse(deductionform.Taxpayer) as IOptionType;
                }
            }
            if (deductionform.Spouse) {
                if (typeof deductionform.Spouse === "string") {
                    deductionform.Spouse = JSON.parse(deductionform.Spouse) as IOptionType;
                }
            }
            if (deductionform.Dependent) {
                if (typeof deductionform.Dependent === "string") {
                    deductionform.Dependent = JSON.parse(deductionform.Dependent) as IOptionType;
                }
            }
            deductionform.DeductionFormOptions = assignedDeductionFormOptions;
            let addDeductionForm = await this._deductionformsRepository.createUpdateDeductionForm(InterfaceToObject.ToDeductionForm(deductionform));
            return {Success: true, Response: ObjectToInterface.ToDeductionForm(addDeductionForm)}
        } catch (e) {
            this.logger.error(`Deduction Form not added or updated: ${e.message}`);
            return {Success: false, Message: "deduction Form not added or updated"}
        }

    }

    public async deleteDeductionForm(idDeductionForm: string) {
        try {
            await this._deductionformsRepository.deleteDeductionForm(idDeductionForm);
        } catch (e) {
            throw e;
        }
    }

    public async getAllDeductionForms(): Promise<IDeductionForm[]> {
        let deductionforms = await this._deductionformsRepository.getAllDeductionForms();
        if (deductionforms) {
            let parsedDeductionForms = deductionforms.map(deductionform => ObjectToInterface.ToDeductionForm(deductionform));
            return parsedDeductionForms;
        }
        return null;
    }

    public async createDeductionFormOptions(deductionformoptions: IDeductionFormOption[]): Promise<IDeductionFormOption[]> {
        try {
            let assignedDeductionFormOptions: IDeductionFormOption[] = [];
            for (const deductionformoption of deductionformoptions) {
                if (!deductionformoption.Id) {
                    let deductionformoptionResponse = await this._deductionformoptionController.createDeductionFormOption(deductionformoption);
                    if (deductionformoptionResponse.Success) {
                        let newDeductionFormOption = deductionformoptionResponse.Response as IDeductionFormOption;
                        assignedDeductionFormOptions.push(newDeductionFormOption);
                    } else {
                        console.error(`Error saving DeductionFormOption: ${deductionformoptionResponse.Message}`);
                    }
                } else {
                    assignedDeductionFormOptions.push(deductionformoption);
                }
            }
            return assignedDeductionFormOptions;
        } catch (e) {
            throw e;
        }
    }
}
