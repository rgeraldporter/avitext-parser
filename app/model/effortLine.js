'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _functional = require('../lib/functional.js');

var _functional2 = _interopRequireDefault(_functional);

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

var convertToSlash = function convertToSlash(str) {
    return str.replace(/-/g, '/');
};

var appendYear = function appendYear(str) {
    return str.length === 8 ? str.slice(0, -3) + '-20' + str.slice(-2) : str + '-' + new Date().getFullYear();
};

var shouldAppendYear = function shouldAppendYear(str) {
    return str.length > 8 ? str : appendYear(str);
};

var leadingZero = function leadingZero(str) {
    return str.startsWith('.') ? '0' + str : str;
};

var convertKmToMiles = function convertKmToMiles(str) {
    return str.search(/km/i) !== -1 ? (Number(str.slice(0, -2)) * 0.6214).toFixed(2) : str;
};

var convertKToMiles = function convertKToMiles(str) {
    return str.search(/k/i) !== -1 ? (Number(str.slice(0, -1)) * 0.6214).toFixed(2) : str;
};

var strOrNull = function strOrNull(str) {
    return str && str !== '' ? str : null;
};

var parseDistance = _functional2.default.compose(strOrNull, convertKToMiles, convertKmToMiles, leadingZero);
var parseDate = _functional2.default.compose(convertToSlash, shouldAppendYear);
var explodeString = memoize(function (str) {
    return str ? str.split(' ') : [];
});

var parseEffortLine = function parseEffortLine(str) {
    return {
        date: _Maybe2.default.of(parseDate(explodeString(str)[0])),
        time: _Maybe2.default.of(explodeString(str)[1]),
        duration: _Maybe2.default.of(explodeString(str)[2] || null),
        distance: _Maybe2.default.of(parseDistance(explodeString(str)[3] || '')),
        observers: _Maybe2.default.of(1),
        comments: _Maybe2.default.of(''),
        get protocol() {
            if (this.duration.isNothing()) return _Maybe2.default.of('Casual');

            if (this.distance.isNothing()) return _Maybe2.default.of('Stationary');

            return _Maybe2.default.of('Traveling');
        },
        get complete() {
            return _Maybe2.default.of(this.protocol.join() !== 'Casual');
        }
    };
};

exports.default = parseEffortLine;