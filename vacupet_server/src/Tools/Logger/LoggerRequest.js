"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.smallJsonBody = exports.LoggerRequest = void 0;
var logger_colors_1 = require("logger-colors");
var SmallJson_1 = require("./SmallJson");
var separador = '----------------------------------------------------';
/*
 * Middleware que se encarga de imprimir los datos de una
 * petición de express. Esta función recibe opciones y retorna
 * una función middleware de express la cual no modifica
 * de ninguna forma el request y el response
 */
// export function LoggerRequest(keys?: [any]) {
function LoggerRequest(options) {
    var logger;
    var opt = {
        smallJsonOptions: null,
        logger: null
    };
    var opts = __assign(__assign({}, opt), options);
    if (!opts.logger) {
        logger = new logger_colors_1.Logger();
    }
    else {
        logger = opts.logger;
    }
    var smalljson = (0, SmallJson_1.SmallJSON)(opts.smallJsonOptions);
    return function (req, res, next) {
        logger.info(separador);
        logger.cyan('REQUEST', true);
        logger.cyan('METHOD:\t' + req.method, false);
        logger.cyan('URL:   \t' + req.originalUrl, false);
        logger.cyan('HEADERS:', false);
        Object.keys(req.headers).forEach(function (h) {
            logger.cyan('- ' + h + ": " + logger_colors_1.LColor.c_white + req.headers[h] + logger_colors_1.LColor.c_cyan, false);
            // logger.cyan(h + ":\t" + req.headers[h], false);
        });
        // logger.cyan(JSON.stringify(req.headers, smalljson), false);
        logger.cyan('', false);
        logger.cyan('BODY:', false);
        logger.cyan(JSON.stringify(req.body, smalljson), false);
        logger.info(separador);
        next();
    };
}
exports.LoggerRequest = LoggerRequest;
function smallJsonBody(keys) {
    var noFullHeaders = {};
    if (keys && keys.length) {
        noFullHeaders = {
            smallJsonOptions: {
                protectKeys: keys,
                symbolProtection: ''
            }
        };
    }
    var logger;
    var options = noFullHeaders || {};
    var opt = {
        smallJsonOptions: null,
        logger: null
    };
    var opts = __assign(__assign({}, opt), options);
    if (!opts.logger) {
        logger = new logger_colors_1.Logger();
    }
    else {
        logger = opts.logger;
    }
    return (0, SmallJson_1.SmallJSON)(opts.smallJsonOptions);
}
exports.smallJsonBody = smallJsonBody;
