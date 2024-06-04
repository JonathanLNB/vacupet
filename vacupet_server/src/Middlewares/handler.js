"use strict";
exports.__esModule = true;
exports.ErrorHandler = exports.NotFound = void 0;
function NotFound(req, res, next) {
    res.status(404);
    var error = new Error("\uD83D\uDD0D - Not Found - ".concat(req.originalUrl));
    next(error);
}
exports.NotFound = NotFound;
function ErrorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? {} : error.stack
    });
}
exports.ErrorHandler = ErrorHandler;
module.exports = { NotFound: NotFound, ErrorHandler: ErrorHandler };
