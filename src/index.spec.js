import Parse from './index';

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

    it('should handle a avitext checklist conversion to csv', () => {
        let text = `ONCA Cootes Paradise
04-09-2016 17:05 15 1.6km
DOWO 3m 2f
HAWO 5m f`;

        let expectedCsv = `"Downy Woodpecker","","",5,"2 unspecified age females |3 unspecified age males |","Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.99","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"
"Hairy Woodpecker","","",6,"1 unspecified age females |5 unspecified age males |","Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.99","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"`;

        let myParsedChecklist = new Parse(text);

        expect(myParsedChecklist.checklist.species.length).toBe(2);
        expect(myParsedChecklist.checklist.location.emit()).toBe('Cootes Paradise');
        expect(myParsedChecklist.checklist.province.emit()).toBe('ON');
        expect(myParsedChecklist.source).toBe(text);
        expect(myParsedChecklist.toCsv()).toBe(expectedCsv);
    });

    it('should handle a avitext checklist conversion to csv with species comments', () => {
        let text = `ONCA Cootes Paradise
04-09-2016 17:05 15 1.6km
DOWO 3m 2f "photos taken"
HAWO 5m f`;

        let expectedCsv = `"Downy Woodpecker","","",5,"2 unspecified age females |3 unspecified age males |photos taken","Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.99","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"
"Hairy Woodpecker","","",6,"1 unspecified age females |5 unspecified age males |","Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.99","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"`;

        let myParsedChecklist = new Parse(text);

        expect(myParsedChecklist.checklist.species.length).toBe(2);
        expect(myParsedChecklist.checklist.location.emit()).toBe('Cootes Paradise');
        expect(myParsedChecklist.checklist.province.emit()).toBe('ON');
        expect(myParsedChecklist.source).toBe(text);
        expect(myParsedChecklist.toCsv()).toBe(expectedCsv);
    });

    it(
        'should handle a avitext checklist conversion to csv with species comments and a distance starting with a decimal',
        () => {
            let text = `ONCA Cootes Paradise
04-09-2016 17:05 15 .6km
DOWO 3m 2f "photos taken"
HAWO 5m f`;

            let expectedCsv = `"Downy Woodpecker","","",5,"2 unspecified age females |3 unspecified age males |photos taken","Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.37","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"
"Hairy Woodpecker","","",6,"1 unspecified age females |5 unspecified age males |","Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.37","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"`;

            let myParsedChecklist = new Parse(text);

            expect(myParsedChecklist.checklist.species.length).toBe(2);
            expect(myParsedChecklist.checklist.location.emit()).toBe('Cootes Paradise');
            expect(myParsedChecklist.checklist.province.emit()).toBe('ON');
            expect(myParsedChecklist.source).toBe(text);
            expect(myParsedChecklist.toCsv()).toBe(expectedCsv);
        }
    );
});
