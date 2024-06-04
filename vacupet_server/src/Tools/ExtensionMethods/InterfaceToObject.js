"use strict";
exports.__esModule = true;
exports.InterfaceToObject = void 0;
var Owner_1 = require("../../Models/Database/Entities/Person/Owner");
var User_1 = require("../../Models/Database/Entities/Person/User");
var Setting_1 = require("../../Models/Database/Entities/Setting");
var Allergy_1 = require("../../Models/Database/Entities/Allergy");
var PetType_1 = require("../../Models/Database/Entities/PetType");
var Vaccine_1 = require("../../Models/Database/Entities/Vaccine");
var Vaccinated_1 = require("../../Models/Database/Entities/Vaccinated");
var Pet_1 = require("../../Models/Database/Entities/Pet");
var InterfaceToObject = /** @class */ (function () {
    function InterfaceToObject() {
    }
    InterfaceToObject.ToAllergy = function (iAllergy) {
        var allergy = new Allergy_1.Allergy();
        if (iAllergy.Id)
            allergy.Id = iAllergy.Id;
        allergy.Name = iAllergy.Name;
        allergy.Description = iAllergy.Description;
        return allergy;
    };
    InterfaceToObject.ToPetType = function (iPetType) {
        var petType = new PetType_1.PetType();
        if (iPetType.Id)
            petType.Id = iPetType.Id;
        petType.Name = iPetType.Name;
        return petType;
    };
    InterfaceToObject.ToVaccine = function (iVaccine) {
        var vaccine = new Vaccine_1.Vaccine();
        if (iVaccine.Id)
            vaccine.Id = iVaccine.Id;
        vaccine.Name = iVaccine.Name;
        vaccine.Description = iVaccine.Description;
        return vaccine;
    };
    InterfaceToObject.ToSetting = function (iSetting) {
        var setting = new Setting_1.Setting();
        if (iSetting.Id)
            setting.Id = iSetting.Id;
        setting.Name = iSetting.Name;
        setting.Description = iSetting.Description;
        setting.Value = iSetting.Value;
        return setting;
    };
    InterfaceToObject.ToUser = function (iUser) {
        var owner = new User_1.User();
        if (iUser.Id)
            owner.Id = iUser.Id;
        owner.Firstname = iUser.Firstname;
        owner.Middlename = iUser.Middlename;
        owner.Lastname = iUser.Lastname;
        owner.Email = iUser.Email;
        owner.PhoneNumber = iUser.PhoneNumber;
        owner.DateOfBirth = iUser.DateOfBirth;
        owner.FirebaseId = iUser.FirebaseId;
        if (iUser.Owner)
            owner.Owner = this.ToOwner(iUser.Owner);
        return owner;
    };
    InterfaceToObject.ToOwner = function (iOwner) {
        var owner = new Owner_1.Owner();
        if (iOwner.Id)
            owner.Id = iOwner.Id;
        if (iOwner.User)
            owner.User = this.ToUser(iOwner.User);
        owner.Address = iOwner.Address;
        return owner;
    };
    InterfaceToObject.ToOwnerPets = function (iOwner) {
        var _this = this;
        var owner = this.ToOwner(iOwner);
        var pets = [];
        iOwner.Pets.forEach(function (pet) {
            pets.push(_this.ToPet(pet));
        });
        owner.Pets = pets;
        return owner;
    };
    InterfaceToObject.ToPet = function (iPet) {
        var _this = this;
        var pet = new Pet_1.Pet();
        var allergies = [];
        var vaccines = [];
        if (iPet.Id)
            pet.Id = iPet.Id;
        pet.Name = iPet.Name;
        pet.DateOfBirth = iPet.DateOfBirth;
        pet.Gender = iPet.Gender;
        pet.Race = iPet.Race;
        pet.PetType = this.ToPetType(iPet.PetType);
        pet.Owner = this.ToOwner(iPet.Owner);
        iPet.Allergies.forEach(function (allergy) {
            allergies.push(_this.ToAllergy(allergy));
        });
        iPet.Vaccinated.forEach(function (vaccinated) {
            vaccines.push(_this.ToVaccinated(vaccinated));
        });
        pet.Allergies = allergies;
        pet.Vaccinated = vaccines;
        return pet;
    };
    InterfaceToObject.ToVaccinated = function (iVaccinated) {
        var vaccinated = new Vaccinated_1.Vaccinated();
        if (iVaccinated.Id)
            vaccinated.Id = iVaccinated.Id;
        vaccinated.ApplicationDate = iVaccinated.ApplicationDate;
        vaccinated.NextApplicationDate = iVaccinated.NextApplicationDate;
        vaccinated.Weight = iVaccinated.Weight;
        vaccinated.Pet = this.ToPet(iVaccinated.Pet);
        vaccinated.Vaccine = this.ToVaccine(iVaccinated.Vaccine);
        return vaccinated;
    };
    return InterfaceToObject;
}());
exports.InterfaceToObject = InterfaceToObject;
