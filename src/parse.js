import fjs from 'functional.js';

const memoize = fn => {

    let cache = {};
    return (...args) => {
        const stringifiedArgs = JSON.stringify(args);
        let result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args);
        return result;
    };
};

class Count {

    constructor( x ) {

        this.__value = x;
    }

    map( f ) {

        return this.isNothing() ? Count.of(null) : Count.of(f(this.__value));
    }

    isNothing() {

        return ( this.__value === null || this.__value === undefined );
    }
}

Count.of = x => new Count( x );

function countNumbers( str ) {

    return str.replace( /\D/g, '' ) || 0;
}

// males

function countMales( str ) {

    return countMs( str ) === 1 ? parseInt(countNumbers( str )) || 1 : countMs( str );
}

function countMs( str ) {

    return parseInt(( str.match( /m/g ) || [] ).length);
}

function countAllMales( val ) {

    return val.reduce( ( prev, current ) => {

        return parseInt(prev) + countMales(current);
    }, 0);
}

// females

function countFs( str ) {

    return parseInt(( str.match( /f/g ) || [] ).length);
}

function countFemales( str ) {

    return countFs( str ) === 1 ? parseInt(countNumbers( str )) || 1 : countFs( str );
}

function countAllFemales( val ) {

    return val.reduce( ( prev, current ) => {

        return parseInt(prev) + countFemales(current);
    }, 0);
}

// juveniles

function countJs( str ) {

    return parseInt(( str.match( /j/g ) || [] ).length);
}

function countJuveniles( str ) {

    return countJs( str ) === 1 ? parseInt(countNumbers( str )) || 1 : 0;
}

function countAllJuveniles( val ) {

    return val.reduce( ( prev, current ) => {

        return parseInt(prev) + countJuveniles(current);
    }, 0);
}

// immatures

function countIs( str ) {

    return parseInt(( str.match( /i/g ) || [] ).length);
}

function countImmatures( str ) {

    return countIs( str ) === 1 ? parseInt(countNumbers( str )) || 1 : 0;
}

function countAllImmatures( val ) {

    return val.reduce( ( prev, current ) => {

        return parseInt(prev) + countImmatures(current);
    }, 0);
}

// adults

function countAs( str ) {

    return parseInt(( str.match( /a/g ) || [] ).length);
}

function countAdults( str ) {

    return countAs( str ) === 1 ? parseInt(countNumbers( str )) || 1 : 0;
}

function countAllAdults( val ) {

    return val.reduce( ( prev, current ) => {

        return parseInt(prev) + countAdults(current);
    }, 0);
}


// unspecifieds

function countUnspecified( val ) {

    return val.reduce( ( prev, current ) => {

        return parseInt(prev) + ( /[^$,\.\d]/.test(current) ? 0 : parseInt(countNumbers( current )) );
    }, 0);
}

// combos

function countCombo( val ) {

    return val.reduce( ( prev, current ) => {

        let count = 0;

        // adult male/females
        if ( countAs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1) ) {

            prev.adults.males = countNumbers( current );
        }
        else if ( countIs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1) ) {

            prev.immatures.females = countNumbers( current );
        }

        return prev;
    }, {
        adults: { males: 0, females: 0 },
        immatures: { males: 0, females: 0 }
    });
}




function explodeString( str ) {

    return str ? str.split( ' ' ) : null;
}

function extractQuotes( str ) {

    return str.match( /(['"])((\\\1|.)*?)\1/gm );
}

function removeQuotes( str ) {

    return str.replace( /(['"])((\\\1|.)*?)\1/gm, '');
}

function removeTaxon( str ) {

    return str.substring( 4 );
}

function trimQuotes( str ) {

    return str ? str.slice( 0, -1 ).substring( 1 ) : null;
}

function gatherComments( str ) {

    return extractQuotes( str ).map( trimQuotes );
}

function getSpecies( str ) {

    return str.substring(0, 4);
}

let _breakOutSpecies = fjs.compose( explodeString, removeQuotes, removeTaxon );
let breakOutSpecies = memoize( _breakOutSpecies );

function gatherCount( str ) {

    return {
        taxon: Count.of( getSpecies(str) ),
        males: Count.of( breakOutSpecies(str) ).map( countAllMales ),
        females: Count.of( breakOutSpecies(str) ).map( countAllFemales ),
        unspecified: Count.of( breakOutSpecies(str) ).map( countUnspecified ),
        juveniles: Count.of( breakOutSpecies(str) ).map( countAllJuveniles ),
        immatures: Count.of( breakOutSpecies(str) ).map( countAllImmatures ),
        adults: Count.of( breakOutSpecies(str) ).map( countAllAdults )
    }
}

export {

    gatherComments,
    removeQuotes,
    Count,
    gatherCount,
    explodeString
};
