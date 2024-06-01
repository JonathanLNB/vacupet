import {DataSource} from "typeorm";
import {UserTypeRepository} from "../Database/Repositories/UserTypeRepository";
import {IUserType} from "../Models/Database/Interfaces/IUserType";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {IPetType} from "../Models/Database/Interfaces/IPetType";
import {PetTypeRepository} from "../Database/Repositories/PetTypeRepository";
import {VaccineRepository} from "../Database/Repositories/VaccineRepository";
import {IVaccine} from "../Models/Database/Interfaces/IVaccine";
import {Logger} from "logger-colors";

export class CollectionController {

    private logger: Logger;
    private _userTypeRepository: UserTypeRepository;
    private _petTypeRepository: PetTypeRepository;
    private _vaccineRepository: VaccineRepository;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._userTypeRepository = new UserTypeRepository(dataSource);
        this._petTypeRepository = new PetTypeRepository(dataSource);
        this._vaccineRepository = new VaccineRepository(dataSource);
    }

    public async getAllUserTypes(): Promise<IUserType[]> {
        let userTypes: IUserType[]
        try {
            let userTypesAux = await this._userTypeRepository.getAllUserTypes();
            if (userTypesAux) {
                userTypes = userTypesAux.map((userType) => {
                    return ObjectToInterface.ToUserType(userType);
                });
            }
            return userTypes;
        } catch (e) {
            this.logger.error("Error while getting all user types", e);
            throw new Error(e);
        }
    }

    public async getAllPetTypes(): Promise<IPetType[]> {
        let petTypes: IPetType[]
        try {
            let petTypesAux = await this._petTypeRepository.getAllPetTypes();
            if (petTypesAux) {
                petTypes = petTypesAux.map((petType) => {
                    return ObjectToInterface.ToPetType(petType);
                });
            }
            return petTypes;
        } catch (e) {
            this.logger.error("Error while getting all pet types", e);
            throw new Error(e);
        }
    }

    public async getAllVaccines(): Promise<IVaccine[]> {
        let vaccines: IVaccine[]
        try {
            let vaccinesAux = await this._vaccineRepository.getAllVaccines();
            if (vaccinesAux) {
                vaccines = vaccinesAux.map((vaccine) => {
                    return ObjectToInterface.ToVaccine(vaccine);
                });
            }
            return vaccines;
        } catch (e) {
            this.logger.error("Error while getting all pet types", e);
            throw new Error(e);
        }
    }
}
