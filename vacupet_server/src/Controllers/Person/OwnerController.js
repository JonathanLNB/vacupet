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
exports.OwnerController = void 0;
var OwnerRepository_1 = require("../../Database/Repositories/Person/OwnerRepository");
var ObjectToInterface_1 = require("../../Tools/ExtensionMethods/ObjectToInterface");
var OwnerController = /** @class */ (function () {
    function OwnerController(logger, dataSource) {
        this.logger = logger;
        this._ownerRepository = new OwnerRepository_1.OwnerRepository(dataSource);
    }
    OwnerController.prototype.updateOwner = function (owner, create) {
        return __awaiter(this, void 0, void 0, function () {
            var newOwner, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._ownerRepository.createUpdateOwner(owner)];
                    case 1:
                        newOwner = _a.sent();
                        if (newOwner) {
                            return [2 /*return*/, { Success: true, Response: newOwner }];
                        }
                        else {
                            return [2 /*return*/, { Success: false, Message: "Impossible to ".concat(create ? 'create' : 'update', " owner in DB") }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.logger.error("An error occurred while ".concat(create ? 'adding' : 'updating', " a new owner"), e_1);
                        return [2 /*return*/, { Success: false, Message: "".concat(e_1.Message) }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OwnerController.prototype.deleteOwner = function (OwnerId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._ownerRepository.deleteOwner(OwnerId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { Success: true }];
                    case 2:
                        e_2 = _a.sent();
                        this.logger.error("Error while deleting a owner", e_2);
                        return [2 /*return*/, { Success: false }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OwnerController.prototype.getAllOwners = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allOwners, owners, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._ownerRepository.getAllOwners({
                                User: true,
                                Pets: {
                                    PetType: true,
                                    Allergies: true,
                                    Vaccinated: {
                                        Vaccine: true
                                    }
                                }
                            })];
                    case 1:
                        owners = _a.sent();
                        if (owners) {
                            allOwners = owners.map(function (owner) {
                                return ObjectToInterface_1.ObjectToInterface.ToOwner(owner);
                            });
                        }
                        return [2 /*return*/, allOwners];
                    case 2:
                        e_3 = _a.sent();
                        this.logger.error("Error while getting all owners", e_3);
                        throw new Error(e_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OwnerController;
}());
exports.OwnerController = OwnerController;
