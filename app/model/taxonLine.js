'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _functional = require('../lib/functional.js');

var _functional2 = _interopRequireDefault(_functional);

var _Count = require('../lib/Count');

var _Count2 = _interopRequireDefault(_Count);

var _Maybe = require('../lib/Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

var _birdbrain = require('../lib/birdbrain');

var _birdbrain2 = _interopRequireDefault(_birdbrain);

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

var countNumbers = function countNumbers(str) {
    return Number(str.replace(/\D/g, '') || 0);
};

// males
var countMales = function countMales(str) {
    return countMs(str) === 1 ? countNumbers(str) || 1 : countMs(str);
};
var countMs = function countMs(str) {
    return Number((str.match(/m/g) || []).length);
};

var countAllMales = function countAllMales(val) {
    return val.reduce(function (prev, current) {
        return Number(prev) + countMales(current);
    }, 0);
};

// females
var countFs = function countFs(str) {
    return Number((str.match(/f/g) || []).length);
};
var countFemales = function countFemales(str) {
    return countFs(str) === 1 ? countNumbers(str) || 1 : countFs(str);
};

var countAllFemales = function countAllFemales(val) {
    return val.reduce(function (prev, current) {
        return Number(prev) + countFemales(current);
    }, 0);
};

// juveniles
var countJs = function countJs(str) {
    return Number((str.match(/j/g) || []).length);
};

var countJuveniles = function countJuveniles(str) {
    return countJs(str) === 1 && countNonNumeric(str) === 1 ? countNumbers(str) || 1 : 0;
};

var countAllJuveniles = function countAllJuveniles(val) {
    return val.reduce(function (prev, current) {
        return Number(prev) + countJuveniles(current);
    }, 0);
};

// immatures
var countIs = function countIs(str) {
    return Number((str.match(/i/g) || []).length);
};

var countImmatures = function countImmatures(str) {
    return countIs(str) === 1 && countNonNumeric(str) === 1 ? countNumbers(str) || 1 : 0;
};

var countUnspecifiedImmatures = function countUnspecifiedImmatures(val) {
    return val.reduce(function (prev, current) {
        return Number(prev) + countImmatures(current);
    }, 0);
};

// adults
var countAs = function countAs(str) {
    return Number((str.match(/a/g) || []).length);
};

var countAdults = function countAdults(str) {
    return countAs(str) === 1 && countNonNumeric(str) === 1 ? countNumbers(str) || 1 : 0;
};

var countUnspecifiedAdults = function countUnspecifiedAdults(val) {
    return val.reduce(function (prev, current) {
        return Number(prev) + countAdults(current);
    }, 0);
};

// checks/ticks
var countXs = function countXs(str) {
    return Number((str.match(/x/g) || []).length);
};

var countChecks = function countChecks(val) {
    return val.reduce(function (prev, current) {
        return countXs(current) === 1 ? true : prev;
    }, false);
};

// if there are less than 3 non-numeric characters not m,f,a,i,j then it's considered as a comment.
var countNonNumeric = function countNonNumeric(str) {
    return Number((str.match(/\D/g) || []).length);
};

var countValidCharacters = function countValidCharacters(str) {
    return Number((str.match(/a|i|j|f|m|x/g) || []).length);
};

// unspecifieds
var countUnspecified = function countUnspecified(val) {
    return val.reduce(function (prev, current) {
        return Number(prev) + (/[^$,\.\d]/.test(current) ? 0 : countNumbers(current));
    }, 0);
};

function countCombo(val) {

    return val.reduce(function (prev, current) {

        // adult male/females
        if (countAs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1)) {

            countMs(current) ? prev.male.adult += countNumbers(current) : null;
            countFs(current) ? prev.female.adult += countNumbers(current) : null;
        } else if (countIs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1)) {

            countFs(current) ? prev.female.immature += countNumbers(current) : null;
            countMs(current) ? prev.male.immature += countNumbers(current) : null;
        }

        return prev;
    }, {
        female: { immature: 0, adult: 0 },
        male: { immature: 0, adult: 0 }
    });
}

var implodeString = function implodeString(arr) {
    return arr.length ? arr.join(' ') : [];
};

var explodeString_ = function explodeString_(str) {
    return str ? str.split(' ') : [];
};

var explodeString = memoize(explodeString_);

var discardInvalid = function discardInvalid(arr) {
    return (arr || []).filter(function (str) {
        return countValidCharacters(str) === countNonNumeric(str) ? true : false;
    });
};

var extractQuotes = function extractQuotes(str) {
    return str.match(/\"(.[\s\S]*?)\"/gm) || [];
};

var removeQuotes = function removeQuotes(str) {
    return str.replace(/(['"])((\\\1|.)*?)\1/gm, '');
};

function removeTaxon(str) {

    if (str.substring(0, 2) === '[]') return str.substring(2);

    return getCustomTaxon(str).length ? str.substring(getCustomTaxon(str)[0].length) : str.substring(4);
}

var convertHardLineBreaks = function convertHardLineBreaks(str) {
    return str ? str.replace(/(\r\n|\n|\r)/gm, '; ') : null;
};

var gatherComments = function gatherComments(str) {
    return extractQuotes(str).map(convertHardLineBreaks).map(trimString);
};

var gatherInvalid = function gatherInvalid(arr) {
    return (arr.slice(1) || []).reduce(function (prev, current) {
        return countValidCharacters(current) !== countNonNumeric(current) ? prev.concat(current) : prev;
    }, []);
};

var getBand4Code = function getBand4Code(str) {
    return str.substring(0, 4);
};

var trimString = function trimString(str) {
    return str ? str.substring(1, str.length - 1) : null;
};

var getEmptyTaxon = function getEmptyTaxon(str) {
    return str.substring(0, 2) === '[]' ? ['[passerine sp.]'] : false;
};

var getCustomTaxon = function getCustomTaxon(str) {
    return getEmptyTaxon(str) || str.match(/\[([^)]+)\]/g) || [];
};

var getSpecies = function getSpecies(str) {
    return getCustomTaxon(str).length ? trimString(getCustomTaxon(str)[0]) : getBand4Code(str);
};

var breakOutInvalid = _functional2.default.compose(implodeString, gatherInvalid, explodeString, removeQuotes, removeTaxon);
var breakOutSpecies_ = _functional2.default.compose(discardInvalid, explodeString, removeQuotes, removeTaxon);
var breakOutSpecies = memoize(breakOutSpecies_);

var calcPhenotypes_ = function calcPhenotypes_(str) {
    return _Count2.default.of(breakOutSpecies(str)).map(countCombo);
};

var calcPhenotypes = memoize(calcPhenotypes_);

var getPhenotype = function getPhenotype(str) {
    return function (arr) {
        return calcPhenotypes(str).map(function (val) {
            return val[arr[0]][arr[1]];
        });
    };
};

function calculateTaxonLine(str) {

    return {
        identifier: _Maybe2.default.of(getSpecies(str)),
        check: _Maybe2.default.of(breakOutSpecies(str)).map(countChecks),
        comment: _Maybe2.default.of(gatherComments(str).concat(breakOutInvalid(str))),
        get commonName() {
            return _Maybe2.default.of(_birdbrain2.default[this.identifier.emit()] ? _birdbrain2.default[this.identifier.emit()].name : this.identifier.join());
        },
        get scientificName() {
            return _Maybe2.default.of(_birdbrain2.default[this.identifier.emit()] ? _birdbrain2.default[this.identifier.emit()].scientificName : this.identifier.join());
        },
        phenotype: {
            male: {
                total: _Count2.default.of(breakOutSpecies(str)).map(countAllMales),
                immature: getPhenotype(str)(['male', 'immature']),
                adult: getPhenotype(str)(['male', 'adult']),
                get unspecified() {

                    return _Count2.default.of(this.total.toInt() - this.immature.toInt() - this.adult.toInt());
                }
            },
            female: {
                total: _Count2.default.of(breakOutSpecies(str)).map(countAllFemales),
                immature: getPhenotype(str)(['female', 'immature']),
                adult: getPhenotype(str)(['female', 'adult']),
                get unspecified() {

                    return _Count2.default.of(this.total.toInt() - this.immature.toInt() - this.adult.toInt());
                }
            },
            juvenile: _Count2.default.of(breakOutSpecies(str)).map(countAllJuveniles),
            immature: _Count2.default.of(breakOutSpecies(str)).map(countUnspecifiedImmatures),
            adult: _Count2.default.of(breakOutSpecies(str)).map(countUnspecifiedAdults),
            unspecified: _Count2.default.of(breakOutSpecies(str)).map(countUnspecified)
        }
    };
}

exports.default = calculateTaxonLine;