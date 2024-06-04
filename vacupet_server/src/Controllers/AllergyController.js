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
exports.AllergyController = void 0;
var AllergyRepository_1 = require("../Database/Repositories/AllergyRepository");
var ObjectToInterface_1 = require("../Tools/ExtensionMethods/ObjectToInterface");
var AllergyController = /** @class */ (function () {
    function AllergyController(logger, dataSource) {
        this.logger = logger;
        this._allergyRepository = new AllergyRepository_1.AllergyRepository(dataSource);
    }
    AllergyController.prototype.createUpdateAllergy = function (allergy, create) {
        return __awaiter(this, void 0, void 0, function () {
            var newAllergy, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._allergyRepository.createUpdateAllergy(allergy)];
                    case 1:
                        newAllergy = _a.sent();
                        if (newAllergy) {
                            return [2 /*return*/, { Success: true, Response: newAllergy }];
                        }
                        else {
                            return [2 /*return*/, { Success: false, Message: "Impossible to ".concat(create ? 'create' : 'update', " allergy in DB") }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.logger.error("An error occurred while ".concat(create ? 'adding' : 'updating', " a new allergy"), e_1);
                        return [2 /*return*/, { Success: false, Message: "".concat(e_1.Message) }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllergyController.prototype.deleteAllergy = function (AllergyId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._allergyRepository.deleteAllergy(AllergyId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { Success: true }];
                    case 2:
                        e_2 = _a.sent();
                        this.logger.error("Error while deleting an allergies", e_2);
                        return [2 /*return*/, { Success: false }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllergyController.prototype.getAllAllergies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allAllergies, allergies, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._allergyRepository.getAllAllergies()];
                    case 1:
                        allergies = _a.sent();
                        if (allergies) {
                            allAllergies = allergies.map(function (allergy) {
                                return ObjectToInterface_1.ObjectToInterface.ToAllergy(allergy);
                            });
                        }
                        return [2 /*return*/, allAllergies];
                    case 2:
                        e_3 = _a.sent();
                        this.logger.error("Error while getting all allergies", e_3);
                        throw new Error(e_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AllergyController;
}());
exports.AllergyController = AllergyController;