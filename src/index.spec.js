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
        expect(myParsedChecklist.checklist.location.__value).toBe('Cootes Paradise');
        expect(myParsedChecklist.checklist.province.__value).toBe('ON');
        expect(myParsedChecklist.source).toBe(text);
    });

    it('should handle a avitext checklist conversion to csv', () => {

        let text = `ONCA Cootes Paradise
04-09-2016 17:05 15 1.6km
MALL 36
RBWO 2
BCCH 6
BLJA 4 16 8
DOWO 3m 2f
HAWO 5m f`;

        let expectedCsv = `"Mallard","","",36,,"Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.62","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"
"Red-bellied Woodpecker","","",2,,"Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.62","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"
"Black-capped Chickadee","","",6,,"Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.62","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"
"Blue Jay","","",28,,"Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.62","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"
"Downy Woodpecker","","",5,,"Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.62","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"
"Hairy Woodpecker","","",6,,"Cootes Paradise","","","04/09/2016","17:05","ON","CA","Traveling",1,"15","Y","0.62","","[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]"`;

        let myParsedChecklist = new Parse(text);

        expect(myParsedChecklist.checklist.species.length).toBe(6);
        expect(myParsedChecklist.checklist.location.__value).toBe('Cootes Paradise');
        expect(myParsedChecklist.checklist.province.__value).toBe('ON');
        expect(myParsedChecklist.source).toBe(text);
        expect(myParsedChecklist.toCsv()).toBe(expectedCsv);
    });
});