import {DataSource} from "typeorm";
import express, {NextFunction, Request, Response, Router} from "express";
import {Logger} from "logger-colors";
import {LoggerRequest} from "../Tools/Logger/LoggerRequest";
import {sendResponse} from "../Tools/Logger/SendResponse";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {CollectionController} from "../Controllers/CollectionController";
import {decryptENV} from "../Tools/Utils";

export function GetCollectionsRoutes(dataSource: DataSource): Router {
    const loggerCfg = {
        ...JSON.parse(decryptENV(process.env.LOGGER)),
        operationId: '/collection'
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
    const collectionController = new CollectionController(logger, dataSource);

    router.get("/UsersTypes", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let usertypes = await collectionController.getAllUserTypes();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: usertypes
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all users"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/PetTypes", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let states = await collectionController.getAllPetTypes();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: states
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all states"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/Vaccines", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let optiontypes = await collectionController.getAllVaccines();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: optiontypes
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all option types"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);
    return router;
}

