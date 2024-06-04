"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Vaccinated = void 0;
var typeorm_1 = require("typeorm");
var Pet_1 = require("./Pet");
var Vaccine_1 = require("./Vaccine");
var Vaccinated = /** @class */ (function () {
    function Vaccinated() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], Vaccinated.prototype, "Id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Vaccinated.prototype, "ApplicationDate");
    __decorate([
        (0, typeorm_1.Column)()
    ], Vaccinated.prototype, "NextApplicationDate");
    __decorate([
        (0, typeorm_1.Column)()
    ], Vaccinated.prototype, "Weight");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Pet_1.Pet; }, function (pet) { return pet.Vaccinated; })
    ], Vaccinated.prototype, "Pet");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Vaccine_1.Vaccine; }, function (vaccine) { return vaccine.Vaccinated; })
    ], Vaccinated.prototype, "Vaccine");
    Vaccinated = __decorate([
        (0, typeorm_1.Entity)()
    ], Vaccinated);
    return Vaccinated;
}());
exports.Vaccinated = Vaccinated;
