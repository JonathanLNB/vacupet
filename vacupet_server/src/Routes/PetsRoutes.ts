import {DataSource} from "typeorm";
import express, {NextFunction, Request, Response, Router} from "express";
import {PetController} from "../Controllers/PetController";
import {Logger} from "logger-colors";
import {LoggerRequest} from "../Tools/Logger/LoggerRequest";
import {sendResponse} from "../Tools/Logger/SendResponse";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {IPet} from "../Models/Database/Interfaces/IPet";
import {decryptENV} from "../Tools/Utils";
import {Pet} from "../Models/Database/Entities/Pet";
import {Vaccinated} from "../Models/Database/Entities/Vaccinated";
import {IVaccinated} from "../Models/Database/Interfaces/IVaccinated";

export function GetPetsRoutes(dataSource: DataSource): Router {
    const loggerCfg = {
        ...JSON.parse(decryptENV(process.env.LOGGER)),
        operationId: '/pet'
    }

    const logger = new Logger(loggerCfg);
    const loggerOptions = LoggerRequest({
        logger,
        smallJsonOptions: {
            protectKeys: [],
            symbolProtection: ''
        }
    })
    const router = express.Router();
    const petController = new PetController(logger, dataSource);

    router.post("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let pet: Pet = req.body as Pet;
            let petResponse = await petController.createUpdatePet(pet, true);
            if (petResponse.Success) {
                let newPet = petResponse.Response as IPet;
                gResponse = {
                    Success: true,
                    Message: "Success adding data",
                    Response: newPet
                }
                res.status(200);
            } else {
                gResponse = petResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error adding the pet"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.post("/vaccinated", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let pet: Vaccinated = req.body as Vaccinated;
            let petResponse = await petController.createUpdateVaccinated(pet);
            if (petResponse.Success) {
                let newVaccinated = petResponse.Response as IVaccinated;
                gResponse = {
                    Success: true,
                    Message: "Success adding data",
                    Response: newVaccinated
                }
                res.status(200);
            } else {
                gResponse = petResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error adding the pet"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let pets = await petController.getAllPets();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: pets
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all pets"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.put("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let pet = req.body as Pet;
            let petResponse = await petController.createUpdatePet(pet, false);
            if (petResponse.Success) {
                let newPet = petResponse.Response as IPet;
                gResponse = {
                    Success: true,
                    Message: "Success updating data",
                    Response: newPet
                }
                res.status(200);
            } else {
                gResponse = petResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error updating the pet"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.delete("/:idPet", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let petResponse = await petController.deletePet(req.params.idPet);
            if (petResponse.Success) {
                let newPet = petResponse.Response as IPet;
                gResponse = {
                    Success: true,
                    Message: "Success updating data",
                    Response: newPet
                }
                res.status(200);
            } else {
                gResponse = petResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error updating the pet"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    return router;
}

