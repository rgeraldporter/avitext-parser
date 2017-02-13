import fjs from '../lib/functional.js';
import Count from '../lib/Count';
import Maybe from '../lib/Maybe';
import birdBrain from '../lib/birdbrain';

const memoize = fn => {

    const cache = {};
    return (...args) => {
        const stringifiedArgs = JSON.stringify(args);
        const result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args);
        return result;
    };
};

const countNumbers = str => Number(str.replace(/\D/g, '') || 0);

// males
const countMales = str => countMs(str) === 1 ? countNumbers(str) || 1 : countMs(str);
const countMs = str => Number((str.match(/m/g) || []).length);

const countAllMales = val =>
    val.reduce(
        (prev, current) =>
            Number(prev) + countMales(current),
    0);

// females
const countFs = str => Number((str.match(/f/g) || []).length);
const countFemales = str => countFs(str) === 1 ? countNumbers(str) || 1 : countFs(str);

const countAllFemales = val =>
    val.reduce(
        (prev, current) =>
            Number(prev) + countFemales(current),
    0);

// juveniles
const countJs = str =>
    Number((str.match(/j/g) || []).length);

const countJuveniles = str =>
    countJs(str) === 1 && countNonNumeric(str) === 1
        ? countNumbers(str) || 1
        : 0;

const countAllJuveniles = val =>
    val.reduce(
        (prev, current) =>
            Number(prev) + countJuveniles(current),
    0);

// immatures
const countIs = str =>
    Number((str.match(/i/g) || []).length);

const countImmatures = str =>
    countIs(str) === 1 && countNonNumeric(str) === 1
        ? countNumbers(str) || 1
        : 0;

const countUnspecifiedImmatures = val =>
    val.reduce(
        (prev, current) =>
            Number(prev) + countImmatures(current),
    0);

// adults
const countAs = str =>
    Number((str.match(/a/g) || []).length);

const countAdults = str =>
    countAs(str) === 1 && countNonNumeric(str) === 1
        ? countNumbers(str) || 1
        : 0;

const countUnspecifiedAdults = val =>
    val.reduce(
        (prev, current) =>
            Number(prev) + countAdults(current),
    0);


// checks/ticks
const countXs = str =>
    Number((str.match(/x/g) || []).length);

const countChecks = val =>
    val.reduce(
        (prev, current) =>
            countXs(current) === 1
                ? true
                : prev,
    false);

// if there are less than 3 non-numeric characters not m,f,a,i,j then it's considered as a comment.
const countNonNumeric = str =>
    Number((str.match(/\D/g) || []).length);

const countValidCharacters = str =>
    Number((str.match(/a|i|j|f|m|x/g) || []).length);

// unspecifieds
const countUnspecified = val =>
    val.reduce(
        (prev, current) =>
            Number(prev) + (
                /[^$,\.\d]/.test(current)
                ? 0
                : countNumbers(current)
            ),
    0);

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

const implodeString = arr =>
    arr.length
        ? arr.join(' ')
        : [];

const explodeString_ = str =>
    str
        ? str.split(' ')
        : []

const explodeString = memoize(explodeString_);

const discardInvalid = arr =>
    (arr||[]).filter(
        str =>
            countValidCharacters(str) === countNonNumeric(str)
                ? true
                : false
    );

const extractQuotes = str =>
    str.match(/\"(.[\s\S]*?)\"/gm) || [];

const removeQuotes = str =>
    str.replace(/(['"])((\\\1|.)*?)\1/gm, '');

function removeTaxon(str) {

    if (str.substring(0, 2) === '[]')
        return str.substring(2);

    return getCustomTaxon(str).length ?
        str.substring(getCustomTaxon(str)[0].length) :
        str.substring(4);
}

const convertHardLineBreaks = str =>
    str
        ? str.replace(/(\r\n|\n|\r)/gm, '; ')
        : null;

const gatherComments = str =>
    extractQuotes(str).map(convertHardLineBreaks).map(trimString);

const gatherInvalid = arr =>
    (arr.slice(1)||[]).reduce(
        (prev, current) =>
            countValidCharacters(current) !== countNonNumeric(current)
                ? prev.concat(current)
                : prev,
    []);

const getBand4Code = str =>
    str.substring(0, 4);

const trimString = str =>
    str
        ? str.substring(1, str.length - 1)
        : null;

const getEmptyTaxon = str =>
    str.substring(0, 2) === '[]'
        ? ['[passerine sp.]']
        : false;

const getCustomTaxon = str =>
    getEmptyTaxon(str) || str.match(/\[([^)]+)\]/g) || [];

const getSpecies = str =>
    getCustomTaxon(str).length
        ? trimString(getCustomTaxon(str)[0])
        : getBand4Code(str);

const breakOutInvalid = fjs.compose(implodeString, gatherInvalid, explodeString, removeQuotes, removeTaxon);
const breakOutSpecies_ = fjs.compose(discardInvalid, explodeString, removeQuotes, removeTaxon);
const breakOutSpecies = memoize(breakOutSpecies_);

const calcPhenotypes_ = str =>
    Count.of(breakOutSpecies(str)).map(countCombo)

const calcPhenotypes = memoize(calcPhenotypes_);

const getPhenotype = str =>
    arr =>
        calcPhenotypes(str).map(val => val[ arr[0] ][ arr[1] ]);

function calculateTaxonLine(str) {

    return {
        identifier: Maybe.of(getSpecies(str)),
        check: Maybe.of(breakOutSpecies(str)).map(countChecks),
        comment: Maybe.of(gatherComments(str).concat(breakOutInvalid(str))),
        get commonName() {
            return Maybe.of(birdBrain[this.identifier.emit()] ?
                    birdBrain[this.identifier.emit()].name : this.identifier.join()
                );
        },
        get scientificName() {
            return Maybe.of(birdBrain[this.identifier.emit()] ?
                    birdBrain[this.identifier.emit()].scientificName : this.identifier.join()
                );
        },
        phenotype: {
            male: {
                total: Count.of(breakOutSpecies(str)).map(countAllMales),
                immature: getPhenotype(str)(['male', 'immature']),
                adult: getPhenotype(str)(['male', 'adult']),
                get unspecified() {

                    return Count.of(this.total.toInt() - this.immature.toInt() - this.adult.toInt());
                }
            },
            female: {
                total: Count.of(breakOutSpecies(str)).map(countAllFemales),
                immature: getPhenotype(str)(['female', 'immature']),
                adult: getPhenotype(str)(['female', 'adult']),
                get unspecified() {

                    return Count.of(this.total.toInt() - this.immature.toInt() - this.adult.toInt());
                }
            },
            juvenile: Count.of(breakOutSpecies(str)).map(countAllJuveniles),
            immature: Count.of(breakOutSpecies(str)).map(countUnspecifiedImmatures),
            adult: Count.of(breakOutSpecies(str)).map(countUnspecifiedAdults),
            unspecified: Count.of(breakOutSpecies(str)).map(countUnspecified)
        }
    };
}

export {calculateTaxonLine as default};
