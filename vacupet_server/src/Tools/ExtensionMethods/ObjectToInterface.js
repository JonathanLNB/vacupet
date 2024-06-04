"use strict";
exports.__esModule = true;
exports.ObjectToInterface = void 0;
var ObjectToInterface = /** @class */ (function () {
    function ObjectToInterface() {
    }
    ObjectToInterface.ToAllergy = function (allergy) {
        return {
            Id: allergy.Id,
            Name: allergy.Name,
            Description: allergy.Description
        };
    };
    ObjectToInterface.ToVaccine = function (vaccine) {
        return {
            Id: vaccine.Id,
            Name: vaccine.Name,
            Description: vaccine.Description
        };
    };
    ObjectToInterface.ToPetType = function (petType) {
        return {
            Id: petType.Id,
            Name: petType.Name
        };
    };
    ObjectToInterface.ToUserType = function (userType) {
        return {
            Id: userType.Id,
            Name: userType.Name
        };
    };
    ObjectToInterface.ToSetting = function (setting) {
        return {
            Id: setting.Id,
            Name: setting.Name,
            Description: setting.Description,
            Value: setting.Value
        };
    };
    ObjectToInterface.ToUser = function (user) {
        return {
            Id: user.Id,
            Firstname: user.Firstname,
            Middlename: user.Middlename,
            Lastname: user.Lastname,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            IsActive: user.IsActive,
            CreatedAt: user.CreatedAt,
            UpdatedAt: user.UpdatedAt,
            DateOfBirth: user.DateOfBirth,
            FirebaseId: user.FirebaseId,
            Owner: user.Owner ? this.ToOwner(user.Owner) : null,
            UserType: user.UserType ? this.ToUserType(user.UserType) : null
        };
    };
    ObjectToInterface.ToOwner = function (owner) {
        var _this = this;
        var ownerO = {
            Id: owner.Id,
            Address: owner.Address,
            User: owner.User ? this.ToUser(owner.User) : null
        };
        if (owner.Pets && owner.Pets.length > 0)
            ownerO.Pets = owner.Pets.map(function (pet) { return _this.ToPet(pet); });
        else
            ownerO.Pets = [];
        return ownerO;
    };
    ObjectToInterface.ToFirebaseUser = function (user, password) {
        var firebaseUser = {
            Email: user.Email,
            Disabled: false,
            Name: user.Firstname + " " + user.Middlename,
            LastName: user.Lastname,
            PhoneNumber: user.PhoneNumber
        };
        if (user.FirebaseId)
            firebaseUser.Uid = user.FirebaseId;
        if (password)
            firebaseUser.Password = password;
        return firebaseUser;
    };
    ObjectToInterface.ToPet = function (pet) {
        var _this = this;
        var petO = {
            Id: pet.Id,
            Name: pet.Name,
            DateOfBirth: pet.DateOfBirth,
            Gender: pet.Gender,
            Race: pet.Race,
            PetType: pet.PetType ? this.ToPetType(pet.PetType) : null,
            Owner: pet.Owner ? this.ToOwner(pet.Owner) : null
        };
        if (pet.Allergies && pet.Allergies.length > 0)
            petO.Allergies = pet.Allergies.map(function (option) { return _this.ToAllergy(option); });
        else
            petO.Allergies = [];
        if (pet.Vaccinated && pet.Vaccinated.length > 0)
            petO.Vaccinated = pet.Vaccinated.map(function (option) { return _this.ToVaccinated(option); });
        else
            petO.Vaccinated = [];
        return petO;
    };
    ObjectToInterface.ToVaccinated = function (vaccinated) {
        var vaccinatedO = {
            Id: vaccinated.Id,
            ApplicationDate: vaccinated.ApplicationDate,
            NextApplicationDate: vaccinated.NextApplicationDate,
            Weight: vaccinated.Weight,
            Vaccine: vaccinated.Vaccine ? this.ToVaccine(vaccinated.Vaccine) : null
        };
        return vaccinatedO;
    };
    return ObjectToInterface;
}());
exports.ObjectToInterface = ObjectToInterface;
