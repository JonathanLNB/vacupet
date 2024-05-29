import {DataSource} from "typeorm";
import {ObjectToInterface} from "../../../Tools/ExtensionMethods/ObjectToInterface";
import {InterfaceToObject} from "../../../Tools/ExtensionMethods/InterfaceToObject";
import {IOtherItemFormOption} from "../../../Models/Database/Interfaces/TaxCodeForm/OtherItem/IOtherItemFormOption";
import {
    OtherItemFormOptionRepository
} from "../../../Database/Repositories/TaxCodeForms/OtherItem/OtherItemFormOptionRepository";
import {Logger} from "logger-colors";
import {GenericResponse} from "../../../Models/Interfaces/GenericResponse";

export class OtherItemFormOptionController {
    private _otheritemFormOptionRepository: OtherItemFormOptionRepository;
    private logger: Logger;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._otheritemFormOptionRepository = new OtherItemFormOptionRepository(dataSource);
    }

    public async createOtherItemFormOption(otheritemformoption: IOtherItemFormOption): Promise<GenericResponse> {
        try {
            let addOtherItemFormOption = await this._otheritemFormOptionRepository.createUpdateOtherItemFormOption(InterfaceToObject.ToOtherItemFormOption(otheritemformoption));
            return {Success: true, Response: ObjectToInterface.ToOtherItemFormOption(addOtherItemFormOption)};
        } catch (e) {
            this.logger.error(`OtherItem Form Option not added or updated: ${e.message}`);
            return {Success: false, Message: "Other_item Form Option not added or updated"}
        }

    }

    public async deleteOtherItemFormOption(idOtherItemFormOption: string) {
        try {
            await this._otheritemFormOptionRepository.deleteOtherItemFormOption(idOtherItemFormOption);
        } catch (e) {
            this.logger.error(`OtherItem Form Option not deleted: ${e.message}`);
        }
    }

    public async getAllOtherItemForm(): Promise<IOtherItemFormOption[]> {
        let otheritemFormOption = await this._otheritemFormOptionRepository.getAllOtherItemFormOptions();
        if (otheritemFormOption) {
            return otheritemFormOption.map(otheritemformoption => ObjectToInterface.ToOtherItemFormOption(otheritemformoption));
        }
        return null;
    }
}
