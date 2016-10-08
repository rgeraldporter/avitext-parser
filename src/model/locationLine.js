import Maybe from '../lib/Maybe';

const memoize = fn => {

    const cache = {};
    return (...args) => {
        const stringifiedArgs = JSON.stringify(args);
        const result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args);
        return result;
    };
};

function _explodeString(str) {

    return str ? str.split(' ') : [];
}

const explodeString = memoize(_explodeString);

function _findRegionCode(str) {

    return explodeString(str)[0] === explodeString(str)[0].toUpperCase() ?
        explodeString(str)[0] : null;
}

const findRegionCode = memoize(_findRegionCode);

function parseCountryCode(str) {

    // USA/Canada; code will be ONCA, NYUS, etc. Return the last two letters.
    if (str.length === 4)
        return str.substring(2, 4);

    // everywhere else; code will be MX-CHH, etc. Return first two letters.
    return str.substring(0, 2);
}

function _parseSubnationalCode(str) {

    // USA/Canada; code will be ONCA, NYUS, etc. Return the first two letters.
    if (str.length === 4)
        return str.substring(0, 2);

    // everywhere else; code will be MX-CHH, etc. Return last three letters.
    return str.substring(3, 6);
}

const parseSubnationalCode = memoize(_parseSubnationalCode);

function getSubnational(str) {

    const code = findRegionCode(str);

    return code ? parseSubnationalCode(code) : null;
}

function parseCountry(str) {

    const code = findRegionCode(str);

    return code ? parseCountryCode(code) : null;
}

function getLocation(str) {

    const code = findRegionCode(str);

    return code ? str.replace(code, '').substring(1) : str;
}

function parseLocationLine(str) {

    // for now there's no real way to validate.
    return {
        location: Maybe.of(getLocation(str)),
        province: Maybe.of(getSubnational(str)),
        country: Maybe.of(parseCountry(str))
    };
}

export {parseLocationLine as default};
