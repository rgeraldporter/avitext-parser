'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('the Parse class', function () {

    it('should handle a avitext checklist', function () {

        var text = 'ONCA Cootes Paradise\n04-09-2016 17:05 15 1.6km\nMALL 36\nRBWO 2\nBCCH 6\nBLJA 4 16 8\nDOWO 3m 2f\nHAWO 5m f';

        var myParsedChecklist = new _index2.default(text);

        expect(myParsedChecklist.checklist.species.length).toBe(6);
        expect(myParsedChecklist.checklist.location.__value).toBe('Cootes Paradise');
        expect(myParsedChecklist.checklist.province.__value).toBe('ON');
        expect(myParsedChecklist.source).toBe(text);
    });

    it('should handle a avitext checklist conversion to csv', function () {

        var text = 'ONCA Cootes Paradise\n04-09-2016 17:05 15 1.6km\nDOWO 3m 2f\nHAWO 5m f';

        var expectedCsv = '"Downy Woodpecker","","",5,"2 unspecified age females |3 unspecified age males |","Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.62","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"\n"Hairy Woodpecker","","",6,"1 unspecified age females |5 unspecified age males |","Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.62","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"';

        var myParsedChecklist = new _index2.default(text);

        expect(myParsedChecklist.checklist.species.length).toBe(2);
        expect(myParsedChecklist.checklist.location.__value).toBe('Cootes Paradise');
        expect(myParsedChecklist.checklist.province.__value).toBe('ON');
        expect(myParsedChecklist.source).toBe(text);
        expect(myParsedChecklist.toCsv()).toBe(expectedCsv);
    });
});