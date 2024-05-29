import {DataSource} from "typeorm";
import {ObjectToInterface} from "../../../Tools/ExtensionMethods/ObjectToInterface";
import {InterfaceToObject} from "../../../Tools/ExtensionMethods/InterfaceToObject";
import {IDeductionFormOption} from "../../../Models/Database/Interfaces/TaxCodeForm/Deduction/IDeductionFormOption";
import {
    DeductionFormOptionRepository
} from "../../../Database/Repositories/TaxCodeForms/Deduction/DeductionFormOptionRepository";
import {Logger} from "logger-colors";
import {GenericResponse} from "../../../Models/Interfaces/GenericResponse";

export class DeductionFormOptionController {
    private _deductionFormOptionRepository: DeductionFormOptionRepository;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._deductionFormOptionRepository = new DeductionFormOptionRepository(dataSource);
    }

    public async createDeductionFormOption(deductionformoption: IDeductionFormOption): Promise<GenericResponse> {
        try {
            let addDeductionFormOption = await this._deductionFormOptionRepository.createUpdateDeductionFormOption(InterfaceToObject.ToDeductionFormOption(deductionformoption));
            return {Success: true, Response: ObjectToInterface.ToDeductionFormOption(addDeductionFormOption)};
        } catch (e) {
            this.logger.error(`Deduction Form Option not added or updated: ${e.message}`);
            return {Success: false, Message: "Deduction Form Option not added or updated"}
        }

    }

    public async deleteDeductionFormOption(idDeductionFormOption: string) {
        try {
            await this._deductionFormOptionRepository.deleteDeductionFormOption(idDeductionFormOption);
        } catch (e) {
            this.logger.error(`Deduction Form Option not deleted: ${e.message}`);
        }
    }

    public async getAllDeductionForm(): Promise<IDeductionFormOption[]> {
        let deductionFormOption = await this._deductionFormOptionRepository.getAllDeductionFormOptions();
        if (deductionFormOption) {
            return deductionFormOption.map(deductionformoption => ObjectToInterface.ToDeductionFormOption(deductionformoption));
        }
        return null;
    }
}
