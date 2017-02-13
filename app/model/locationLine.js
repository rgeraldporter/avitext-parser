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

// USA/Canada; code will be ONCA, NYUS, etc. Return the last two letters.
// everywhere else; code will be MX-CHH, etc. Return first two letters.
var parseCountryCode = function parseCountryCode(str) {
    return str.length === 4 ? str.substring(2, 4) : str.substring(0, 2);
};

var parseSubnationalCode = memoize(function (str) {
    return str.length === 4 ? str.substring(0, 2) : str.substring(3, 6);
});

var getSubnational = function getSubnational(str) {
    return findRegionCode(str) ? parseSubnationalCode(findRegionCode(str)) : null;
};

var parseCountry = function parseCountry(str) {
    return findRegionCode(str) ? parseCountryCode(findRegionCode(str)) : null;
};

var getLocation = function getLocation(str) {
    return findRegionCode(str) ? str.replace(findRegionCode(str), '').substring(1) : str;
};

var parseLocationLine = function parseLocationLine(str) {
    return {
        location: _Maybe2.default.of(getLocation(str)),
        province: _Maybe2.default.of(getSubnational(str)),
        country: _Maybe2.default.of(parseCountry(str))
    };
};

exports.default = parseLocationLine;