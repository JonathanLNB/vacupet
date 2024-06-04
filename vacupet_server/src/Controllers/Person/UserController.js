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
exports.UserController = void 0;
var UserRepository_1 = require("../../Database/Repositories/Person/UserRepository");
var FirebaseRepository_1 = require("../../Database/Repositories/FirebaseRepository");
var ObjectToInterface_1 = require("../../Tools/ExtensionMethods/ObjectToInterface");
var OwnerRepository_1 = require("../../Database/Repositories/Person/OwnerRepository");
var UserTypes_1 = require("../../Enums/UserTypes");
var PetRepository_1 = require("../../Database/Repositories/PetRepository");
var UserController = /** @class */ (function () {
    function UserController(logger, dataSource) {
        this.logger = logger;
        this._userRepository = new UserRepository_1.UserRepository(dataSource);
        this._ownerRepository = new OwnerRepository_1.OwnerRepository(dataSource);
        this._petRepository = new PetRepository_1.PetRepository(dataSource);
        this._firebaseService = new FirebaseRepository_1.FirebaseRepository();
    }
    UserController.prototype.createUser = function (user, password) {
        return __awaiter(this, void 0, void 0, function () {
            var firebaseUser, newUser, newOwner_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this._firebaseService.addUser(ObjectToInterface_1.ObjectToInterface.ToFirebaseUser(user, password), user.UserType.Id === UserTypes_1.UserTypes.OWNER)];
                    case 1:
                        firebaseUser = _a.sent();
                        user.FirebaseId = firebaseUser.Uid;
                        console.log("Hola");
                        if (!firebaseUser.Success) return [3 /*break*/, 8];
                        console.log("Success");
                        return [4 /*yield*/, this._userRepository.createUpdateUser(user)];
                    case 2:
                        newUser = _a.sent();
                        console.log("Creando usuario");
                        if (!newUser) return [3 /*break*/, 6];
                        console.log("Success");
                        if (!(newUser.UserType.Id === UserTypes_1.UserTypes.ADMIN)) return [3 /*break*/, 3];
                        return [2 /*return*/, { Success: true, Response: firebaseUser }];
                    case 3:
                        console.log("Creando Owner");
                        user.Owner.User = newUser;
                        return [4 /*yield*/, this._ownerRepository.createUpdateOwner(user.Owner)];
                    case 4:
                        newOwner_1 = _a.sent();
                        if (newOwner_1) {
                            console.log("Success");
                            console.log("Creando Pets");
                            user.Owner.Pets.forEach(function (pet) {
                                pet.Owner = newOwner_1;
                                _this._petRepository.createUpdatePet(pet);
                            });
                            console.log("Success");
                            return [2 /*return*/, { Success: true, Response: firebaseUser }];
                        }
                        else {
                            return [2 /*return*/, { Success: false, Message: "Impossible to create owner in DB" }];
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, { Success: false, Message: "Impossible to create user in DB" }];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, { Success: false, Message: "Impossible to create user in Firebase" }];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_1 = _a.sent();
                        this.logger.error("An error occurred while adding a new user", e_1);
                        return [2 /*return*/, { Success: false, Message: "".concat(e_1.Message) }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (user, password) {
        return __awaiter(this, void 0, void 0, function () {
            var firebaseUser, newUser, newOwner_2, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this._firebaseService.updateUser(ObjectToInterface_1.ObjectToInterface.ToFirebaseUser(user, password))];
                    case 1:
                        firebaseUser = _a.sent();
                        user.FirebaseId = firebaseUser.Uid;
                        if (!firebaseUser) return [3 /*break*/, 8];
                        return [4 /*yield*/, this._userRepository.createUpdateUser(user)];
                    case 2:
                        newUser = _a.sent();
                        if (!newUser) return [3 /*break*/, 6];
                        if (!(newUser.UserType.Id === UserTypes_1.UserTypes.ADMIN)) return [3 /*break*/, 3];
                        return [2 /*return*/, { Success: true, Response: firebaseUser }];
                    case 3:
                        user.Owner.User = newUser;
                        return [4 /*yield*/, this._ownerRepository.createUpdateOwner(user.Owner)];
                    case 4:
                        newOwner_2 = _a.sent();
                        if (newOwner_2) {
                            user.Owner.Pets.forEach(function (pet) {
                                pet.Owner = newOwner_2;
                                _this._petRepository.createUpdatePet(pet);
                            });
                            return [2 /*return*/, { Success: true, Response: firebaseUser }];
                        }
                        else {
                            return [2 /*return*/, { Success: false, Message: "Impossible to create owner in DB" }];
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, { Success: false, Message: "Impossible to create user in DB" }];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, { Success: false, Message: "Impossible to create user in firebase" }];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_2 = _a.sent();
                        this.logger.error("An error occurred while updating a user", e_2);
                        return [2 /*return*/, { Success: false, Message: "".concat(e_2.Message) }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this._userRepository.getUserById(UserId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this._firebaseService.deleteUser(user.FirebaseId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._userRepository.deleteUser(UserId)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { Success: true }];
                    case 4:
                        e_3 = _a.sent();
                        return [2 /*return*/, { Success: false }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parsedOffices, Users, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userRepository.getAllUsers({
                                UserType: true
                            })];
                    case 1:
                        Users = _a.sent();
                        if (Users) {
                            parsedOffices = Users.map(function (User) {
                                return ObjectToInterface_1.ObjectToInterface.ToUser(User);
                            });
                        }
                        return [2 /*return*/, parsedOffices];
                    case 2:
                        e_4 = _a.sent();
                        this.logger.error("Error while getting all users", e_4);
                        throw new Error(e_4);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
