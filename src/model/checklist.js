import parseEffortLine from './effortLine';
import parseLocationLine from './locationLine';
import calculateTaxonLine from './taxonLine';

const processLines = arr => arr.reduce((prev, current, index) => {

    switch (index) {

        case 0: {

            const location = parseLocationLine(current);

            Object.assign(prev, location);
            // for ES7 we could use:
            //prev = {...prev, ...location};
            break;
        }
        case 1: {

            const effort = parseEffortLine(current);

            Object.assign(prev, effort);
            break;
        }
        default: {

            if (!current) return prev;

            const taxon = calculateTaxonLine(current);

            prev.species.push(taxon);
            break;
        }
    }

    return prev;
}, {species: []});

function checklist(str) {

    const lines = str.split(/\n/);

    return processLines(lines);
}

export {checklist as default};
