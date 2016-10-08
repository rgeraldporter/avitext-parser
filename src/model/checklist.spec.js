import checklist from './checklist';
import Maybe from '../lib/Maybe';

describe('the checklist class', () => {

    it('should handle a avitext checklist', () => {

        let text = `ONCA Cootes Paradise
04-09-2016 17:05 15 1.6km
MALL 36
RHWO 2
BCCH 6
BLJA 4 16 8
DOWO 3m 2f
HAWO 5m f`;

        let mylist = checklist(text);

        expect(mylist.species.length).toBe(6);
        expect(mylist.location.__value).toBe('Cootes Paradise');
        expect(mylist.province.__value).toBe('ON');
    });
});