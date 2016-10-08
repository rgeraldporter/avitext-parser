import parseLocationLine from './locationLine';
import Maybe from '../lib/Maybe';

describe('the location line parser', () => {

    it('should grab the location, province, country', () => {

        const location = parseLocationLine('ONCA Hamilton--Cootes Paradise Sanctuary');

        expect(location.location.__value).toBe('Hamilton--Cootes Paradise Sanctuary');
        expect(location.province.__value).toBe('ON');
        expect(location.country.__value).toBe('CA');

        const location2 = parseLocationLine('MX-CHH Basaseachi National Park');

        expect(location2.location.__value).toBe('Basaseachi National Park');
        expect(location2.province.__value).toBe('CHH');
        expect(location2.country.__value).toBe('MX');
    });

    it('should return just the location if regional codes are not added', () => {

        const location = parseLocationLine('Hamilton--Cootes Paradise Sanctuary');

        expect(location.location.__value).toBe('Hamilton--Cootes Paradise Sanctuary');
        expect(location.province.__value).toBe(null);
        expect(location.country.__value).toBe(null);
    });
});
