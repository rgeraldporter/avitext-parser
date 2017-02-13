'use strict';

var _taxonLine = require('./taxonLine');

var _taxonLine2 = _interopRequireDefault(_taxonLine);

var _Count = require('../lib/Count');

var _Count2 = _interopRequireDefault(_Count);

var _Maybe = require('../lib/Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('the taxon line model', function () {

    var line = 'BAEA 1 "flyover" 1i "2nd year immature"';

    it('should be able to gather comments from a species line', function () {

        var count = (0, _taxonLine2.default)(line);

        expect(count.comment.emit()[0]).toBe('flyover');
        expect(count.comment.emit()[1]).toBe('2nd year immature');
    });

    it('should be able to convert hard line breaks in comments', function () {

        var lineBreak = 'BAEA 1 1i "2nd year immature\nflyover"';
        var count = (0, _taxonLine2.default)(lineBreak);

        expect(count.comment.emit()[0]).toBe('2nd year immature; flyover');
    });

    it('should calculate male, female, and unspecified sex of recorded species', function () {

        var count = (0, _taxonLine2.default)('MALL 1 6 2m 3m mmm f m 3 4f fmfm');

        expect(count.phenotype.male.unspecified.emit()).toBe(11);
        expect(count.phenotype.female.unspecified.emit()).toBe(7);
        expect(count.phenotype.unspecified.emit()).toBe(10);
        expect(count.identifier.emit()).toBe('MALL');
    });

    it('should correctly calculate juveniles, immatures, and adults', function () {

        var count = (0, _taxonLine2.default)('YHVI m f 3j 2a 4i "three in nest, two out of nest"');

        expect(count.phenotype.male.unspecified.emit()).toBe(1);
        expect(count.phenotype.female.unspecified.emit()).toBe(1);
        expect(count.phenotype.unspecified.emit()).toBe(0);
        expect(count.identifier.emit()).toBe('YHVI');
        expect(count.phenotype.juvenile.emit()).toBe(3);
        expect(count.phenotype.adult.emit()).toBe(2);
        expect(count.phenotype.immature.emit()).toBe(4);
    });

    it('should handle a null line', function () {

        var count = (0, _taxonLine2.default)('');

        expect(count.phenotype.male.unspecified.emit()).toBe(0);
    });

    it('should handle an empty line', function () {

        var count = (0, _taxonLine2.default)('MALL');

        expect(count.phenotype.male.unspecified.emit()).toBe(0);
        expect(count.identifier.emit()).toBe('MALL');
    });

    it('should handle a zero count', function () {

        var count = (0, _taxonLine2.default)('MALL');

        expect(count.phenotype.male.unspecified.emit()).toBe(0);
        expect(count.phenotype.female.unspecified.emit()).toBe(0);
        expect(count.phenotype.unspecified.emit()).toBe(0);
        expect(count.identifier.emit()).toBe('MALL');
    });

    it('should handle combo counts', function () {

        var count = (0, _taxonLine2.default)('HOME 2am 3f 2m 3fa');

        expect(count.phenotype.male.adult.emit()).toEqual(2);
        expect(count.phenotype.female.adult.emit()).toEqual(3);
    });

    it('should parse invalid declarations as comments', function () {

        var count = (0, _taxonLine2.default)('BAEA 2ar 3i 4a lots of these here');

        expect(count.phenotype.adult.map(function (val) {
            return val;
        }).emit()).toEqual(4);
        expect(count.comment.emit()[0]).toBe('2ar lots of these here');
    });

    it('should be able to process custom taxon identifiers', function () {

        var count = (0, _taxonLine2.default)('[finch sp.] 30 "flyovers"');

        expect(count.identifier.emit()).toBe('finch sp.');
        expect(count.phenotype.unspecified.emit()).toBe(30);
        expect(count.comment.emit()).toEqual(['flyovers']);
    });

    it('should be able to process checks', function () {

        var count = (0, _taxonLine2.default)('PIWA x "new nesting cavity"');

        expect(count.check.emit()).toEqual(true);
        expect(count.comment.emit()).toEqual(['new nesting cavity']);
    });

    it('should be able to handle a blank species identifier', function () {

        var count = (0, _taxonLine2.default)('[] 35 "flyover of unknown passerine"');

        expect(count.phenotype.unspecified.emit()).toBe(35);
        expect(count.identifier.emit()).toBe('passerine sp.');
    });

    it('should many specs at once', function () {

        var count = (0, _taxonLine2.default)('MALL 27m 10f 15am 20if many feeding at pond 100 "courting behaviour observed" 55 10i');

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

    it('should reject juvenile-sex specifications', function () {

        var count = (0, _taxonLine2.default)('RHWO 2jm 4');

        expect(count.phenotype.juvenile.emit()).toBe(0);
        expect(count.phenotype.unspecified.emit()).toBe(4);
        expect(count.phenotype.male.total.emit()).toBe(2);
    });

    it('should return the proper names', function () {

        var count = (0, _taxonLine2.default)('RHWO 2jm 4');

        expect(count.commonName.emit()).toBe('Red-headed Woodpecker');
        expect(count.scientificName.emit()).toBe('Melanerpes erythrocephalus');
    });
});