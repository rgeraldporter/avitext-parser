import fjs from '../lib/functional.js';
import Count from '../lib/Count';
import Maybe from '../lib/Maybe';

const memoize = fn => {

    const cache = {};
    return (...args) => {
        const stringifiedArgs = JSON.stringify(args);
        const result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args);
        return result;
    };
};

function countNumbers(str) {

    return Number(str.replace(/\D/g, '') || 0);
}

// males
function countMales(str) {

    return countMs(str) === 1 ? countNumbers(str) || 1 : countMs(str);
}

function countMs(str) {

    return Number((str.match(/m/g) || []).length);
}

function countAllMales(val) {

    return val.reduce((prev, current) => {

        return Number(prev) + countMales(current);
    }, 0);
}

// females
function countFs(str) {

    return Number((str.match(/f/g) || []).length);
}

function countFemales(str) {

    return countFs(str) === 1 ? countNumbers(str) || 1 : countFs(str);
}

function countAllFemales(val) {

    return val.reduce((prev, current) => {

        return Number(prev) + countFemales(current);
    }, 0);
}

// juveniles
function countJs(str) {

    return Number((str.match(/j/g) || []).length);
}

function countJuveniles(str) {

    return countJs(str) === 1 && countNonNumeric(str) === 1 ? countNumbers(str) || 1 : 0;
}

function countAllJuveniles(val) {

    return val.reduce((prev, current) => {

        return Number(prev) + countJuveniles(current);
    }, 0);
}

// immatures
function countIs(str) {

    return Number((str.match(/i/g) || []).length);
}

function countImmatures(str) {

    return countIs(str) === 1 && countNonNumeric(str) === 1 ? countNumbers(str) || 1 : 0;
}

function countUnspecifiedImmatures(val) {

    return val.reduce((prev, current) => {

        return Number(prev) + countImmatures(current);
    }, 0);
}

// adults
function countAs(str) {

    return Number((str.match(/a/g) || []).length);
}

function countAdults(str) {

    return countAs(str) === 1 && countNonNumeric(str) === 1 ? countNumbers(str) || 1 : 0;
}

function countUnspecifiedAdults(val) {

    return val.reduce((prev, current) => {

        return Number(prev) + countAdults(current);
    }, 0);
}

// checks
function countXs(str) {

    return Number((str.match(/x/g) || []).length);
}

function countChecks(val) {

    return val.reduce((prev, current) => {

        let check = prev;

        countXs(current) === 1 ? check = true : null;
        return check;
    }, false);
}

// if there are less than 3 non-numeric characters not m,f,a,i,j then it's a comment.
function countNonNumeric(str) {

    return Number((str.match(/\D/g) || []).length);
}

function countValidCharacters(str) {

    return Number((str.match(/a|i|j|f|m|x/g) || []).length);
}

// unspecifieds
function countUnspecified(val) {

    return val.reduce((prev, current) => {

        return Number(prev) + (/[^$,\.\d]/.test(current) ? 0 : countNumbers(current));
    }, 0);
}

// combos
function countCombo(val) {

    return val.reduce((prev, current) => {

        // adult male/females
        if (countAs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1)) {

            countMs(current) ? prev.male.adult += countNumbers(current) : null;
            countFs(current) ? prev.female.adult += countNumbers(current) : null;
        }
        else if (countIs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1)) {

            countFs(current) ? prev.female.immature += countNumbers(current) : null;
            countMs(current) ? prev.male.immature += countNumbers(current) : null;
        }

        return prev;
    }, {
        female: {immature: 0, adult: 0},
        male: {immature: 0, adult: 0}
    });
}

function implodeString(arr) {

    return arr.length ? arr.join(' ') : [];
}

function _explodeString(str) {

    return str ? str.split(' ') : [];
}

const explodeString = memoize(_explodeString);

function discardInvalid(arr) {

    return (arr||[]).filter(str => {

        return countValidCharacters(str) === countNonNumeric(str) ?
            true : false;
    });
}

function extractQuotes(str) {

    return str.match(/(['"])((\\\1|.)*?)\1/gm) || [];
}

function removeQuotes(str) {

    return str.replace(/(['"])((\\\1|.)*?)\1/gm, '');
}

function removeTaxon(str) {

    if (str.substring(0, 2) === '[]')
        return str.substring(2);

    return getCustomTaxon(str).length ?
        str.substring(getCustomTaxon(str)[0].length) :
        str.substring(4);
}

function gatherComments(str) {

    return extractQuotes(str).map(trimString);
}

function gatherInvalid(arr) {

    return (arr.slice(1)||[]).reduce((prev, current) => {

        if (countValidCharacters(current) !== countNonNumeric(current))
            prev.push(current);

        return prev;
    }, []);
}

function getBand4Code(str) {

    return str.substring(0, 4);
}

function trimString(str) {

    return str ? str.substring(1, str.length - 1) : null;
}

function getEmptyTaxon(str) {

    return str.substring(0, 2) === '[]' ? ['[passerine sp.]'] : false;
}

function getCustomTaxon(str) {

    return getEmptyTaxon(str) || str.match(/\[([^)]+)\]/g) || [];
}

function getSpecies(str) {

    return getCustomTaxon(str).length ? trimString(getCustomTaxon(str)[0]) : getBand4Code(str);
}

const breakOutInvalid = fjs.compose(implodeString, gatherInvalid, explodeString, removeQuotes, removeTaxon);
const _breakOutSpecies = fjs.compose(discardInvalid, explodeString, removeQuotes, removeTaxon);
const breakOutSpecies = memoize(_breakOutSpecies);

function _calcPhenotypes(str) {

    return Count.of(breakOutSpecies(str)).map(countCombo);
}

const calcPhenotypes = memoize(_calcPhenotypes);

function getPhenotype(str) {

    return arr => {

        return calcPhenotypes(str).map(val => val[ arr[0] ][ arr[1] ]);
    }
}

function calculateTaxonLine(str) {

    return {
        identifier: Maybe.of(getSpecies(str)),
        phenotype: {
            male: {
                total: Count.of(breakOutSpecies(str)).map(countAllMales),
                immature: getPhenotype(str)(['male', 'immature']),
                adult: getPhenotype(str)(['male', 'adult']),
                get unspecified() {

                    return Count.of(this.total.join() - this.immature.join() - this.adult.join());
                }
            },
            female: {
                total: Count.of(breakOutSpecies(str)).map(countAllFemales),
                immature: getPhenotype(str)(['female', 'immature']),
                adult: getPhenotype(str)(['female', 'adult']),
                get unspecified() {

                    return Count.of(this.total.join() - this.immature.join() - this.adult.join());
                }
            },
            juvenile: Count.of(breakOutSpecies(str)).map(countAllJuveniles),
            immature: Count.of(breakOutSpecies(str)).map(countUnspecifiedImmatures),
            adult: Count.of(breakOutSpecies(str)).map(countUnspecifiedAdults),
            unspecified: Count.of(breakOutSpecies(str)).map(countUnspecified)
        },
        check: Maybe.of(breakOutSpecies(str)).map(countChecks),
        comment: Maybe.of(gatherComments(str).concat(breakOutInvalid(str)))
    };
}

export {calculateTaxonLine as default};
