'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _effortLine = require('./effortLine');

var _effortLine2 = _interopRequireDefault(_effortLine);

var _locationLine = require('./locationLine');

var _locationLine2 = _interopRequireDefault(_locationLine);

var _taxonLine = require('./taxonLine');

var _taxonLine2 = _interopRequireDefault(_taxonLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processLines = function processLines(arr) {
    return arr.reduce(function (prev, current, index) {

        switch (index) {

            case 0:
                {

                    var location = (0, _locationLine2.default)(current);

                    Object.assign(prev, location);
                    // for ES7 we could use:
                    //prev = {...prev, ...location};
                    break;
                }
            case 1:
                {

                    var effort = (0, _effortLine2.default)(current);

                    Object.assign(prev, effort);
                    break;
                }
            default:
                {

                    if (!current) return prev;

                    var taxon = (0, _taxonLine2.default)(current);

                    prev.species.push(taxon);
                    break;
                }
        }

        return prev;
    }, { species: [] });
};

function checklist(str) {

    var lines = str.split(/\n/);

    return processLines(lines);
}

exports.default = checklist;