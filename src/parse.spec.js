import * as controller from './parse';

describe('the parser', () => {

    let line = 'BAEA 1 "flyover" 1i "2nd year immature"';

    it('should be able to gather comments from a species line', () => {

        let comments = controller.gatherComments( line );

        expect( comments[0] ).toBe( 'flyover' );
        expect( comments[1] ).toBe( '2nd year immature' );
    });

    it('should be able to remove comments from a species line', () => {

        let comments = controller.removeQuotes( line );

        expect( comments.indexOf( 'fly' ) ).toBe( -1 );
    });

    it('should calculate male, female, and unspecified sex of recorded species', () => {

        let count = controller.gatherCount( 'MALL 1 6 2m 3m mmm f m 3 4f fmfm' );

        expect( count.males.__value ).toBe( 11 );
        expect( count.females.__value ).toBe( 7 );
        expect( count.unspecified.__value ).toBe( 10 );
        expect( count.taxon.__value ).toBe( 'MALL' );
    });

    it('should correctly calculate juveniles, immatures, and adults', () => {

        let count = controller.gatherCount( 'YHVI m f 3j 2a 4i "three in nest, two out of nest"' );

        expect( count.males.__value ).toBe( 1 );
        expect( count.females.__value ).toBe( 1 );
        expect( count.unspecified.__value ).toBe( 0 );
        expect( count.taxon.__value ).toBe( 'YHVI' );
        expect( count.juveniles.__value ).toBe( 3 );
        expect( count.adults.__value ).toBe( 2 );
        expect( count.immatures.__value ).toBe( 4 );
    });

    it('should handle a null line', () => {

        let line = controller.explodeString(null),
            empty = controller.Count.of( line ).map( controller.countAllMales )
        ;

        expect( empty.__value ).toBe( null );
    });

    it('should handle an empty line', () => {

        let line = controller.explodeString(''),
            empty = controller.Count.of( line ).map( controller.countAllMales )
        ;

        expect( empty.__value ).toBe( null );
    });

    it('should handle a zero count', () => {

        let count = controller.gatherCount( 'MALL' );

        // we're going to get nulls rather than zeros. 
        expect( count.males.__value ).toBe( null );
        expect( count.females.__value ).toBe( null );
        expect( count.unspecified.__value ).toBe( null );
        expect( count.taxon.__value ).toBe( 'MALL' );
    });
})