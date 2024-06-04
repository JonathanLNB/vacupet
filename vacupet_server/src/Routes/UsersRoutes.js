"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GetUsersRoutes = void 0;
var express_1 = require("express");
var UserController_1 = require("../Controllers/Person/UserController");
var logger_colors_1 = require("logger-colors");
var LoggerRequest_1 = require("../Tools/Logger/LoggerRequest");
var SendResponse_1 = require("../Tools/Logger/SendResponse");
var Utils_1 = require("../Tools/Utils");
function GetUsersRoutes(dataSource) {
    var _this = this;
    var loggerCfg = __assign(__assign({}, JSON.parse((0, Utils_1.decryptENV)(process.env.LOGGER))), { operationId: '/user' });
    var logger = new logger_colors_1.Logger(loggerCfg);
    var loggerOptions = (0, LoggerRequest_1.LoggerRequest)({
        logger: logger,
        smallJsonOptions: {
            protectKeys: [],
            symbolProtection: ''
        }
    });
    var router = express_1["default"].Router();
    var userController = new UserController_1.UserController(logger, dataSource);
    router.post("/", [loggerOptions, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var gResponse, password, user, userResponse, newUser, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        password = req.body.Password ? (0, Utils_1.decrypt)(req.body.Password) : (0, Utils_1.decryptENV)(process.env.PS_TEMPORAL);
                        if (req.body.Password)
                            delete req.body.Password;
                        user = req.body;
                        return [4 /*yield*/, userController.createUser(user, password)];
                    case 1:
                        userResponse = _a.sent();
                        if (userResponse.Success) {
                            newUser = userResponse.Response;
                            gResponse = {
                                Success: true,
                                Message: "Success adding data",
                                Response: newUser
                            };
                            res.status(200);
                        }
                        else {
                            gResponse = userResponse;
                            res.status(500);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _a.sent();
                        logger.error(e_1);
                        gResponse = {
                            Success: false,
                            Message: "Error adding the user"
                        };
                        res.status(500);
                        return [3 /*break*/, 4];
                    case 3:
                        (0, SendResponse_1.sendResponse)(logger, gResponse, res);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); }]);
    router.get("/", [loggerOptions, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var gResponse, users, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, userController.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        gResponse = {
                            Success: true,
                            Message: "Success getting data",
                            Response: users
                        };
                        res.status(200);
                        return [3 /*break*/, 4];
                    case 2:
                        e_2 = _a.sent();
                        gResponse = {
                            Success: false,
                            Message: "Error getting all users"
                        };
                        res.status(500);
                        return [3 /*break*/, 4];
                    case 3:
                        (0, SendResponse_1.sendResponse)(logger, gResponse, res);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); }]);
    router.put("/", [loggerOptions, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var gResponse, password, user, userResponse, newUser, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        password = req.body.Password;
                        delete req.body.Password;
                        user = req.body;
                        return [4 /*yield*/, userController.updateUser(user, password)];
                    case 1:
                        userResponse = _a.sent();
                        if (userResponse.Success) {
                            newUser = userResponse.Response;
                            gResponse = {
                                Success: true,
                                Message: "Success updating data",
                                Response: newUser
                            };
                            res.status(200);
                        }
                        else {
                            gResponse = userResponse;
                            res.status(500);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        e_3 = _a.sent();
                        gResponse = {
                            Success: false,
                            Message: "Error updating the user"
                        };
                        res.status(500);
                        return [3 /*break*/, 4];
                    case 3:
                        (0, SendResponse_1.sendResponse)(logger, gResponse, res);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); }]);
    router["delete"]("/:idUser", [loggerOptions, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var gResponse, userResponse, newUser, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, userController.deleteUser(req.params.idUser)];
                    case 1:
                        userResponse = _a.sent();
                        if (userResponse.Success) {
                            newUser = userResponse.Response;
                            gResponse = {
                                Success: true,
                                Message: "Success updating data",
                                Response: newUser
                            };
                            res.status(200);
                        }
                        else {
                            gResponse = userResponse;
                            res.status(500);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        e_4 = _a.sent();
                        gResponse = {
                            Success: false,
                            Message: "Error updating the user"
                        };
                        res.status(500);
                        return [3 /*break*/, 4];
                    case 3:
                        (0, SendResponse_1.sendResponse)(logger, gResponse, res);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); }]);
    return router;
}
exports.GetUsersRoutes = GetUsersRoutes;
