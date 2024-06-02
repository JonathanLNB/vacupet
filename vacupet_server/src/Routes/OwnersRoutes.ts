import {DataSource} from "typeorm";
import express, {NextFunction, Request, Response, Router} from "express";
import {OwnerController} from "../Controllers/Person/OwnerController";
import {Logger} from "logger-colors";
import {LoggerRequest} from "../Tools/Logger/LoggerRequest";
import {sendResponse} from "../Tools/Logger/SendResponse";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {IOwner} from "../Models/Database/Interfaces/Person/IOwner";
import {decryptENV} from "../Tools/Utils";
import {Owner} from "../Models/Database/Entities/Person/Owner";

export function GetOwnersRoutes(dataSource: DataSource): Router {
    const loggerCfg = {
        ...JSON.parse(decryptENV(process.env.LOGGER)),
        operationId: '/owner'
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
    const ownerController = new OwnerController(logger, dataSource);

    router.get("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let owners = await ownerController.getAllOwners();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: owners
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all owners"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.put("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            const password = req.body.Password;
            delete req.body.Password;
            let owner = req.body as Owner;
            let ownerResponse = await ownerController.updateOwner(owner, false);
            if (ownerResponse.Success) {
                let newOwner = ownerResponse.Response as IOwner;
                gResponse = {
                    Success: true,
                    Message: "Success updating data",
                    Response: newOwner
                }
                res.status(200);
            } else {
                gResponse = ownerResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error updating the owner"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.delete("/:idOwner", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let ownerResponse = await ownerController.deleteOwner(req.params.idOwner);
            if (ownerResponse.Success) {
                let newOwner = ownerResponse.Response as IOwner;
                gResponse = {
                    Success: true,
                    Message: "Success updating data",
                    Response: newOwner
                }
                res.status(200);
            } else {
                gResponse = ownerResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error updating the owner"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    return router;
}

