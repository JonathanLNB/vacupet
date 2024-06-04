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
exports.CollectionController = void 0;
var UserTypeRepository_1 = require("../Database/Repositories/UserTypeRepository");
var ObjectToInterface_1 = require("../Tools/ExtensionMethods/ObjectToInterface");
var PetTypeRepository_1 = require("../Database/Repositories/PetTypeRepository");
var VaccineRepository_1 = require("../Database/Repositories/VaccineRepository");
var CollectionController = /** @class */ (function () {
    function CollectionController(logger, dataSource) {
        this.logger = logger;
        this._userTypeRepository = new UserTypeRepository_1.UserTypeRepository(dataSource);
        this._petTypeRepository = new PetTypeRepository_1.PetTypeRepository(dataSource);
        this._vaccineRepository = new VaccineRepository_1.VaccineRepository(dataSource);
    }
    CollectionController.prototype.getAllUserTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userTypes, userTypesAux, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userTypeRepository.getAllUserTypes()];
                    case 1:
                        userTypesAux = _a.sent();
                        if (userTypesAux) {
                            userTypes = userTypesAux.map(function (userType) {
                                return ObjectToInterface_1.ObjectToInterface.ToUserType(userType);
                            });
                        }
                        return [2 /*return*/, userTypes];
                    case 2:
                        e_1 = _a.sent();
                        this.logger.error("Error while getting all user types", e_1);
                        throw new Error(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CollectionController.prototype.getAllPetTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var petTypes, petTypesAux, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._petTypeRepository.getAllPetTypes()];
                    case 1:
                        petTypesAux = _a.sent();
                        if (petTypesAux) {
                            petTypes = petTypesAux.map(function (petType) {
                                return ObjectToInterface_1.ObjectToInterface.ToPetType(petType);
                            });
                        }
                        return [2 /*return*/, petTypes];
                    case 2:
                        e_2 = _a.sent();
                        this.logger.error("Error while getting all pet types", e_2);
                        throw new Error(e_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CollectionController.prototype.getAllVaccines = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vaccines, vaccinesAux, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._vaccineRepository.getAllVaccines()];
                    case 1:
                        vaccinesAux = _a.sent();
                        if (vaccinesAux) {
                            vaccines = vaccinesAux.map(function (vaccine) {
                                return ObjectToInterface_1.ObjectToInterface.ToVaccine(vaccine);
                            });
                        }
                        return [2 /*return*/, vaccines];
                    case 2:
                        e_3 = _a.sent();
                        this.logger.error("Error while getting all pet types", e_3);
                        throw new Error(e_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CollectionController;
}());
exports.CollectionController = CollectionController;
