let Parse = require('../app/index.js').default;

describe('the Parse class', () => {
    it('should handle a avitext checklist', () => {
        let text = `ONCA Cootes Paradise
04-09-2016 17:05 15 1.6km
MALL 36
RBWO 2
BCCH 6
BLJA 4 16 8
DOWO 3m 2f
HAWO 5m f`;

        let myParsedChecklist = new Parse(text);

        expect(myParsedChecklist.checklist.species.length).toBe(6);
        expect(myParsedChecklist.checklist.location.emit()).toBe('Cootes Paradise');
        expect(myParsedChecklist.checklist.province.emit()).toBe('ON');
        expect(myParsedChecklist.source).toBe(text);
    });
});
