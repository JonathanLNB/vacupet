"use strict";
exports.__esModule = true;
exports.CreateToken = exports.IsAuth = exports.GetUnauthorizedResponse = void 0;
var jwt_simple_1 = require("jwt-simple");
var moment_1 = require("moment");
var Utils_1 = require("../Tools/Utils");
function GetUnauthorizedResponse(req, res, next) {
    console.log("Hola");
    return req.auth ? {
        Success: false,
        Message: "Invalid credentials: ".concat(req.auth.user, ":").concat(req.auth.password)
    } : { Success: false, Message: "Credentials were not provided" };
}
exports.GetUnauthorizedResponse = GetUnauthorizedResponse;
function IsAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            Success: false,
            Message: "Unauthorized"
        });
    }
    var token = req.headers.authorization.split(" ")[1];
    DecodeToken(token).then(function (response) {
        req.user = response;
        next();
    })["catch"](function (response) { return res.status(response.Status).json({ Success: false, Message: response.Message }); });
}
exports.IsAuth = IsAuth;
function DecodeToken(token) {
    return new Promise(function (resolve, reject) {
        try {
            var payload = jwt_simple_1["default"].decode(token, (0, Utils_1.decryptENV)(process.env.JWT_SECRET_TOKEN), false);
            resolve(payload);
        }
        catch (e) {
            reject({
                Status: 401,
                Message: 'Token expired'
            });
        }
    });
}
function CreateToken(user) {
    var payload = {
        iat: (0, moment_1["default"])().unix(),
        user: user,
        exp: (0, moment_1["default"])().add(12, 'hours').unix()
    };
    return jwt_simple_1["default"].encode(payload, (0, Utils_1.decryptENV)(process.env.JWT_SECRET_TOKEN));
}
exports.CreateToken = CreateToken;
module.exports = { GetUnauthorizedResponse: GetUnauthorizedResponse, IsAuth: IsAuth, CreateToken: CreateToken };
