'use strict';

var Parse = require('../app/index.js').default;

describe('the Parse class', function () {

    it('should handle a avitext checklist', function () {

        var text = 'ONCA Cootes Paradise\n04-09-2016 17:05 15 1.6km\nMALL 36\nRBWO 2\nBCCH 6\nBLJA 4 16 8\nDOWO 3m 2f\nHAWO 5m f';

        var myParsedChecklist = new Parse(text);

        expect(myParsedChecklist.checklist.species.length).toBe(6);
        expect(myParsedChecklist.checklist.location.__value).toBe('Cootes Paradise');
        expect(myParsedChecklist.checklist.province.__value).toBe('ON');
        expect(myParsedChecklist.source).toBe(text);
    });
});