"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAffectedDebugValue = exports.useIsomorphicLayoutEffect = void 0;

var _react = require("react");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  (0, _react.useDebugValue)(pathList.current);
};

exports.useAffectedDebugValue = useAffectedDebugValue;