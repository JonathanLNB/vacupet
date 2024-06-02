import {DataSource} from "typeorm";
import express, {NextFunction, Request, Response, Router} from "express";
import {UserController} from "../Controllers/Person/UserController";
import {Logger} from "logger-colors";
import {LoggerRequest} from "../Tools/Logger/LoggerRequest";
import {sendResponse} from "../Tools/Logger/SendResponse";
import {GenericResponse} from "../Models/Interfaces/GenericResponse";
import {IUser} from "../Models/Database/Interfaces/Person/IUser";
import {decrypt, decryptENV} from "../Tools/Utils";
import {User} from "../Models/Database/Entities/Person/User";

export function GetUsersRoutes(dataSource: DataSource): Router {
    const loggerCfg = {
        ...JSON.parse(decryptENV(process.env.LOGGER)),
        operationId: '/user'
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
    const userController = new UserController(logger, dataSource);

    router.post("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            const password = decrypt(req.body.Password);
            delete req.body.Password;
            let user: User = req.body as User;
            let userResponse = await userController.createUser(user, password);
            if (userResponse.Success) {
                let newUser = userResponse.Response as IUser;
                gResponse = {
                    Success: true,
                    Message: "Success adding data",
                    Response: newUser
                }
                res.status(200);
            } else {
                gResponse = userResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error adding the user"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.get("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let users = await userController.getAllUsers();
            gResponse = {
                Success: true,
                Message: "Success getting data",
                Response: users
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

    router.put("/", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            const password = req.body.Password;
            delete req.body.Password;
            let user = req.body as User;
            let userResponse = await userController.updateUser(user, password);
            if (userResponse.Success) {
                let newUser = userResponse.Response as IUser;
                gResponse = {
                    Success: true,
                    Message: "Success updating data",
                    Response: newUser
                }
                res.status(200);
            } else {
                gResponse = userResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error updating the user"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    router.delete("/:idUser", [loggerOptions, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let gResponse: GenericResponse;
        try {
            let userResponse = await userController.deleteUser(req.params.idUser);
            if (userResponse.Success) {
                let newUser = userResponse.Response as IUser;
                gResponse = {
                    Success: true,
                    Message: "Success updating data",
                    Response: newUser
                }
                res.status(200);
            } else {
                gResponse = userResponse
                res.status(500);
            }
        } catch (e) {
            gResponse = {
                Success: false,
                Message: "Error updating the user"
            }
            res.status(500);
        } finally {
            sendResponse(logger, gResponse, res);
        }
    }]);

    return router;
}

