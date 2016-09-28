!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in g||(g[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==m.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=g[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(m.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=g[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return D[e]||(D[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=g[s],f=D[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=v(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=g[e];if(t)t.declarative?p(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=v(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=g[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(e){var r={};if("object"==typeof e||"function"==typeof e){var t=e&&e.hasOwnProperty;if(h)for(var n in e)f(r,e,n)||c(r,e,n,t);else for(var n in e)c(r,e,n,t)}return r["default"]=e,y(r,"__useDefault",{value:!0}),r}function c(e,r,t,n){(!n||r.hasOwnProperty(t))&&(e[t]=r[t])}function f(e,r,t){try{var n;return(n=Object.getOwnPropertyDescriptor(r,t))&&y(e,t,n),!0}catch(o){return!1}}function p(r,t){var n=g[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==m.call(t,u)&&(g[u]?p(u,t):v(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function v(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return _(e.substr(6));var r=g[e];if(!r)throw"Module "+e+" not present.";return a(e),p(e,[]),g[e]=void 0,r.declarative&&y(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var g={},m=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},h=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(x){h=!1}var y;!function(){try{Object.defineProperty({},"a",{})&&(y=Object.defineProperty)}catch(e){y=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var D={},_="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:_,register:r,registerDynamic:t,get:v,set:function(e,r){I[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[d],arguments[d]);o(u);var i=v(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)v(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("2", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  var fjs = function() {
    "use strict";
    var fjs = {},
        hardReturn = "hardReturn;";
    var lambda = function lambda(exp) {
      if (!fjs.isString(exp)) {
        return;
      }
      var parts = exp.match(/(.*)\s*[=-]>\s*(.*)/);
      parts.shift();
      var params = parts.shift().replace(/^\s*|\s(?=\s)|\s*$|,/g, "").split(" ");
      var body = parts.shift();
      parts = (!/\s*return\s+/.test(body) ? "return " : "") + body;
      params.push(parts);
      return Function.apply({}, params);
    };
    var sliceArgs = function sliceArgs(args) {
      return args.length > 0 ? [].slice.call(args, 0) : [];
    };
    fjs.isFunction = function(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    };
    fjs.isObject = function(obj) {
      return fjs.isFunction(obj) || !!obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object";
    };
    fjs.isArray = function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };
    var checkFunction = function checkFunction(func) {
      if (!fjs.isFunction(func)) {
        func = lambda(func);
        if (!fjs.isFunction(func)) {
          throw "fjs Error: Invalid function";
        }
      }
      return func;
    };
    fjs.curry = function(func) {
      func = checkFunction(func);
      return function inner() {
        var _args = sliceArgs(arguments);
        if (_args.length === func.length) {
          return func.apply(null, _args);
        } else if (_args.length > func.length) {
          var initial = func.apply(null, _args);
          return fjs.fold(func, initial, _args.slice(func.length));
        } else {
          return function() {
            var args = sliceArgs(arguments);
            return inner.apply(null, _args.concat(args));
          };
        }
      };
    };
    fjs.each = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      if (!fjs.exists(items) || !fjs.isArray(items)) {
        return;
      }
      for (var i = 0,
          j = items.length; i < j; i += 1) {
        if (iterator.call(null, items[i], i) === hardReturn) {
          return;
        }
      }
    });
    fjs.map = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var mapped = [];
      fjs.each(function() {
        mapped.push(iterator.apply(null, arguments));
      }, items);
      return mapped;
    });
    fjs.fold = fjs.foldl = fjs.curry(function(iterator, cumulate, items) {
      iterator = checkFunction(iterator);
      fjs.each(function(item, i) {
        cumulate = iterator.call(null, cumulate, item, i);
      }, items);
      return cumulate;
    });
    fjs.reduce = fjs.reducel = fjs.foldll = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var cumulate = items[0];
      items.shift();
      return fjs.fold(iterator, cumulate, items);
    });
    fjs.clone = function(items) {
      var clone = [];
      fjs.each(function(item) {
        clone.push(item);
      }, items);
      return clone;
    };
    fjs.first = fjs.head = fjs.take = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var first;
      fjs.each(function(item) {
        if (iterator.call(null, item)) {
          first = item;
          return hardReturn;
        }
      }, items);
      return first;
    });
    fjs.rest = fjs.tail = fjs.drop = fjs.curry(function(iterator, items) {
      var result = fjs.select(iterator, items);
      result.shift();
      return result;
    });
    fjs.last = fjs.curry(function(iterator, items) {
      var itemsClone = fjs.clone(items);
      return fjs.first(iterator, itemsClone.reverse());
    });
    fjs.every = fjs.all = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var isEvery = true;
      fjs.each(function(item) {
        if (!iterator.call(null, item)) {
          isEvery = false;
          return hardReturn;
        }
      }, items);
      return isEvery;
    });
    fjs.any = fjs.contains = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var isAny = false;
      fjs.each(function(item) {
        if (iterator.call(null, item)) {
          isAny = true;
          return hardReturn;
        }
      }, items);
      return isAny;
    });
    fjs.select = fjs.filter = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var filtered = [];
      fjs.each(function(item) {
        if (iterator.call(null, item)) {
          filtered.push(item);
        }
      }, items);
      return filtered;
    });
    fjs.best = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var compare = function compare(arg1, arg2) {
        return iterator.call(this, arg1, arg2) ? arg1 : arg2;
      };
      return fjs.reduce(compare, items);
    });
    fjs.while = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var result = [];
      fjs.each(function(item) {
        if (iterator.call(null, item)) {
          result.push(item);
        } else {
          return hardReturn;
        }
      }, items);
      return result;
    });
    fjs.compose = function(funcs) {
      var anyInvalid = fjs.any(function(func) {
        return !fjs.isFunction(func);
      });
      funcs = sliceArgs(arguments).reverse();
      if (anyInvalid(funcs)) {
        throw "fjs Error: Invalid function to compose";
      }
      return function() {
        var args = arguments;
        var applyEach = fjs.each(function(func) {
          args = [func.apply(null, args)];
        });
        applyEach(funcs);
        return args[0];
      };
    };
    fjs.partition = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var truthy = [],
          falsy = [];
      fjs.each(function(item) {
        (iterator.call(null, item) ? truthy : falsy).push(item);
      }, items);
      return [truthy, falsy];
    });
    fjs.group = fjs.curry(function(iterator, items) {
      iterator = checkFunction(iterator);
      var result = {};
      var group;
      fjs.each(function(item) {
        group = iterator.call(null, item);
        result[group] = result[group] || [];
        result[group].push(item);
      }, items);
      return result;
    });
    fjs.shuffle = function(items) {
      var j,
          t;
      fjs.each(function(item, i) {
        j = Math.floor(Math.random() * (i + 1));
        t = items[i];
        items[i] = items[j];
        items[j] = t;
      }, items);
      return items;
    };
    fjs.toArray = function(obj) {
      return fjs.map(function(key) {
        return [key, obj[key]];
      }, Object.keys(obj));
    };
    fjs.apply = fjs.curry(function(func, items) {
      var args = [];
      if (fjs.isArray(func)) {
        args = [].slice.call(func, 1);
        func = func[0];
      }
      return fjs.map(function(item) {
        return item[func].apply(item, args);
      }, items);
    });
    fjs.assign = fjs.extend = fjs.curry(function(obj1, obj2) {
      fjs.each(function(key) {
        obj2[key] = obj1[key];
      }, Object.keys(obj1));
      return obj2;
    });
    fjs.prop = function(prop) {
      return function(obj) {
        return obj[prop];
      };
    };
    fjs.pluck = fjs.curry(function(prop, items) {
      return fjs.map(fjs.prop(prop), items);
    });
    fjs.nub = fjs.unique = fjs.distinct = fjs.curry(function(comparator, items) {
      var unique = items.length > 0 ? [items[0]] : [];
      fjs.each(function(item) {
        if (!fjs.any(fjs.curry(comparator)(item), unique)) {
          unique[unique.length] = item;
        }
      }, items);
      return unique;
    });
    fjs.exists = function(obj) {
      return obj != null;
    };
    fjs.truthy = function(obj) {
      return fjs.exists(obj) && obj !== false;
    };
    fjs.falsy = function(obj) {
      return !fjs.truthy(obj);
    };
    fjs.each(function(type) {
      fjs["is" + type] = function(obj) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
      };
    }, ["Arguments", "Date", "Number", "RegExp", "String"]);
    return fjs;
  }();
  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      exports = module.exports = fjs;
    }
    exports.fjs = fjs;
  }
  return module.exports;
});

$__System.registerDynamic("1", ["2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.explodeString = exports.gatherCount = exports.Count = exports.removeQuotes = exports.gatherComments = undefined;
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _functional = $__require('2');
  var _functional2 = _interopRequireDefault(_functional);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var memoize = function memoize(fn) {
    var cache = {};
    return function() {
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var stringifiedArgs = JSON.stringify(args);
      var result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn.apply(undefined, args);
      return result;
    };
  };
  var Count = function() {
    function Count(x) {
      _classCallCheck(this, Count);
      this.__value = x;
    }
    _createClass(Count, [{
      key: 'map',
      value: function map(f) {
        return this.isNothing() ? Count.of(null) : Count.of(f(this.__value));
      }
    }, {
      key: 'isNothing',
      value: function isNothing() {
        return this.__value === null || this.__value === undefined;
      }
    }]);
    return Count;
  }();
  Count.of = function(x) {
    return new Count(x);
  };
  function countNumbers(str) {
    return str.replace(/\D/g, '') || 0;
  }
  function countMales(str) {
    return countMs(str) === 1 ? parseInt(countNumbers(str)) || 1 : countMs(str);
  }
  function countMs(str) {
    return parseInt((str.match(/m/g) || []).length);
  }
  function countAllMales(val) {
    return val.reduce(function(prev, current) {
      return parseInt(prev) + countMales(current);
    }, 0);
  }
  function countFs(str) {
    return parseInt((str.match(/f/g) || []).length);
  }
  function countFemales(str) {
    return countFs(str) === 1 ? parseInt(countNumbers(str)) || 1 : countFs(str);
  }
  function countAllFemales(val) {
    return val.reduce(function(prev, current) {
      return parseInt(prev) + countFemales(current);
    }, 0);
  }
  function countJs(str) {
    return parseInt((str.match(/j/g) || []).length);
  }
  function countJuveniles(str) {
    return countJs(str) === 1 ? parseInt(countNumbers(str)) || 1 : 0;
  }
  function countAllJuveniles(val) {
    return val.reduce(function(prev, current) {
      return parseInt(prev) + countJuveniles(current);
    }, 0);
  }
  function countIs(str) {
    return parseInt((str.match(/i/g) || []).length);
  }
  function countImmatures(str) {
    return countIs(str) === 1 ? parseInt(countNumbers(str)) || 1 : 0;
  }
  function countAllImmatures(val) {
    return val.reduce(function(prev, current) {
      return parseInt(prev) + countImmatures(current);
    }, 0);
  }
  function countAs(str) {
    return parseInt((str.match(/a/g) || []).length);
  }
  function countAdults(str) {
    return countAs(str) === 1 ? parseInt(countNumbers(str)) || 1 : 0;
  }
  function countAllAdults(val) {
    return val.reduce(function(prev, current) {
      return parseInt(prev) + countAdults(current);
    }, 0);
  }
  function countUnspecified(val) {
    return val.reduce(function(prev, current) {
      return parseInt(prev) + (/[^$,\.\d]/.test(current) ? 0 : parseInt(countNumbers(current)));
    }, 0);
  }
  function countCombo(val) {
    return val.reduce(function(prev, current) {
      var count = 0;
      if (countAs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1)) {
        prev.adults.males = countNumbers(current);
      } else if (countIs(current) === 1 && (countFs(current) === 1 || countMs(current) === 1)) {
        prev.immatures.females = countNumbers(current);
      }
      return prev;
    }, {
      adults: {
        males: 0,
        females: 0
      },
      immatures: {
        males: 0,
        females: 0
      }
    });
  }
  function explodeString(str) {
    return str ? str.split(' ') : null;
  }
  function extractQuotes(str) {
    return str.match(/(['"])((\\\1|.)*?)\1/gm);
  }
  function removeQuotes(str) {
    return str.replace(/(['"])((\\\1|.)*?)\1/gm, '');
  }
  function removeTaxon(str) {
    return str.substring(4);
  }
  function trimQuotes(str) {
    return str ? str.slice(0, -1).substring(1) : null;
  }
  function gatherComments(str) {
    return extractQuotes(str).map(trimQuotes);
  }
  function getSpecies(str) {
    return str.substring(0, 4);
  }
  var _breakOutSpecies = _functional2.default.compose(explodeString, removeQuotes, removeTaxon);
  var breakOutSpecies = memoize(_breakOutSpecies);
  function gatherCount(str) {
    return {
      taxon: Count.of(getSpecies(str)),
      males: Count.of(breakOutSpecies(str)).map(countAllMales),
      females: Count.of(breakOutSpecies(str)).map(countAllFemales),
      unspecified: Count.of(breakOutSpecies(str)).map(countUnspecified),
      juveniles: Count.of(breakOutSpecies(str)).map(countAllJuveniles),
      immatures: Count.of(breakOutSpecies(str)).map(countAllImmatures),
      adults: Count.of(breakOutSpecies(str)).map(countAllAdults)
    };
  }
  exports.gatherComments = gatherComments;
  exports.removeQuotes = removeQuotes;
  exports.Count = Count;
  exports.gatherCount = gatherCount;
  exports.explodeString = explodeString;
  return module.exports;
});

})
(function(factory) {
  factory();
});
//# sourceMappingURL=parse.js.map
