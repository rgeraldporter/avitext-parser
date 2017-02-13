import fjs from '../lib/functional.js';
import Maybe from '../lib/Maybe';

const memoize = fn => {
    const cache = {};
    return (...args) => {
        const stringifiedArgs = JSON.stringify(args);
        const result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args);
        return result;
    };
};

const convertToSlash = str => str.replace(/-/g, '/');

const appendYear = str => str.length === 8
    ? str.slice(0, -3) + '-20' + str.slice(-2)
    : str + '-' + new Date().getFullYear();

const shouldAppendYear = str =>
    str.length > 8
        ? str
        : appendYear(str);

const leadingZero = str =>
    str.startsWith('.')
        ? '0' + str
        : str;

const convertKmToMiles = str =>
    str.search(/km/i) !== -1
        ? (Number(str.slice(0, -2)) * 0.6214).toFixed(2)
        : str;

const convertKToMiles = str =>
    str.search(/k/i) !== -1
        ? (Number(str.slice(0, -1)) * 0.6214).toFixed(2)
        : str;

const strOrNull = str =>
    str && str !== ''
    ? str
    : null;

const parseDistance = fjs.compose(strOrNull, convertKToMiles, convertKmToMiles, leadingZero);
const parseDate = fjs.compose(convertToSlash, shouldAppendYear);
const explodeString = memoize(str => str ? str.split(' ') : []);

const parseEffortLine = str => ({
    date: Maybe.of(parseDate(explodeString(str)[0])),
    time: Maybe.of(explodeString(str)[1]),
    duration: Maybe.of(explodeString(str)[2] || null),
    distance: Maybe.of(parseDistance(explodeString(str)[3] || '')),
    observers: Maybe.of(1),
    comments: Maybe.of(''),
    get protocol() {
        if (this.duration.isNothing())
            return Maybe.of('Casual');

        if (this.distance.isNothing())
            return Maybe.of('Stationary');

        return Maybe.of('Traveling');
    },
    get complete() {
        return Maybe.of(this.protocol.join() !== 'Casual');
    }
});

export {parseEffortLine as default}