import {DataSource} from "typeorm";
import {PetRepository} from "../Database/Repositories/PetRepository";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {IPet} from "../Models/Database/Interfaces/IPet";
import {Pet} from "../Models/Database/Entities/Pet";
import {IVaccinated} from "../Models/Database/Interfaces/IVaccinated";
import {Vaccinated} from "../Models/Database/Entities/Vaccinated";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {Logger} from "logger-colors";
import {VaccinatedRepository} from "../Database/Repositories/VaccinatedRepository";

export class PetController {

    private logger: Logger;
    private _PetRepository: PetRepository;
    private _VaccinatedRepository: VaccinatedRepository;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._PetRepository = new PetRepository(dataSource);
    }

    public async createUpdatePet(Pet: Pet, create: boolean): Promise<GenericResponse> {
        try {
            let newPet = await this._PetRepository.createUpdatePet(Pet);
            if (newPet) {
                return {Success: true, Response: newPet};
            } else {
                return {Success: false, Message: `Impossible to ${create ? 'create' : 'update'} Pet in DB`}
            }

        } catch (e) {
            this.logger.error(`An error occurred while ${create ? 'adding' : 'updating'} a new Pet`, e)
            return {Success: false, Message: `${e.Message}`}
        }
    }

    public async createUpdateVaccinated(Vaccinated: Vaccinated): Promise<GenericResponse> {
        try {
            let newVaccinated = await this._VaccinatedRepository.createUpdateVaccinated(Vaccinated);
            if (newVaccinated) {
                return {Success: true, Response: newVaccinated};
            } else {
                return {Success: false, Message: `Impossible to create Vaccinated in DB`}
            }

        } catch (e) {
            this.logger.error(`An error occurred while adding a new Vaccinated`, e)
            return {Success: false, Message: `${e.Message}`}
        }
    }

    public async deletePet(PetId: string): Promise<GenericResponse> {
        try {
            await this._PetRepository.deletePet(PetId);
            return {Success: true};
        } catch (e) {
            this.logger.error("Error while deleting a Pet", e);
            return {Success: false};
        }
    }

    public async getAllPets(): Promise<IPet[]> {
        let allPets: IPet[]
        try {
            let Pets = await this._PetRepository.getAllPets({
                PetType: true,
                Owner: true,
                Allergies: true,
                Vaccinated: {
                    Vaccine: true
                }
            });
            if (Pets) {
                allPets = Pets.map((Pet) => {
                    return ObjectToInterface.ToPet(Pet);
                });
            }
            return allPets;
        } catch (e) {
            this.logger.error("Error while getting all Pets", e);
            throw new Error(e);
        }
    }
}
