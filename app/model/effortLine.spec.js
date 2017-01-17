'use strict';

var _effortLine = require('./effortLine');

var _effortLine2 = _interopRequireDefault(_effortLine);

var _Maybe = require('../lib/Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('the effort line model', function () {

    it('should be able to determine the date given a two digit year', function () {

        var effort = (0, _effortLine2.default)('02-12-16 17:05 15 1.2km');

        expect(effort.date.__value).toBe('02/12/2016');
    });

    it('should be able to determine the date given no year (and it\'s still 2017)', function () {

        var effort = (0, _effortLine2.default)('02-12 17:05 15 1.2km');

        expect(effort.date.__value).toBe('02/12/2017');
    });

    it('should be able to determine the date given a four digit year', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05 15 1.2km');

        expect(effort.date.__value).toBe('02/12/2016');
    });

    it('should be able to determine the time', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05 15 1.2km');

        expect(effort.time.__value).toBe('17:05');
    });

    it('should be able to determine the duration', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05 15 1.2km');

        expect(effort.duration.__value).toBe('15');
    });

    it('should be able to determine the distance when using km', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05 15 1.2km');

        expect(effort.distance.__value).toBe('0.75');
    });

    it('should be able to determine the distance when using k', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05 15 1.2k');

        expect(effort.distance.__value).toBe('0.75');
    });

    it('should be able to determine the distance when using k, to two decimal values', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05 15 1.6k');

        expect(effort.distance.__value).toBe('0.99');
    });

    it('should be able to determine the distance when using miles', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05 15 0.6');

        expect(effort.distance.__value).toBe('0.6');
        expect(effort.protocol.__value).toBe('Traveling');
    });

    it('should be able to handle having no distance', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05 15');

        expect(effort.duration.__value).toBe('15');
        expect(effort.protocol.__value).toBe('Stationary');
    });

    it('should be able to handle having no duration', function () {

        var effort = (0, _effortLine2.default)('02-12-2016 17:05');

        expect(effort.time.__value).toBe('17:05');
        expect(effort.duration.__value).toBe(null);
        expect(effort.protocol.__value).toBe('Casual');
        expect(effort.complete.__value).toBe(false);
    });

    it('should be able to handle not having a time', function () {

        var effort = (0, _effortLine2.default)('02-12-2016');

        expect(effort.date.__value).toBe('02/12/2016');
        expect(effort.duration.__value).toBe(null);
        expect(effort.protocol.__value).toBe('Casual');
    });
});