import {DataSource} from "typeorm";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {IOffice} from "../Models/Database/Interfaces/IOffice";
import {OfficeRepository} from "../Database/Repositories/OfficeRepository";
import {InterfaceToObject} from "../Tools/ExtensionMethods/InterfaceToObject";

export class OfficesController {
    private _officesRepository: OfficeRepository;

    constructor(dataSource: DataSource) {
        this._officesRepository = new OfficeRepository(dataSource);
    }

    public async createOffice(office: IOffice): Promise<IOffice> {
        try {
            let addOffice = await this._officesRepository.createUpdateOffice(InterfaceToObject.ToOffice(office));
            return addOffice;
        } catch (e) {
            throw e;
        }

    }

    public async deleteOffice(idOffice: string) {
        try {
            await this._officesRepository.deleteOffice(idOffice);
        } catch (e) {
            throw e;
        }
    }

    public async getAllOffices(): Promise<IOffice[]> {
        let offices = await this._officesRepository.getAllOffices();
        if (offices) {
            let parsedOffices = offices.map(office => ObjectToInterface.ToOffice(office));
            return parsedOffices;
        }
        return null;
    }
}
