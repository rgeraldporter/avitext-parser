"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* Converts a value to a string appropriate for entry into a CSV table.  E.g., a string value will be surrounded by quotes.
* @param {string|number|object} theValue
* @param {string} sDelimiter The string delimiter.  Defaults to a double quote (") if omitted.
*/
function toCsvValue(theValue, sDelimiter) {
    var t = typeof theValue === "undefined" ? "undefined" : _typeof(theValue);
    var output = void 0,
        stringDelimiter = void 0;

    if (typeof sDelimiter === "undefined" || sDelimiter === null) stringDelimiter = '"';else stringDelimiter = sDelimiter;

    if (t === "undefined" || t === null) output = '';else if (t === 'string') output = sDelimiter + theValue + sDelimiter;else output = String(theValue);

    return output;
}

/**
* Converts an array of objects (with identical schemas) into a CSV table.
* @param {Array} objArray An array of objects.  Each object in the array must have the same property list.
* @param {string} sDelimiter The string delimiter.  Defaults to a double quote (") if omitted.
* @param {string} cDelimiter The column delimiter.  Defaults to a comma (,) if omitted.
* @return {string} The CSV equivalent of objArray.
*/
function toCsv(objArray, sDelimiter, cDelimiter) {
    var i = void 0,
        l = void 0,
        names = [],
        name = void 0,
        value = void 0,
        obj = void 0,
        row = void 0,
        output = "",
        n = void 0,
        nl = void 0;

    // Initialize default parameters.
    if (typeof sDelimiter === "undefined" || sDelimiter === null) {
        sDelimiter = '"';
    }
    if (typeof cDelimiter === "undefined" || cDelimiter === null) {
        cDelimiter = ",";
    }

    for (i = 0, l = objArray.length; i < l; i += 1) {
        // Get the names of the properties.
        obj = objArray[i];
        row = "";
        if (i === 0) {
            // Loop through the names
            for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                    names.push(name);
                    row += [sDelimiter, name, sDelimiter, cDelimiter].join("");
                }
            }
            row = row.substring(0, row.length - 1);
            output += row;
        }

        output += "\n";
        row = "";
        for (n = 0, nl = names.length; n < nl; n += 1) {
            name = names[n];
            value = obj[name];
            if (n > 0) {
                row += ",";
            }
            row += toCsvValue(value, '"');
        }
        output += row;
    }

    return output;
}

exports.default = toCsv;