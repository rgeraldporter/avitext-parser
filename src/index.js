import checklist from './model/checklist';
import toCsv from './lib/csv';
import birdBrain from './lib/birdbrain';

class Parse {

    constructor(text) {

        this.source = text;
        this.checklist = checklist(text);
    }

    toCsv() {
        return toCsv(this._buildRows()).split("\n").slice(1).join("\n");
    }

    _buildRows() {

        const list = this.checklist;

        function calculateTotal(val) {

            return val.male.total.toInt() +
                val.female.total.toInt() +
                val.juvenile.toInt() +
                val.immature.toInt() +
                val.adult.toInt() +
                val.unspecified.toInt();
        }

        function matchBandCode(val) {

            return birdBrain[ val.join() ] ? birdBrain[ val.join() ].name : val.join();
        }

        function getSpeciesName(val) {

            return val.isNothing() ? 'bird sp.' : matchBandCode(val);
        }

        return list.species.reduce((prev, current) => {

            const row = {

                'Common Name': getSpeciesName(current.identifier),
                'Genus': '',
                'Species': '',
                'Number': calculateTotal(current.phenotype),
                'Species Comments': current.comment.__value,
                'Location Name': list.location.__value, // technically mutable......
                // for these mutables we should set them as consts that get obj merged instead
                'Latitude': '',
                'Longitude': '',
                'Date': list.date.__value,
                'Start Time': list.time.__value,
                'State/Province': list.province.__value || 'ON',
                'Country Code': list.country.__value || 'CA',
                'Protocol': list.protocol.__value,
                'Number of Observers': 1,
                'Duration': list.duration.__value,
                'All observations reported?': 'Y',
                'Effort Distance Miles': list.distance.__value,
                'Effort Area Acres': '',
                'Submission Comments': '[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]'
            };

            prev.push(row);

            return prev;
        }, []);
    }
}

export {Parse as default};
