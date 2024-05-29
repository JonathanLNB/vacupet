import {DataSource} from "typeorm";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {IBank} from "../Models/Database/Interfaces/IBank";
import {BankRepository} from "../Database/Repositories/BankRepository";
import {InterfaceToObject} from "../Tools/ExtensionMethods/InterfaceToObject";

export class BanksController {
    private _banksRepository: BankRepository;

    constructor(dataSource: DataSource) {
        this._banksRepository = new BankRepository(dataSource);
    }

    public async createBank(bank: IBank): Promise<IBank> {
        try {
            let addBank = await this._banksRepository.createUpdateBank(InterfaceToObject.ToBank(bank));
            return ObjectToInterface.ToBank(addBank);
        } catch (e) {
            throw e;
        }

    }

    public async deleteBank(idBank: string) {
        try {
            await this._banksRepository.deleteBank(idBank);
        } catch (e) {
            throw e;
        }
    }

    public async getAllBanks(): Promise<IBank[]> {
        let banks = await this._banksRepository.getAllBanks();
        if (banks) {
            let parsedBanks = banks.map(bank => ObjectToInterface.ToBank(bank));
            return parsedBanks;
        }
        return null;
    }
}
