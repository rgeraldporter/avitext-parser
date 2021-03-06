import parseEffortLine from './effortLine';
import Maybe from '../lib/Maybe';

describe('the effort line model', () => {
    it('should be able to determine the date given a two digit year', () => {
        let effort = parseEffortLine('02-12-16 17:05 15 1.2km');

        expect(effort.date.emit()).toBe('02/12/2016');
    });

    it('should be able to determine the date given no year (and it\'s still 2017)', () => {
        let effort = parseEffortLine('02-12 17:05 15 1.2km');

        expect(effort.date.emit()).toBe('02/12/2017');
    });

    it('should be able to determine the date given a four digit year', () => {
        let effort = parseEffortLine('02-12-2016 17:05 15 1.2km');

        expect(effort.date.emit()).toBe('02/12/2016');
    });

    it('should be able to determine the time', () => {
        let effort = parseEffortLine('02-12-2016 17:05 15 1.2km');

        expect(effort.time.emit()).toBe('17:05');
    });

    it('should be able to determine the duration', () => {
        let effort = parseEffortLine('02-12-2016 17:05 15 1.2km');

        expect(effort.duration.emit()).toBe('15');
    });

    it('should be able to determine the distance when using km', () => {
        let effort = parseEffortLine('02-12-2016 17:05 15 1.2km');

        expect(effort.distance.emit()).toBe('0.75');
    });

    it('should be able to determine the distance when using k', () => {
        let effort = parseEffortLine('02-12-2016 17:05 15 1.2k');

        expect(effort.distance.emit()).toBe('0.75');
    });

    it('should be able to determine the distance when using k, to two decimal values', () => {
        let effort = parseEffortLine('02-12-2016 17:05 15 1.6k');

        expect(effort.distance.emit()).toBe('0.99');
    });

    it('should be able to determine the distance when using miles', () => {
        let effort = parseEffortLine('02-12-2016 17:05 15 0.6');

        expect(effort.distance.emit()).toBe('0.6');
        expect(effort.protocol.emit()).toBe('Traveling');
    });

    it('should be able to handle having no distance', () => {
        let effort = parseEffortLine('02-12-2016 17:05 15');

        expect(effort.duration.emit()).toBe('15');
        expect(effort.protocol.emit()).toBe('Stationary');
    });

    it('should be able to handle having no duration', () => {
        let effort = parseEffortLine('02-12-2016 17:05');

        expect(effort.time.emit()).toBe('17:05');
        expect(effort.duration.emit()).toBe(null);
        expect(effort.protocol.emit()).toBe('Casual');
        expect(effort.complete.emit()).toBe(false);
    });

    it('should be able to handle not having a time', () => {
        let effort = parseEffortLine('02-12-2016');

        expect(effort.date.emit()).toBe('02/12/2016');
        expect(effort.duration.emit()).toBe(null);
        expect(effort.protocol.emit()).toBe('Casual');
    });
});