"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Vaccine = void 0;
var typeorm_1 = require("typeorm");
var Vaccinated_1 = require("./Vaccinated");
var Vaccine = /** @class */ (function () {
    function Vaccine() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], Vaccine.prototype, "Id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Vaccine.prototype, "Name");
    __decorate([
        (0, typeorm_1.Column)()
    ], Vaccine.prototype, "Description");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Vaccinated_1.Vaccinated; }, function (vaccinated) { return vaccinated.Vaccine; })
    ], Vaccine.prototype, "Vaccinated");
    Vaccine = __decorate([
        (0, typeorm_1.Entity)()
    ], Vaccine);
    return Vaccine;
}());
exports.Vaccine = Vaccine;
