"use strict";
exports.__esModule = true;
exports.formatDate = exports.decrypt = exports.encrypt = exports.decryptENV = exports.encryptENV = void 0;
var CryptoJS = require("crypto-js");
function encryptENV(txt) {
    var key = CryptoJS.enc.Utf8.parse(process.env.ENV_SECRET_KEY);
    var iv = CryptoJS.enc.Utf8.parse(process.env.ENV_SECRET_IV);
    var cipher = CryptoJS.AES.encrypt(txt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString();
}
exports.encryptENV = encryptENV;
function decryptENV(txtToDecrypt) {
    var key = CryptoJS.enc.Utf8.parse(process.env.ENV_SECRET_KEY);
    var iv = CryptoJS.enc.Utf8.parse(process.env.ENV_SECRET_IV);
    var cipher = CryptoJS.AES.decrypt(txtToDecrypt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}
exports.decryptENV = decryptENV;
function encrypt(txt) {
    var key = CryptoJS.enc.Utf8.parse(decryptENV(process.env.SECRET_KEY));
    var iv = CryptoJS.enc.Utf8.parse(decryptENV(process.env.SECRET_IV));
    var cipher = CryptoJS.AES.encrypt(txt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString();
}
exports.encrypt = encrypt;
function decrypt(txtToDecrypt) {
    var key = CryptoJS.enc.Utf8.parse(decryptENV(process.env.SECRET_KEY));
    var iv = CryptoJS.enc.Utf8.parse(decryptENV(process.env.SECRET_IV));
    var cipher = CryptoJS.AES.decrypt(txtToDecrypt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}
exports.decrypt = decrypt;
function formatDate(oldDate) {
    var newDate, year, month, day;
    if (oldDate instanceof Date)
        newDate = new Date(oldDate.getTime());
    else
        newDate = new Date(oldDate.replace(/-/g, '\/').replace(/T.+/, ''));
    day = '' + newDate.getDate();
    month = '' + (newDate.getMonth() + 1);
    year = newDate.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [month, day, year].join('/');
}
exports.formatDate = formatDate;
