import * as controller from './parse';

describe('the parser', () => {

    let line = 'BAEA 1 "flyover" 1i "2nd year immature"';

    it('should be able to gather comments from a species line', () => {

        let count = controller.gatherCount( line );

        expect( count.comment[0] ).toBe( 'flyover' );
        expect( count.comment[1] ).toBe( '2nd year immature' );
    });

    it('should calculate male, female, and unspecified sex of recorded species', () => {

        let count = controller.gatherCount( 'MALL 1 6 2m 3m mmm f m 3 4f fmfm' );

        expect( count.phenotype.male.unspecified.__value ).toBe( 11 );
        expect( count.phenotype.female.unspecified.__value ).toBe( 7 );
        expect( count.phenotype.unspecified.__value ).toBe( 10 );
        expect( count.identifier.__value ).toBe( 'MALL' );
    });

    it('should correctly calculate juveniles, immatures, and adults', () => {

        let count = controller.gatherCount( 'YHVI m f 3j 2a 4i "three in nest, two out of nest"' );

        expect( count.phenotype.male.unspecified.__value ).toBe( 1 );
        expect( count.phenotype.female.unspecified.__value ).toBe( 1 );
        expect( count.phenotype.unspecified.__value ).toBe( 0 );
        expect( count.identifier.__value ).toBe( 'YHVI' );
        expect( count.phenotype.juvenile.__value ).toBe( 3 );
        expect( count.phenotype.adult.__value ).toBe( 2 );
        expect( count.phenotype.immature.__value ).toBe( 4 );
    });

    it('should handle a null line', () => {

        let count = controller.gatherCount('');

        expect( count.phenotype.male.unspecified.__value ).toBe( 0 );
    });

    it('should handle an empty line', () => {

        let count = controller.gatherCount('MALL');

        expect( count.phenotype.male.unspecified.__value ).toBe( 0 );
        expect( count.identifier.__value ).toBe( 'MALL' );
    });

    it('should handle a zero count', () => {

        let count = controller.gatherCount( 'MALL' );

        expect( count.phenotype.male.unspecified.__value ).toBe( 0 );
        expect( count.phenotype.female.unspecified.__value ).toBe( 0 );
        expect( count.phenotype.unspecified.__value ).toBe( 0 );
        expect( count.identifier.__value ).toBe( 'MALL' );
    });

    it('should handle combo counts', () => {

        let count = controller.gatherCount( 'HOME 2am 3f 2m 3fa' );

        expect( count.phenotype.male.adult ).toEqual( controller.Count.of(2) );
        expect( count.phenotype.female.adult ).toEqual( controller.Count.of(3) );
    });

    it('should not parse invalid declarations', () => {

        let count = controller.gatherCount( 'BAEA 2ar 3i 4a' );

        expect( count.phenotype.adult.map( val => val ) ).toEqual( controller.Count.of(4) );
    });
})