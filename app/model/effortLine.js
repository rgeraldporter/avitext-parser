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

function convertToSlash(str) {

    return str.replace(/-/g, '/');
}

function appendYear(str) {

    if (str.length > 8) return str;

    if (str.length === 8) return str.slice(0, -3) + '-20' + str.slice(-2); // only valid until the year 2100 #Y2.1KProblems

    return str + '-' + new Date().getFullYear();
}

function parseDistance(str) {

    // convert .5 => 0.5
    if (str.startsWith('.')) str = '0' + str;

    if (str.search(/km/i) !== -1) return (Number(str.slice(0, -2)) * 0.6214).toFixed(2);

    if (str.search(/k/i) !== -1) return (Number(str.slice(0, -1)) * 0.6214).toFixed(2);

    return str && str !== '' ? str : null;
}

var parseDate = _functional2.default.compose(convertToSlash, appendYear);
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