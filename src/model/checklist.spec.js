import checklist from './checklist';
import Maybe from '../lib/Maybe';

describe('the checklist model', () => {

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
        mylist.location.fold( x => expect(x).toBe('Cootes Paradise') );
        mylist.province.fold( x => expect(x).toBe('ON'));
    });

    it('should handle not having a location code', () => {

        let text = `Cootes Paradise
04-09-2016 17:05 15 1.6km
MALL 36
RHWO 2
BCCH 6
BLJA 4 16 8
DOWO 3m 2f
HAWO 5m f`;

        let mylist = checklist(text);

        expect(mylist.species.length).toBe(6);
        mylist.location.fold(x => expect(x).toBe('Cootes Paradise'));
    });

    it('should handle a having no duration or distance', () => {

        let text = `ONCA Cootes Paradise
04-09-2016 17:05
MALL 36
RHWO 2
BCCH 6
BLJA 4 16 8
DOWO 3m 2f
HAWO 5m f`;

        let mylist = checklist(text);

        expect(mylist.species.length).toBe(6);
        mylist.location.fold( x => expect(x).toBe('Cootes Paradise'));
        mylist.province.fold( x => expect(x).toBe('ON'));
    });

    it('should handle a blank line', () => {

        let text = `ONCA Cootes Paradise
04-09-2016 17:05 67
MALL 36
RHWO 2
BCCH 6

BLJA 4 16 8
DOWO 3m 2f
HAWO 5m f`;

        let mylist = checklist(text);

        expect(mylist.species.length).toBe(6);
        mylist.location.fold( x => expect(x).toBe('Cootes Paradise'));
        mylist.province.fold( x => expect(x).toBe('ON'));
    });
});