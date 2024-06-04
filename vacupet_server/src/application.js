"use strict";
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
exports.App = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var express_basic_auth_1 = require("express-basic-auth");
var handler_1 = require("./Middlewares/handler");
var sessions_1 = require("./Middlewares/sessions");
var firebase_admin_1 = require("firebase-admin");
var package_json_1 = require("../package.json");
//import fileUpload from "express-fileupload";
var Paths_1 = require("./Enums/Paths");
var SessionRoutes_1 = require("./Routes/SessionRoutes");
var CollectionsRoutes_1 = require("./Routes/CollectionsRoutes");
var UsersRoutes_1 = require("./Routes/UsersRoutes");
var SettingsRoutes_1 = require("./Routes/SettingsRoutes");
var OwnersRoutes_1 = require("./Routes/OwnersRoutes");
var PetsRoutes_1 = require("./Routes/PetsRoutes");
var AllergiesRoutes_1 = require("./Routes/AllergiesRoutes");
var Utils_1 = require("./Tools/Utils");
var typeorm_1 = require("typeorm");
var Person_1 = require("./Models/Database/Entities/Person/Person");
var Setting_1 = require("./Models/Database/Entities/Setting");
var User_1 = require("./Models/Database/Entities/Person/User");
var UserType_1 = require("./Models/Database/Entities/UserType");
var Allergy_1 = require("./Models/Database/Entities/Allergy");
var Pet_1 = require("./Models/Database/Entities/Pet");
var Owner_1 = require("./Models/Database/Entities/Person/Owner");
var PetType_1 = require("./Models/Database/Entities/PetType");
var Vaccine_1 = require("./Models/Database/Entities/Vaccine");
var Vaccinated_1 = require("./Models/Database/Entities/Vaccinated");
var AdminFirebaseFile = require(process.env.FIREBASE_ADMIN_FILE);
var App = /** @class */ (function () {
    function App(port, routes, apiPath, staticPath) {
        if (apiPath === void 0) { apiPath = '/api'; }
        if (staticPath === void 0) { staticPath = "public"; }
        var _this = this;
        this.port = port;
        this.apiPath = apiPath;
        this.staticPath = staticPath;
        this.server();
        this.cors();
        this.firebase().then(function () {
            _this.database().then(function () {
                _this.assets(_this.staticPath);
                _this.routes();
                _this.app.use((0, express_basic_auth_1["default"])({
                    users: JSON.parse((0, Utils_1.decryptENV)(process.env.BA_USERPASS)),
                    unauthorizedResponse: sessions_1.GetUnauthorizedResponse
                }));
                _this.app.use('/api/session', (0, SessionRoutes_1.GetSessionRoutes)(_this.AppDataSource));
                _this.app.use(handler_1.NotFound);
                _this.app.use(handler_1.ErrorHandler);
                console.log("System intialized");
            });
        });
    }
    App.prototype.server = function () {
        this.app = (0, express_1["default"])();
        this.app.use(express_1["default"].json({ limit: '50mb' }));
        this.app.use(express_1["default"].urlencoded({ limit: '50mb', extended: true }));
        //this.app.use(fileUpload({}));
    };
    App.prototype.routes = function () {
        this.app.use("/api/collection", sessions_1.IsAuth, (0, CollectionsRoutes_1.GetCollectionsRoutes)(this.AppDataSource));
        this.app.use("/api/user", sessions_1.IsAuth, (0, UsersRoutes_1.GetUsersRoutes)(this.AppDataSource));
        this.app.use("/api/setting", sessions_1.IsAuth, (0, SettingsRoutes_1.GetSettingsRoutes)(this.AppDataSource));
        this.app.use("/api/allergy", sessions_1.IsAuth, (0, AllergiesRoutes_1.GetAllergiesRoutes)(this.AppDataSource));
        this.app.use("/api/owner", sessions_1.IsAuth, (0, OwnersRoutes_1.GetOwnersRoutes)(this.AppDataSource));
        this.app.use("/api/pet", sessions_1.IsAuth, (0, PetsRoutes_1.GetPetsRoutes)(this.AppDataSource));
    };
    App.prototype.assets = function (path) {
        this.app.use(express_1["default"].static(path));
        this.app.use(Paths_1.Paths.DefaultServicePath, express_1["default"].static(path));
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server listening on port:", _this.port);
            console.log("Version:", package_json_1["default"].version);
        });
    };
    App.prototype.cors = function () {
        var corsConfig = {
            origin: '*',
            optionsSuccessStatus: 200
        };
        this.app.use((0, cors_1["default"])(corsConfig));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    App.prototype.firebase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var remoteConfig, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        firebase_admin_1["default"].initializeApp({
                            credential: firebase_admin_1["default"].credential.cert(AdminFirebaseFile)
                        });
                        _b = (_a = JSON).parse;
                        _d = (_c = JSON).stringify;
                        return [4 /*yield*/, firebase_admin_1["default"].remoteConfig().getTemplate()];
                    case 1:
                        remoteConfig = _b.apply(_a, [_d.apply(_c, [(_e.sent()).parameters])]);
                        process.env.ENV_SECRET_KEY = remoteConfig['SECRET_KEY'].defaultValue.value;
                        process.env.ENV_SECRET_IV = remoteConfig['SECRET_IV'].defaultValue.value;
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.database = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DataSourceOptions, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        DataSourceOptions = {
                            type: "postgres",
                            host: (0, Utils_1.decryptENV)(process.env.DATABASE_HOST),
                            port: Number.parseInt((0, Utils_1.decryptENV)(process.env.DATABASE_PORT)),
                            username: (0, Utils_1.decryptENV)(process.env.DATABASE_USER),
                            password: (0, Utils_1.decryptENV)(process.env.DATABASE_PASSWORD),
                            database: (0, Utils_1.decryptENV)(process.env.DATABASE_DB),
                            synchronize: true,
                            logging: false,
                            entities: [Person_1.Person, Setting_1.Setting, User_1.User, UserType_1.UserType, Allergy_1.Allergy, Pet_1.Pet, Owner_1.Owner, PetType_1.PetType, Vaccine_1.Vaccine, Vaccinated_1.Vaccinated],
                            migrations: ["src/migrations/**/*.ts"]
                        };
                        this.AppDataSource = new typeorm_1.DataSource(DataSourceOptions);
                        return [4 /*yield*/, this.AppDataSource.initialize()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error("Error initializing database", e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
