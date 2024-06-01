import express, {NextFunction, Request, Response, Router} from "express";
import {DataSource} from "typeorm";
import {SettingsController} from "../Controllers/SettingsController";
import {Logger} from "logger-colors";
import {LoggerRequest} from "../Tools/Logger/LoggerRequest";
import {sendResponse} from "../Tools/Logger/SendResponse";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {ISetting} from "../Models/Database/Interfaces/ISetting";
import {Setting} from "../Models/Database/Entities/Setting";
import {decryptENV} from "../Tools/Utils";

export function GetSettingRoutes(dataSource: DataSource): Router {
    const loggerCfg = {
        ...JSON.parse(decryptENV(process.env.LOGGER)),
        operationId: '/setting'
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
    const settingController = new SettingsController(logger, dataSource);

    router.post('/', [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        let setting = req.body as Setting;
        try {
            let settingResponse = await settingController.createUpdateSetting(setting);
            gResponse = {
                Success: true,
                Message: "Success adding setting",
                Response: settingResponse,
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: 'Error updating a setting',
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get('/', [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let settings = await settingController.getAllSettings();
            gResponse = {
                Success: true,
                Message: "Success getting settings",
                Response: settings
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: 'Error getting data',
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.put('/', [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        let setting = req.body as ISetting;
        try {
            let settingResponse = await settingController.createUpdateSetting(setting);
            gResponse = {
                Success: true,
                Message: "Success updating setting",
                Response: settingResponse,
            }
            res.status(200);
        } catch (e) {
            gResponse = {
                Success: false,
                Message: 'Error updating a setting',
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }

    }]);
    return router;
}
