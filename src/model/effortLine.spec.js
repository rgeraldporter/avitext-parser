import parseEffortLine from './effortLine';
import Maybe from '../lib/Maybe';

describe('the effort line parser', () => {

    it('should be able to determine the date given a two digit year', () => {

        let effort = parseEffortLine('02-12-16 17:05 15 1.2km');

        expect(effort.date.__value).toBe('02/12/2016');
    });

    it('should be able to determine the date given no year (and it\'s still 2016)', () => {

        let effort = parseEffortLine('02-12 17:05 15 1.2km');

        expect(effort.date.__value).toBe('02/12/2016');
    });

    it('should be able to determine the date given a four digit year', () => {

        let effort = parseEffortLine('02-12-2016 17:05 15 1.2km');

        expect(effort.date.__value).toBe('02/12/2016');
    });

    it('should be able to determine the time', () => {

        let effort = parseEffortLine('02-12-2016 17:05 15 1.2km');

        expect(effort.time.__value).toBe('17:05');
    });

    it('should be able to determine the duration', () => {

        let effort = parseEffortLine('02-12-2016 17:05 15 1.2km');

        expect(effort.duration.__value).toBe('15');
    });

    it('should be able to determine the distance when using km', () => {

        let effort = parseEffortLine('02-12-2016 17:05 15 1.2km');

        expect(effort.distance.__value).toBe('0.62');
    });

    it('should be able to determine the distance when using k', () => {

        let effort = parseEffortLine('02-12-2016 17:05 15 1.2k');

        expect(effort.distance.__value).toBe('0.62');
    });

    it('should be able to determine the distance when using miles', () => {

        let effort = parseEffortLine('02-12-2016 17:05 15 0.6');

        expect(effort.distance.__value).toBe('0.6');
    });
});
