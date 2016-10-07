import Maybe from '../lib/Maybe';

function parseLocationLine(str) {

    // for now there's no real way to validate.
    return Maybe.of(str);
}

export {parseLocationLine as default};
