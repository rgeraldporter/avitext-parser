'use strict';

var _checklist = require('./checklist');

var _checklist2 = _interopRequireDefault(_checklist);

var _Maybe = require('../lib/Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('the checklist model', function () {

    it('should handle a avitext checklist', function () {

        var text = 'ONCA Cootes Paradise\n04-09-2016 17:05 15 1.6km\nMALL 36\nRHWO 2\nBCCH 6\nBLJA 4 16 8\nDOWO 3m 2f\nHAWO 5m f';

        var mylist = (0, _checklist2.default)(text);

        expect(mylist.species.length).toBe(6);
        mylist.location.fold(function (x) {
            return expect(x).toBe('Cootes Paradise');
        });
        mylist.province.fold(function (x) {
            return expect(x).toBe('ON');
        });
    });

    it('should handle not having a location code', function () {

        var text = 'Cootes Paradise\n04-09-2016 17:05 15 1.6km\nMALL 36\nRHWO 2\nBCCH 6\nBLJA 4 16 8\nDOWO 3m 2f\nHAWO 5m f';

        var mylist = (0, _checklist2.default)(text);

        expect(mylist.species.length).toBe(6);
        mylist.location.fold(function (x) {
            return expect(x).toBe('Cootes Paradise');
        });
    });

    it('should handle a having no duration or distance', function () {

        var text = 'ONCA Cootes Paradise\n04-09-2016 17:05\nMALL 36\nRHWO 2\nBCCH 6\nBLJA 4 16 8\nDOWO 3m 2f\nHAWO 5m f';

        var mylist = (0, _checklist2.default)(text);

        expect(mylist.species.length).toBe(6);
        mylist.location.fold(function (x) {
            return expect(x).toBe('Cootes Paradise');
        });
        mylist.province.fold(function (x) {
            return expect(x).toBe('ON');
        });
    });

    it('should handle a blank line', function () {

        var text = 'ONCA Cootes Paradise\n04-09-2016 17:05 67\nMALL 36\nRHWO 2\nBCCH 6\n\nBLJA 4 16 8\nDOWO 3m 2f\nHAWO 5m f';

        var mylist = (0, _checklist2.default)(text);

        expect(mylist.species.length).toBe(6);
        mylist.location.fold(function (x) {
            return expect(x).toBe('Cootes Paradise');
        });
        mylist.province.fold(function (x) {
            return expect(x).toBe('ON');
        });
    });
});