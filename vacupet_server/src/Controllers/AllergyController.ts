import {DataSource} from "typeorm";
import {AllergyRepository} from "../Database/Repositories/AllergyRepository";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {IAllergy} from "../Models/Database/Interfaces/IAllergy";
import {Allergy} from "../Models/Database/Entities/Allergy";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {Logger} from "logger-colors";

export class AllergyController {

    private logger: Logger;
    private _allergyRepository: AllergyRepository;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._allergyRepository = new AllergyRepository(dataSource);
    }

    public async createUpdateAllergy(allergy: Allergy, create: boolean): Promise<GenericResponse> {
        try {
            let newAllergy = await this._allergyRepository.createUpdateAllergy(allergy);
            if (newAllergy) {
                return {Success: true, Response: newAllergy};
            } else {
                return {Success: false, Message: `Impossible to ${create ? 'create' : 'update'} allergy in DB`}
            }

        } catch (e) {
            this.logger.error(`An error occurred while ${create ? 'adding' : 'updating'} a new allergy`, e)
            return {Success: false, Message: `${e.Message}`}
        }
    }

    public async deleteAllergy(AllergyId: string): Promise<GenericResponse> {
        try {
            await this._allergyRepository.deleteAllergy(AllergyId);
            return {Success: true};
        } catch (e) {
            this.logger.error("Error while deleting an allergies", e);
            return {Success: false};
        }
    }

    public async getAllAllergies(): Promise<IAllergy[]> {
        let allAllergies: IAllergy[]
        try {
            let allergies = await this._allergyRepository.getAllAllergies();
            if (allergies) {
                allAllergies = allergies.map((allergy) => {
                    return ObjectToInterface.ToAllergy(allergy);
                });
            }
            return allAllergies;
        } catch (e) {
            this.logger.error("Error while getting all allergies", e);
            throw new Error(e);
        }
    }
}
