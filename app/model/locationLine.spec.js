'use strict';

var _locationLine = require('./locationLine');

var _locationLine2 = _interopRequireDefault(_locationLine);

var _Maybe = require('../lib/Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('the location line model', function () {

    it('should grab the location, province, country', function () {

        var location = (0, _locationLine2.default)('ONCA Hamilton--Cootes Paradise Sanctuary');

        expect(location.location.__value).toBe('Hamilton--Cootes Paradise Sanctuary');
        expect(location.province.__value).toBe('ON');
        expect(location.country.__value).toBe('CA');

        var location2 = (0, _locationLine2.default)('MX-CHH Basaseachi National Park');

        expect(location2.location.__value).toBe('Basaseachi National Park');
        expect(location2.province.__value).toBe('CHH');
        expect(location2.country.__value).toBe('MX');
    });

    it('should return just the location if regional codes are not added', function () {

        var location = (0, _locationLine2.default)('Hamilton--Cootes Paradise Sanctuary');

        expect(location.location.__value).toBe('Hamilton--Cootes Paradise Sanctuary');
        expect(location.province.__value).toBe(null);
        expect(location.country.__value).toBe(null);
    });
});