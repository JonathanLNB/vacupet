"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Owner = void 0;
var typeorm_1 = require("typeorm");
var Pet_1 = require("../Pet");
var User_1 = require("./User");
var Owner = /** @class */ (function () {
    function Owner() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], Owner.prototype, "Id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Owner.prototype, "Address");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return User_1.User; }, { cascade: true }),
        (0, typeorm_1.JoinColumn)()
    ], Owner.prototype, "User");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Pet_1.Pet; }, function (pet) { return pet.Owner; }, { cascade: true })
    ], Owner.prototype, "Pets");
    Owner = __decorate([
        (0, typeorm_1.Entity)()
    ], Owner);
    return Owner;
}());
exports.Owner = Owner;
