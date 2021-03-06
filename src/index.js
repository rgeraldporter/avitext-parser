import checklist from './model/checklist';
import toCsv from './lib/csv';
import birdBrain from './lib/birdbrain';

class Parse {

    constructor(text) {
        this.source = text;
        this.checklist = checklist(text);
    }

    toCsv() {
        return toCsv(this._buildRows()).split('\n').slice(1).join('\n');
    }

    _buildRows() {
        const list = this.checklist;

        const calculateTotal = val =>
            val.male.total.toInt() + val.female.total.toInt() + val.juvenile.toInt() + val.immature.toInt() +
                val.adult.toInt() +
                val.unspecified.toInt();

        const matchBandCode = val =>
            birdBrain[val.join()] ? birdBrain[val.join()].name : val.join();

        const getSpeciesName = val =>
            val.isNothing() ? 'bird sp.' : matchBandCode(val);

        function assembleComments(val) {
            let phenotypeComments = '';

            phenotypeComments += val.phenotype.female.immature.toInt()
                ? val.phenotype.female.immature.toInt() + ' immature females |'
                : '';

            phenotypeComments += val.phenotype.female.adult.toInt()
                ? val.phenotype.female.adult.toInt() + ' adult females |'
                : '';

            phenotypeComments += val.phenotype.female.unspecified.toInt()
                ? val.phenotype.female.unspecified.toInt() + ' unspecified age females |'
                : '';

            phenotypeComments += val.phenotype.male.immature.toInt()
                ? val.phenotype.male.immature.toInt() + ' immature males |'
                : '';

            phenotypeComments += val.phenotype.male.adult.toInt()
                ? val.phenotype.male.adult.toInt() + ' adult males |'
                : '';

            phenotypeComments += val.phenotype.male.unspecified.toInt()
                ? val.phenotype.male.unspecified.toInt() + ' unspecified age males |'
                : '';

            phenotypeComments += val.phenotype.juvenile.toInt() ? val.phenotype.juvenile.toInt() + ' juveniles |' : '';

            phenotypeComments += val.phenotype.adult.toInt()
                ? val.phenotype.adult.toInt() + ' unspecified sex adults |'
                : '';

            phenotypeComments += val.comment.emit().length ? val.comment.emit() : '';

            return phenotypeComments;
        }

        return list.species.reduce(
            (prev, current) => {
                const row = {
                    'Common Name': getSpeciesName(current.identifier),
                    'Genus': '',
                    'Species': '',
                    'Number': calculateTotal(current.phenotype),
                    'Species Comments': assembleComments(current),
                    'Location Name': list.location.emit(),
                    // technically mutable......
                    // for these mutables we should set them as consts that get obj merged instead
                    'Latitude': '',
                    'Longitude': '',
                    'Date': list.date.emit(),
                    'Start Time': list.time.emit(),
                    'State/Province': list.province.emit() || 'ON',
                    'Country Code': list.country.emit() || 'CA',
                    'Protocol': list.protocol.emit(),
                    'Number of Observers': 1,
                    'Duration': list.duration.emit(),
                    'All observations reported?': 'Y',
                    'Effort Distance Miles': list.distance.emit(),
                    'Effort Area Acres': '',
                    'Submission Comments': '[Parsed from AviText file. See https://github.com/rgeraldporter/avitext-spec for more info.]'
                };

                prev.push(row);

                return prev;
            },
            []
        );
    }
}

export {Parse as default}
