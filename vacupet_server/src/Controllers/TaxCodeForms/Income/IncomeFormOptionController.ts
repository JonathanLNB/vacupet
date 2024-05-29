import {DataSource} from "typeorm";
import {ObjectToInterface} from "../../../Tools/ExtensionMethods/ObjectToInterface";
import {InterfaceToObject} from "../../../Tools/ExtensionMethods/InterfaceToObject";
import {IIncomeFormOption} from "../../../Models/Database/Interfaces/TaxCodeForm/Income/IIncomeFormOption";
import {
    IncomeFormOptionRepository
} from "../../../Database/Repositories/TaxCodeForms/Income/IncomeFormOptionRepository";
import {Logger} from "logger-colors";
import {GenericResponse} from "../../../Models/Interfaces/GenericResponse";

export class IncomeFormOptionController {
    private _incomeFormOptionRepository: IncomeFormOptionRepository;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._incomeFormOptionRepository = new IncomeFormOptionRepository(dataSource);
    }

    public async createIncomeFormOption(incomeformoption: IIncomeFormOption): Promise<GenericResponse> {
        try {
            let addIncomeFormOption = await this._incomeFormOptionRepository.createUpdateIncomeFormOption(InterfaceToObject.ToIncomeFormOption(incomeformoption));
            return {Success: true, Response: ObjectToInterface.ToIncomeFormOption(addIncomeFormOption)};
        } catch (e) {
            this.logger.error(`Income Form Option not added or updated: ${e.message}`);
            return {Success: false, Message: "Income Form Option not added or updated"}
        }

    }

    public async deleteIncomeFormOption(idIncomeFormOption: string) {
        try {
            await this._incomeFormOptionRepository.deleteIncomeFormOption(idIncomeFormOption);
        } catch (e) {
            this.logger.error(`Income Form Option not deleted: ${e.message}`);
        }
    }

    public async getAllIncomeForm(): Promise<IIncomeFormOption[]> {
        let incomeFormOption = await this._incomeFormOptionRepository.getAllIncomeFormOptions();
        if (incomeFormOption) {
            return incomeFormOption.map(incomeformoption => ObjectToInterface.ToIncomeFormOption(incomeformoption));
        }
        return null;
    }
}
