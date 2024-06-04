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
exports.SmallJSON = void 0;
function SmallJSON(options) {
    var opts = {
        protectKeys: [],
        symbolProtection: '*',
        charsToShowWhenHidden: 3
    };
    opts = __assign(__assign({}, opts), options);
    return function (key, value) {
        if (Array.isArray(value)) {
            if (value.length > 5) {
                value = value.slice(1, 10);
            }
            return value;
        }
        if (typeof value === 'string' &&
            opts.protectKeys.indexOf(key) !== -1) {
            var charsToShow = 0;
            if (opts.charsToShowWhenHidden < 0) {
                charsToShow = Math.round(value.length / 3);
            }
            else {
                charsToShow = opts.charsToShowWhenHidden;
            }
            var val = '';
            val += value.substring(0, charsToShow);
            val += opts.symbolProtection.repeat(value.length - (2 * charsToShow));
            val += value.substring(-charsToShow, charsToShow);
            return val;
        }
        return value;
    };
}
exports.SmallJSON = SmallJSON;
