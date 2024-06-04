import {DataSource} from "typeorm";
import {OwnerRepository} from "../../Database/Repositories/Person/OwnerRepository";
import {GenericResponse} from "../../Models/Interfaces/GenericResponse";
import {IOwner} from "../../Models/Database/Interfaces/Person/IOwner";
import {Owner} from "../../Models/Database/Entities/Person/Owner";
import {ObjectToInterface} from "../../Tools/ExtensionMethods/ObjectToInterface";
import {Logger} from "logger-colors";

export class OwnerController {

    private logger: Logger;
    private _ownerRepository: OwnerRepository;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._ownerRepository = new OwnerRepository(dataSource);
    }

    public async updateOwner(owner: Owner, create: boolean): Promise<GenericResponse> {
        try {
            let newOwner = await this._ownerRepository.createUpdateOwner(owner);
            if (newOwner) {
                return {Success: true, Response: newOwner};
            } else {
                return {Success: false, Message: `Impossible to ${create ? 'create' : 'update'} owner in DB`}
            }

        } catch (e) {
            this.logger.error(`An error occurred while ${create ? 'adding' : 'updating'} a new owner`, e)
            return {Success: false, Message: `${e.Message}`}
        }
    }

    public async deleteOwner(OwnerId: string): Promise<GenericResponse> {
        try {
            await this._ownerRepository.deleteOwner(OwnerId);
            return {Success: true};
        } catch (e) {
            this.logger.error("Error while deleting a owner", e);
            return {Success: false};
        }
    }

    public async getAllOwners(): Promise<IOwner[]> {
        let allOwners: IOwner[]
        try {
            let owners = await this._ownerRepository.getAllOwners({
                User: true,
                Pets: {
                    PetType: true,
                    Allergies: true,
                    Vaccinated: {
                        Vaccine: true
                    }
                }
            });
            if (owners) {
                allOwners = owners.map((owner) => {
                    return ObjectToInterface.ToOwner(owner);
                });
            }
            return allOwners;
        } catch (e) {
            this.logger.error("Error while getting all owners", e);
            throw new Error(e);
        }
    }
}
