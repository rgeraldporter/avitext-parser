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

function convertToSlash(str) {

    return str.replace(/-/g, '/');
}

function appendYear(str) {

    if (str.length > 8)
        return str;

    if (str.length === 8)
        return str.slice(0, -3) + '-20' + str.slice(-2); // only valid until the year 2100 #Y2.1KProblems

    return str + '-' + (new Date()).getFullYear();
}

function parseDistance(str) {

    if (str.search(/km|k/i) !== -1)
        return (parseInt(str.slice(0, -2)) * 0.6214).toFixed(2);

    return str && str !== '' ? str : null;
}

const parseDate = fjs.compose(convertToSlash, appendYear);
const explodeString = memoize(str => str ? str.split(' ') : []);

const parseEffortLine = str => {

    return {

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
    };
}

export {parseEffortLine as default};
