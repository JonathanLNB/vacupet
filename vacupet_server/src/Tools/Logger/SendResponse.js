"use strict";
exports.__esModule = true;
exports.sendResponse = void 0;
var logger_colors_1 = require("logger-colors");
function sendResponse(logger, response, res) {
    if (response.Success) {
        logger.magenta('RESPONSE', true);
        logger.magenta("STATUS: ".concat(logger_colors_1.LColor.c_magenta, "[").concat(res.statusCode, "]"), false);
        logger.magenta("BODY:", false);
        logger.magenta(JSON.stringify(response), false);
    }
    else {
        logger.error('RESPONSE', true);
        logger.error("STATUS: ".concat(logger_colors_1.LColor.c_red, "[").concat(res.statusCode, "]"), false);
        logger.error("BODY:", false);
        logger.error(JSON.stringify(response), false);
    }
    res.send(response);
}
exports.sendResponse = sendResponse;
