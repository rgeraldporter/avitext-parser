import parseLocationLine from './locationLine';
import Maybe from '../lib/Maybe';

describe('the location line parser', () => {

    it('should leave the string alone, for now', () => {

        const location = parseLocationLine('Hamilton--Cootes Paradise Sanctuary');

        expect(location.__value).toBe('Hamilton--Cootes Paradise Sanctuary')
    });
});
