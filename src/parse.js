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

    join() {

        return this.isNothing() ? Count.of(null) : this.__value;
    }
}

Count.of = x => new Count( x );

function countNumbers( str ) {

    return Number(str.replace( /\D/g, '' ) || 0);
}

// males

function countMales( str ) {

    return countMs( str ) === 1 ? countNumbers( str ) || 1 : countMs( str );
}

function countMs( str ) {

    return Number(( str.match( /m/g ) || [] ).length);
}

function countAllMales( val ) {

    return val.reduce( ( prev, current ) => {

        return Number(prev) + countMales(current);
    }, 0);
}

// females

function countFs( str ) {

    return Number(( str.match( /f/g ) || [] ).length);
}

function countFemales( str ) {

    return countFs( str ) === 1 ? countNumbers( str ) || 1 : countFs( str );
}

function countAllFemales( val ) {

    return val.reduce( ( prev, current ) => {

        return Number(prev) + countFemales(current);
    }, 0);
}

// juveniles

function countJs( str ) {

    return Number(( str.match( /j/g ) || [] ).length);
}

function countJuveniles( str ) {

    return countJs( str ) === 1 ? countNumbers( str ) || 1 : 0;
}

function countAllJuveniles( val ) {

    return val.reduce( ( prev, current ) => {

        return Number(prev) + countJuveniles(current);
    }, 0);
}

// immatures

function countIs( str ) {

    return Number(( str.match( /i/g ) || [] ).length);
}

function countImmatures( str ) {

    return countIs( str ) === 1 ? countNumbers( str ) || 1 : 0;
}

function countAllImmatures( val ) {

    return val.reduce( ( prev, current ) => {

        return Number(prev) + countImmatures(current);
    }, 0);
}

// adults

function countAs( str ) {

    return Number(( str.match( /a/g ) || [] ).length);
}

function countAdults( str ) {

    return countAs( str ) === 1 ? countNumbers( str ) || 1 : 0;
}

function countAllAdults( val ) {

    return val.reduce( ( prev, current ) => {

        return Number(prev) + countAdults(current);
    }, 0);
}


// if there are less than 3 non-numeric characters not m,f,a,i,j then it's a comment.

function countNonNumeric( str ) {

    return Number((str.match( /\D/g ) || []).length);
}

function countValidCharacters( str ) {

    return Number((str.match( /a|i|j|f|m/g ) || []).length);
}

// unspecifieds

function countUnspecified( val ) {

    return val.reduce( ( prev, current ) => {

        return Number(prev) + ( /[^$,\.\d]/.test(current) ? 0 : countNumbers( current ) );
    }, 0);
}

// combos

function countCombo( val ) {

    return val.reduce( ( prev, current ) => {

        // adult male/females
        if ( countAs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1) ) {

            countMs(current) ? prev.male.adult += countNumbers( current ) : null;
            countFs(current) ? prev.female.adult += countNumbers( current ) : null;
        }
        else if ( countIs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1) ) {

            countFs(current) ? prev.female.immature += countNumbers( current ) : null;
            countMs(current) ? prev.male.immature += countNumbers( current ) : null;
        }

        return prev;
    }, {
        female: { immature: 0, adult: 0 },
        male: { immature: 0, adult: 0 }
    });
}


function explodeString( str ) {

    return str ? str.split( ' ' ) : null;
}

function discardInvalid( arr ) {

    return (arr||[]).filter( str => {

        return countValidCharacters(str) === countNonNumeric(str) ? 
            true : false;
    });
}

function extractQuotes( str ) {

    return str.match( /(['"])((\\\1|.)*?)\1/gm ) || [];
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

let _breakOutSpecies = fjs.compose( discardInvalid, explodeString, removeQuotes, removeTaxon );
let breakOutSpecies = memoize( _breakOutSpecies );

function _calcPhenotypes( str ) {

    return Count.of( breakOutSpecies(str) ).map( countCombo );
}

let calcPhenotypes = memoize( _calcPhenotypes );

function getPhenotype( str ) {

    return arr => {

        return calcPhenotypes( str ).map( val => val[ arr[0] ][ arr[1] ]);
    }
}

function gatherCount( str ) {

    return {
        identifier: Count.of( getSpecies(str) ),
        phenotype: {
            male: {
                unspecified: Count.of( breakOutSpecies(str) ).map( countAllMales ),
                immature: getPhenotype(str)(['male', 'immature']),
                adult: getPhenotype(str)(['male', 'adult'])
            },
            female: {
                unspecified: Count.of( breakOutSpecies(str) ).map( countAllFemales ),
                immature: getPhenotype(str)(['female', 'immature']),
                adult: getPhenotype(str)(['female', 'adult'])
            },
            juvenile: Count.of( breakOutSpecies(str) ).map( countAllJuveniles ),
            immature: Count.of( breakOutSpecies(str) ).map( countAllImmatures ),
            adult: Count.of( breakOutSpecies(str) ).map( countAllAdults ),
            unspecified: Count.of( breakOutSpecies(str) ).map( countUnspecified )
        },
        check: false,
        comment: gatherComments( str )
    };
}

export {

    Count,
    gatherCount
};
