import {DataSource} from "typeorm";
import express, {NextFunction, Request, Response, Router} from "express";
import {AllergyController} from "../Controllers/AllergyController";
import {Logger} from "logger-colors";
import {LoggerRequest} from "../Tools/Logger/LoggerRequest";
import {sendResponse} from "../Tools/Logger/SendResponse";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {IAllergy} from "../Models/Database/Interfaces/IAllergy";
import {decrypt, decryptENV} from "../Tools/Utils";
import {Allergy} from "../Models/Database/Entities/Allergy";

export function GetAllergiesRoutes(dataSource: DataSource): Router {
    const loggerCfg = {
        ...JSON.parse(decryptENV(process.env.LOGGER)),
        operationId: '/allergy'
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
    const allergyController = new AllergyController(logger, dataSource);

    router.post("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let allergy: Allergy = req.body as Allergy;
            let allergyResponse = await allergyController.createUpdateAllergy(allergy, true);
            if (allergyResponse.Success) {
                let newAllergy = allergyResponse.Response as IAllergy;
                gResponse = {
                    Success: true,
                    Message: "Success adding data",
                    Response: newAllergy
                }
                res.status(200);
            } else {
                gResponse = allergyResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error adding the allergy"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let allergys = await allergyController.getAllAllergies();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: allergys
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all allergys"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.put("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let allergy = req.body as Allergy;
            let allergyResponse = await allergyController.createUpdateAllergy(allergy, false);
            if (allergyResponse.Success) {
                let newAllergy = allergyResponse.Response as IAllergy;
                gResponse = {
                    Success: true,
                    Message: "Success updating data",
                    Response: newAllergy
                }
                res.status(200);
            } else {
                gResponse = allergyResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error updating the allergy"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.delete("/:idAllergy", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let allergyResponse = await allergyController.deleteAllergy(req.params.idAllergy);
            if (allergyResponse.Success) {
                let newAllergy = allergyResponse.Response as IAllergy;
                gResponse = {
                    Success: true,
                    Message: "Success updating data",
                    Response: newAllergy
                }
                res.status(200);
            } else {
                gResponse = allergyResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error updating the allergy"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    return router;
}

