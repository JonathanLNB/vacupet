import {DataSource} from "typeorm";
import {Logger} from "logger-colors";
import {OtherItemFormRepository} from "../../../Database/Repositories/TaxCodeForms/OtherItem/OtherItemFormRepository";
import {IOtherItemFormOption} from "../../../Models/Database/Interfaces/TaxCodeForm/OtherItem/IOtherItemFormOption";
import {IOtherItemForm} from "../../../Models/Database/Interfaces/TaxCodeForm/OtherItem/IOtherItemForm";
import {InterfaceToObject} from "../../../Tools/ExtensionMethods/InterfaceToObject";
import {OtherItemFormOptionController} from "./OtherItemFormOptionController";
import {ObjectToInterface} from "../../../Tools/ExtensionMethods/ObjectToInterface";
import {ITaxCode} from "../../../Models/Database/Interfaces/ITaxCode";
import {IOptionType} from "../../../Models/Database/Interfaces/TaxCodeForm/IOptionType";
import {GenericResponse} from "../../../Models/Interfaces/GenericResponse";

export class OtherItemFormController {
    private _otheritemformsRepository: OtherItemFormRepository;
    private _otheritemformoptionController: OtherItemFormOptionController;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._otheritemformsRepository = new OtherItemFormRepository(dataSource);
        this._otheritemformoptionController = new OtherItemFormOptionController(logger, dataSource);
    }

    public async createOtherItemForm(otheritemform: IOtherItemForm): Promise<GenericResponse> {
        try {
            let assignedOtherItemFormOptions: IOtherItemFormOption[] = [];
            if (otheritemform.OtherItemFormOptions) {
                if (typeof otheritemform.OtherItemFormOptions === "string") {
                    otheritemform.OtherItemFormOptions = JSON.parse(otheritemform.OtherItemFormOptions) as IOtherItemFormOption[];
                }
                assignedOtherItemFormOptions = await this.createOtherItemFormOptions(otheritemform.OtherItemFormOptions);
            }
            if (otheritemform.Taxpayer) {
                if (typeof otheritemform.Taxpayer === "string") {
                    otheritemform.Taxpayer = JSON.parse(otheritemform.Taxpayer) as IOptionType;
                }
            }
            if (otheritemform.Spouse) {
                if (typeof otheritemform.Spouse === "string") {
                    otheritemform.Spouse = JSON.parse(otheritemform.Spouse) as IOptionType;
                }
            }
            if (otheritemform.Dependent) {
                if (typeof otheritemform.Dependent === "string") {
                    otheritemform.Dependent = JSON.parse(otheritemform.Dependent) as IOptionType;
                }
            }
            otheritemform.OtherItemFormOptions = assignedOtherItemFormOptions;
            let addOtherItemForm = await this._otheritemformsRepository.createUpdateOtherItemForm(InterfaceToObject.ToOtherItemForm(otheritemform));
            return {Success: true, Response: ObjectToInterface.ToOtherItemForm(addOtherItemForm)}
        } catch (e) {
            this.logger.error(`Other Item Form not added or updated: ${e.message}`);
            return {Success: false, Message: "Other Item Form not added or updated"}
        }

    }

    public async deleteOtherItemForm(idOtherItemForm: string) {
        try {
            await this._otheritemformsRepository.deleteOtherItemForm(idOtherItemForm);
        } catch (e) {
            throw e;
        }
    }

    public async getAllOtherItemForms(): Promise<IOtherItemForm[]> {
        let otheritemforms = await this._otheritemformsRepository.getAllOtherItemForms();
        if (otheritemforms) {
            let parsedOtherItemForms = otheritemforms.map(otheritemform => ObjectToInterface.ToOtherItemForm(otheritemform));
            return parsedOtherItemForms;
        }
        return null;
    }

    public async createOtherItemFormOptions(otheritemformoptions: IOtherItemFormOption[]): Promise<IOtherItemFormOption[]> {
        try {
            let assignedOtherItemFormOptions: IOtherItemFormOption[] = [];
            for (const otheritemformoption of otheritemformoptions) {
                if (!otheritemformoption.Id) {
                    let otheritemformoptionResponse = await this._otheritemformoptionController.createOtherItemFormOption(otheritemformoption);
                    if (otheritemformoptionResponse.Success) {
                        let newOtherItemFormOption = otheritemformoptionResponse.Response as IOtherItemFormOption;
                        assignedOtherItemFormOptions.push(newOtherItemFormOption);
                    } else {
                        console.error(`Error saving OtherItemFormOption: ${otheritemformoptionResponse.Message}`);
                    }
                } else {
                    assignedOtherItemFormOptions.push(otheritemformoption);
                }
            }
            return assignedOtherItemFormOptions;
        } catch (e) {
            throw e;
        }
    }
}
