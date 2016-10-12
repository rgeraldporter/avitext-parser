'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checklist = require('./model/checklist');

var _checklist2 = _interopRequireDefault(_checklist);

var _csv = require('./lib/csv');

var _csv2 = _interopRequireDefault(_csv);

var _birdbrain = require('./lib/birdbrain');

var _birdbrain2 = _interopRequireDefault(_birdbrain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parse = function () {
    function Parse(text) {
        _classCallCheck(this, Parse);

        this.source = text;
        this.checklist = (0, _checklist2.default)(text);
    }

    _createClass(Parse, [{
        key: 'toCsv',
        value: function toCsv() {
            return (0, _csv2.default)(this._buildRows()).split("\n").slice(1).join("\n");
        }
    }, {
        key: '_buildRows',
        value: function _buildRows() {

            var list = this.checklist;

            function calculateTotal(val) {

                return val.male.total.toInt() + val.female.total.toInt() + val.juvenile.toInt() + val.immature.toInt() + val.adult.toInt() + val.unspecified.toInt();
            }

            function matchBandCode(val) {

                return _birdbrain2.default[val.join()] ? _birdbrain2.default[val.join()].name : val.join();
            }

            function getSpeciesName(val) {

                return val.isNothing() ? 'bird sp.' : matchBandCode(val);
            }

            return list.species.reduce(function (prev, current) {

                var row = {

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
                    'Submission Comments': '[Parsed from AviText file. See <https://github.com/rgeraldporter/avitext-spec> for more info.]'
                };

                prev.push(row);

                return prev;
            }, []);
        }
    }]);

    return Parse;
}();

exports.default = Parse;