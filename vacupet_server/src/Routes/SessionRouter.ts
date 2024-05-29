import {DataSource} from "typeorm";
import express, {NextFunction, Request, Response, Router} from "express";
import {SessionController} from "../Controllers/SessionController";
import {Logger} from "logger-colors";
import {LoggerRequest} from "../Tools/Logger/LoggerRequest";
import {sendResponse} from "../Tools/Logger/SendResponse";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {CreateToken} from "../Middlewares/sessions";

export function GetSessionRoutes(dataSource: DataSource): Router {
    const loggerCfg = {
        ...JSON.parse(process.env.LOGGER),
        operationId: '/session'
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
    const userController = new SessionController(dataSource);

    router.post("/login", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let firebaseId = req.body.uidFirebase;
            let user = await userController.Login(firebaseId);
            if (user) {
                let accessToken = CreateToken(user);
                gResponse = {
                    Success: true,
                    Message: "Success login",
                    Response: user,
                    AccessToken: accessToken
                }
                res.status(200);
            } else {
                gResponse = {
                    Success: false,
                    Message: "User not found"
                }
                res.status(200);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error getting the user"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    return router;
}

