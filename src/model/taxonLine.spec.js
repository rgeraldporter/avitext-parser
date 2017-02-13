import calculateTaxonLine from './taxonLine';
import Count from '../lib/Count';
import Maybe from '../lib/Maybe';

describe('the taxon line model', () => {

    const line = 'BAEA 1 "flyover" 1i "2nd year immature"';

    it('should be able to gather comments from a species line', () => {

        const count = calculateTaxonLine(line);

        expect(count.comment.emit()[0]).toBe('flyover');
        expect(count.comment.emit()[1]).toBe('2nd year immature');
    });

    it('should be able to convert hard line breaks in comments', () => {

        const lineBreak = 'BAEA 1 1i "2nd year immature\nflyover"';
        const count = calculateTaxonLine(lineBreak);

        expect(count.comment.emit()[0]).toBe('2nd year immature; flyover');
    });

    it('should calculate male, female, and unspecified sex of recorded species', () => {

        const count = calculateTaxonLine('MALL 1 6 2m 3m mmm f m 3 4f fmfm');

        expect(count.phenotype.male.unspecified.emit()).toBe(11);
        expect(count.phenotype.female.unspecified.emit()).toBe(7);
        expect(count.phenotype.unspecified.emit()).toBe(10);
        expect(count.identifier.emit()).toBe('MALL');
    });

    it('should correctly calculate juveniles, immatures, and adults', () => {

        const count = calculateTaxonLine('YHVI m f 3j 2a 4i "three in nest, two out of nest"');

        expect(count.phenotype.male.unspecified.emit()).toBe(1);
        expect(count.phenotype.female.unspecified.emit()).toBe(1);
        expect(count.phenotype.unspecified.emit()).toBe(0);
        expect(count.identifier.emit()).toBe('YHVI');
        expect(count.phenotype.juvenile.emit()).toBe(3);
        expect(count.phenotype.adult.emit()).toBe(2);
        expect(count.phenotype.immature.emit()).toBe(4);
    });

    it('should handle a null line', () => {

        const count = calculateTaxonLine('');

        expect(count.phenotype.male.unspecified.emit()).toBe(0);
    });

    it('should handle an empty line', () => {

        const count = calculateTaxonLine('MALL');

        expect(count.phenotype.male.unspecified.emit()).toBe(0);
        expect(count.identifier.emit()).toBe('MALL');
    });

    it('should handle a zero count', () => {

        const count = calculateTaxonLine('MALL');

        expect(count.phenotype.male.unspecified.emit()).toBe(0);
        expect(count.phenotype.female.unspecified.emit()).toBe(0);
        expect(count.phenotype.unspecified.emit()).toBe(0);
        expect(count.identifier.emit()).toBe('MALL');
    });

    it('should handle combo counts', () => {

        const count = calculateTaxonLine('HOME 2am 3f 2m 3fa');

        expect(count.phenotype.male.adult.emit()).toEqual(2);
        expect(count.phenotype.female.adult.emit()).toEqual(3);
    });

    it('should parse invalid declarations as comments', () => {

        const count = calculateTaxonLine('BAEA 2ar 3i 4a lots of these here');

        expect(count.phenotype.adult.map(val => val).emit()).toEqual(4);
        expect(count.comment.emit()[0]).toBe('2ar lots of these here');
    });

    it('should be able to process custom taxon identifiers', () => {

        const count = calculateTaxonLine('[finch sp.] 30 "flyovers"');

        expect(count.identifier.emit()).toBe('finch sp.');
        expect(count.phenotype.unspecified.emit()).toBe(30);
        expect(count.comment.emit()).toEqual(['flyovers']);
    });

    it('should be able to process checks', () => {

        const count = calculateTaxonLine('PIWA x "new nesting cavity"');

        expect(count.check.emit()).toEqual(true);
        expect(count.comment.emit()).toEqual(['new nesting cavity']);
    });

    it('should be able to handle a blank species identifier', () => {

        const count = calculateTaxonLine('[] 35 "flyover of unknown passerine"');

        expect(count.phenotype.unspecified.emit()).toBe(35);
        expect(count.identifier.emit()).toBe('passerine sp.');
    });

    it('should many specs at once', () => {

        const count = calculateTaxonLine('MALL 27m 10f 15am 20if many feeding at pond 100 "courting behaviour observed" 55 10i')

        expect(count.phenotype.unspecified.emit()).toBe(155);
        expect(count.phenotype.male.adult.emit()).toBe(15);
        expect(count.phenotype.male.unspecified.emit()).toBe(27);
        expect(count.phenotype.female.unspecified.emit()).toBe(10);
        expect(count.phenotype.female.immature.emit()).toBe(20);
        expect(count.phenotype.juvenile.emit()).toBe(0);
        expect(count.phenotype.immature.emit()).toBe(10);
        expect(count.phenotype.adult.emit()).toBe(0);
        expect(count.check.emit()).toBe(false);
        expect(count.comment.emit()[0]).toBe('courting behaviour observed');
        expect(count.comment.emit()[1]).toBe('many feeding at pond');
    });

    it('should reject juvenile-sex specifications', () => {

        const count = calculateTaxonLine('RHWO 2jm 4');

        expect(count.phenotype.juvenile.emit()).toBe(0);
        expect(count.phenotype.unspecified.emit()).toBe(4);
        expect(count.phenotype.male.total.emit()).toBe(2);
    });

    it('should return the proper names', () => {

        const count = calculateTaxonLine('RHWO 2jm 4');

        expect(count.commonName.emit()).toBe('Red-headed Woodpecker');
        expect(count.scientificName.emit()).toBe('Melanerpes erythrocephalus');
    });
})
