"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Pet = void 0;
var typeorm_1 = require("typeorm");
var PetType_1 = require("./PetType");
var Owner_1 = require("./Person/Owner");
var Allergy_1 = require("./Allergy");
var Vaccinated_1 = require("./Vaccinated");
var Pet = /** @class */ (function () {
    function Pet() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], Pet.prototype, "Id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Pet.prototype, "Name");
    __decorate([
        (0, typeorm_1.Column)()
    ], Pet.prototype, "DateOfBirth");
    __decorate([
        (0, typeorm_1.Column)()
    ], Pet.prototype, "Gender");
    __decorate([
        (0, typeorm_1.Column)()
    ], Pet.prototype, "Race");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return PetType_1.PetType; }),
        (0, typeorm_1.JoinColumn)()
    ], Pet.prototype, "PetType");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Owner_1.Owner; }),
        (0, typeorm_1.JoinColumn)()
    ], Pet.prototype, "Owner");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Vaccinated_1.Vaccinated; }, function (vaccinated) { return vaccinated.Pet; })
    ], Pet.prototype, "Vaccinated");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Allergy_1.Allergy; }),
        (0, typeorm_1.JoinTable)({
            joinColumn: { name: "IdAllergy" }
        })
    ], Pet.prototype, "Allergies");
    Pet = __decorate([
        (0, typeorm_1.Entity)()
    ], Pet);
    return Pet;
}());
exports.Pet = Pet;
