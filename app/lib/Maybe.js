"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Maybe_ = function Maybe_(x) {
    return {
        map: function map(f) {
            return x ? Maybe_(f(x)) : Maybe_(null);
        },
        isNothing: function isNothing() {
            return x === null || x === undefined;
        },
        join: function join() {
            return x ? x : Maybe_(null);
        },
        emit: function emit() {
            return x;
        },
        fold: function fold(f) {
            return f(x);
        }
    };
};

var Maybe = {
    of: function of(x) {
        return Maybe_(x);
    }
};

exports.default = Maybe;