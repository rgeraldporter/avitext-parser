'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Maybe = require('../lib/Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var memoize = function memoize(fn) {

    var cache = {};
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var stringifiedArgs = JSON.stringify(args);
        var result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn.apply(undefined, args);
        return result;
    };
};

var explodeString = memoize(function (str) {
    return str ? str.split(' ') : [];
});

var findRegionCode = memoize(function (str) {
    return explodeString(str)[0] === explodeString(str)[0].toUpperCase() ? explodeString(str)[0] : null;
});

function parseCountryCode(str) {

    // USA/Canada; code will be ONCA, NYUS, etc. Return the last two letters.
    if (str.length === 4) return str.substring(2, 4);

    // everywhere else; code will be MX-CHH, etc. Return first two letters.
    return str.substring(0, 2);
}

var parseSubnationalCode = memoize(function (str) {

    // USA/Canada; code will be ONCA, NYUS, etc. Return the first two letters.
    if (str.length === 4) return str.substring(0, 2);

    // everywhere else; code will be MX-CHH, etc. Return last three letters.
    return str.substring(3, 6);
});

function getSubnational(str) {

    var code = findRegionCode(str);

    return code ? parseSubnationalCode(code) : null;
}

function parseCountry(str) {

    var code = findRegionCode(str);

    return code ? parseCountryCode(code) : null;
}

function getLocation(str) {

    var code = findRegionCode(str);

    return code ? str.replace(code, '').substring(1) : str;
}

function parseLocationLine(str) {

    // for now there's no real way to validate.
    return {
        location: _Maybe2.default.of(getLocation(str)),
        province: _Maybe2.default.of(getSubnational(str)),
        country: _Maybe2.default.of(parseCountry(str))
    };
}

exports.default = parseLocationLine;