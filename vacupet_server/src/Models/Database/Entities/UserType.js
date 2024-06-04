"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserType = void 0;
var typeorm_1 = require("typeorm");
var UserType = /** @class */ (function () {
    function UserType() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], UserType.prototype, "Id");
    __decorate([
        (0, typeorm_1.Column)()
    ], UserType.prototype, "Name");
    UserType = __decorate([
        (0, typeorm_1.Entity)()
    ], UserType);
    return UserType;
}());
exports.UserType = UserType;
