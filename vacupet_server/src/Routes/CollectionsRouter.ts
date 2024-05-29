import {DataSource} from "typeorm";
import express, {NextFunction, Request, Response, Router} from "express";
import {Logger} from "logger-colors";
import {LoggerRequest} from "../Tools/Logger/LoggerRequest";
import {sendResponse} from "../Tools/Logger/SendResponse";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {CollectionController} from "../Controllers/CollectionController";

export function GetCollectionsRoutes(dataSource: DataSource): Router {
    const loggerCfg = {
        ...JSON.parse(process.env.LOGGER),
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
    const collectionController = new CollectionController(dataSource);

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

    router.get("/States", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let states = await collectionController.getAllStates();
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

    router.get("/OptionTypes", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let optiontypes = await collectionController.getAllOptionTypes();
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

    router.get("/QuestionTypes", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let questiontypes = await collectionController.getAllQuestionTypes();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: questiontypes
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all question types"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/TaxCodeType", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let taxcodetypes = await collectionController.getAllTaxCodeType();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: taxcodetypes
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all taxcode types"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/Relation", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let questionOptions = await collectionController.getAllRelation();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: questionOptions
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all question options"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/BankMethodType", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let bankMethodTypes = await collectionController.getAllBankMethodType();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: bankMethodTypes
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all question options"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/AccountType", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let accountTypes = await collectionController.getAllAccountTypes();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: accountTypes
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all question options"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/TransferMethod", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let transferMethods = await collectionController.getAllTranferMethods();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: transferMethods
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting all question options"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    return router;
}

