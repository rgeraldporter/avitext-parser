import calculateTaxonLine from './taxonLine';
import Count from '../lib/Count';
import Maybe from '../lib/Maybe';

describe('the taxon line parser', () => {

    const line = 'BAEA 1 "flyover" 1i "2nd year immature"';

    it('should be able to gather comments from a species line', () => {

        const count = calculateTaxonLine(line);

        expect(count.comment.__value[0]).toBe('flyover');
        expect(count.comment.__value[1]).toBe('2nd year immature');
    });

    it('should calculate male, female, and unspecified sex of recorded species', () => {

        const count = calculateTaxonLine('MALL 1 6 2m 3m mmm f m 3 4f fmfm');

        expect(count.phenotype.male.unspecified.__value).toBe(11);
        expect(count.phenotype.female.unspecified.__value).toBe(7);
        expect(count.phenotype.unspecified.__value).toBe(10);
        expect(count.identifier.__value).toBe('MALL');
    });

    it('should correctly calculate juveniles, immatures, and adults', () => {

        const count = calculateTaxonLine('YHVI m f 3j 2a 4i "three in nest, two out of nest"');

        expect(count.phenotype.male.unspecified.__value).toBe(1);
        expect(count.phenotype.female.unspecified.__value).toBe(1);
        expect(count.phenotype.unspecified.__value).toBe(0);
        expect(count.identifier.__value).toBe('YHVI');
        expect(count.phenotype.juvenile.__value).toBe(3);
        expect(count.phenotype.adult.__value).toBe(2);
        expect(count.phenotype.immature.__value).toBe(4);
    });

    it('should handle a null line', () => {

        const count = calculateTaxonLine('');

        expect(count.phenotype.male.unspecified.__value).toBe(0);
    });

    it('should handle an empty line', () => {

        const count = calculateTaxonLine('MALL');

        expect(count.phenotype.male.unspecified.__value).toBe(0);
        expect(count.identifier.__value).toBe('MALL');
    });

    it('should handle a zero count', () => {

        const count = calculateTaxonLine('MALL');

        expect(count.phenotype.male.unspecified.__value).toBe(0);
        expect(count.phenotype.female.unspecified.__value).toBe(0);
        expect(count.phenotype.unspecified.__value).toBe(0);
        expect(count.identifier.__value).toBe('MALL');
    });

    it('should handle combo counts', () => {

        const count = calculateTaxonLine('HOME 2am 3f 2m 3fa');

        expect(count.phenotype.male.adult).toEqual(Count.of(2));
        expect(count.phenotype.female.adult).toEqual(Count.of(3));
    });

    it('should parse invalid declarations as comments', () => {

        const count = calculateTaxonLine('BAEA 2ar 3i 4a lots of these here');

        expect(count.phenotype.adult.map(val => val)).toEqual(Count.of(4));
        expect(count.comment.__value[0]).toBe('2ar');
        expect(count.comment.__value[1]).toBe('lots');
    });

    it('should be able to process custom taxon identifiers', () => {

        const count = calculateTaxonLine('[finch sp.] 30 "flyovers"');

        expect(count.identifier.__value).toBe('finch sp.');
        expect(count.phenotype.unspecified.__value).toBe(30);
        expect(count.comment.__value).toEqual(['flyovers']);
    });

    it('should be able to process checks', () => {

        const count = calculateTaxonLine('PIWA x "new nesting cavity"');

        expect(count.check).toEqual(Maybe.of(true));
        expect(count.comment).toEqual(Maybe.of(['new nesting cavity']));
    });

    it('should be able to handle a blank species identifier', () => {

        const count = calculateTaxonLine('[] 35 "flyover of unknown passerine"');

        expect(count.phenotype.unspecified.__value).toBe(35);
        expect(count.identifier.__value).toBe('passerine sp.');
    });

    it('should many specs at once', () => {

        const count = calculateTaxonLine('MALL 27m 10f 15am 20if many feeding at pond 100 "courting behaviour observed" 55 10i')

        expect(count.phenotype.unspecified.__value).toBe(155);
        expect(count.phenotype.male.adult.__value).toBe(15);
        expect(count.phenotype.male.unspecified.__value).toBe(27);
        expect(count.phenotype.female.unspecified.__value).toBe(10);
        expect(count.phenotype.female.immature.__value).toBe(20);
        expect(count.phenotype.juvenile.__value).toBe(0);
        expect(count.phenotype.immature.__value).toBe(10);
        expect(count.phenotype.adult.__value).toBe(0);
        expect(count.check.__value).toBe(false);
        expect(count.comment.__value[0]).toBe('courting behaviour observed');
        expect(count.comment.__value[1]).toBe('many feeding at pond');
    });

    it('should reject juvenile-sex specifications', () => {

        const count = calculateTaxonLine('RHWO 2jm 4');

        expect(count.phenotype.juvenile.__value).toBe(0);
        expect(count.phenotype.unspecified.__value).toBe(4);
        expect(count.phenotype.male.total.__value).toBe(2);
    });
})
