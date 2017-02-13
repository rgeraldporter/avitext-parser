import parseLocationLine from './locationLine';
import Maybe from '../lib/Maybe';

describe('the location line model', () => {

    it('should grab the location, province, country', () => {

        const location = parseLocationLine('ONCA Hamilton--Cootes Paradise Sanctuary');

        expect(location.location.emit()).toBe('Hamilton--Cootes Paradise Sanctuary');
        expect(location.province.emit()).toBe('ON');
        expect(location.country.emit()).toBe('CA');

        const location2 = parseLocationLine('MX-CHH Basaseachi National Park');

        expect(location2.location.emit()).toBe('Basaseachi National Park');
        expect(location2.province.emit()).toBe('CHH');
        expect(location2.country.emit()).toBe('MX');
    });

    it('should return just the location if regional codes are not added', () => {

        const location = parseLocationLine('Hamilton--Cootes Paradise Sanctuary');

        expect(location.location.emit()).toBe('Hamilton--Cootes Paradise Sanctuary');
        expect(location.province.emit()).toBe(null);
        expect(location.country.emit()).toBe(null);
    });
});
