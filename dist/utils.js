"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAffectedDebugValue = exports.useIsomorphicLayoutEffect = void 0;

var _react = require("react");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var isClient = typeof window !== 'undefined' && !/ServerSideRendering/.test(window.navigator && window.navigator.userAgent);
var useIsomorphicLayoutEffect = isClient ? _react.useLayoutEffect : _react.useEffect;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;

var affectedToPathList = function affectedToPathList(state, affected) {
  var list = [];

  var walk = function walk(obj, path) {
    var used = affected.get(obj);

    if (used) {
      used.forEach(function (key) {
        walk(obj[key], path ? [].concat(_toConsumableArray(path), [key]) : [key]);
      });
    } else if (path) {
      list.push(path);
    }
  };

  walk(state);
  return list;
};

var useAffectedDebugValue = function useAffectedDebugValue(state, affected) {
  var pathList = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    pathList.current = affectedToPathList(state, affected);
  });
  (0, _react.useDebugValue)(pathList);
};

exports.useAffectedDebugValue = useAffectedDebugValue;