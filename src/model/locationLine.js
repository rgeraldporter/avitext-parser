import Maybe from '../lib/Maybe';

const memoize = fn => {
    const cache = {};
    return (...args) => {
        const stringifiedArgs = JSON.stringify(args);
        const result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args);
        return result;
    };
};

const explodeString = memoize(str => str ? str.split(' ') : []);

const findRegionCode = memoize(
    str => explodeString(str)[0] === explodeString(str)[0].toUpperCase() ? explodeString(str)[0] : null
);

// USA/Canada; code will be ONCA, NYUS, etc. Return the last two letters.
// everywhere else; code will be MX-CHH, etc. Return first two letters.
const parseCountryCode = str =>
    str.length === 4
        ? str.substring(2, 4)
        : str.substring(0, 2);

const parseSubnationalCode = memoize(str =>
    str.length === 4
        ? str.substring(0, 2)
        : str.substring(3, 6)
);

const getSubnational = str =>
    findRegionCode(str)
        ? parseSubnationalCode(findRegionCode(str))
        : null;

const parseCountry = str =>
    findRegionCode(str)
        ? parseCountryCode(findRegionCode(str))
        : null;

const getLocation = str =>
    findRegionCode(str)
        ? str.replace(findRegionCode(str), '').substring(1)
        : str;

const parseLocationLine = str =>
({
    location: Maybe.of(getLocation(str)),
    province: Maybe.of(getSubnational(str)),
    country: Maybe.of(parseCountry(str))
});

export {parseLocationLine as default}