"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Count_ = function Count_(x) {
    return {
        map: function map(f) {
            return x ? Count_(f(x)) : Count_(null);
        },
        isNothing: function isNothing() {
            return x === null || x === undefined;
        },
        join: function join() {
            return x ? x : Count_(null);
        },
        toInt: function toInt() {
            return x ? parseInt(x) : 0;
        },
        emit: function emit() {
            return x;
        },
        fold: function fold(f) {
            return f(x);
        }
    };
};

var Count = {
    of: function of(x) {
        return Count_(x);
    }
};

exports.default = Count;