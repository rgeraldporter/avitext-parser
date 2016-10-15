"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maybe = function () {
    function Maybe(x) {
        _classCallCheck(this, Maybe);

        this.__value = x;
    }

    _createClass(Maybe, [{
        key: "map",
        value: function map(f) {

            return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
        }
    }, {
        key: "isNothing",
        value: function isNothing() {

            return this.__value === null || this.__value === undefined;
        }
    }, {
        key: "join",
        value: function join() {

            return this.isNothing() ? Maybe.of(null) : this.__value;
        }
    }, {
        key: "emit",
        value: function emit() {

            return this.__value;
        }
    }]);

    return Maybe;
}();

Maybe.of = function (x) {
    return new Maybe(x);
};

exports.default = Maybe;