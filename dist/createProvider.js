"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProvider = exports.createCustomContext = exports.SUBSCRIBE_CONTEXT_PROPERTY = exports.UPDATE_CONTEXT_PROPERTY = exports.VERSION_CONTEXT_PROPERTY = exports.STATE_CONTEXT_PROPERTY = void 0;

var _react = require("react");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// -------------------------------------------------------
// context
// -------------------------------------------------------
var STATE_CONTEXT_PROPERTY = 's';
exports.STATE_CONTEXT_PROPERTY = STATE_CONTEXT_PROPERTY;
var VERSION_CONTEXT_PROPERTY = 'v';
exports.VERSION_CONTEXT_PROPERTY = VERSION_CONTEXT_PROPERTY;
var UPDATE_CONTEXT_PROPERTY = 'u';
exports.UPDATE_CONTEXT_PROPERTY = UPDATE_CONTEXT_PROPERTY;
var SUBSCRIBE_CONTEXT_PROPERTY = 'b';
exports.SUBSCRIBE_CONTEXT_PROPERTY = SUBSCRIBE_CONTEXT_PROPERTY;
var WARNING_MESSAGE = 'Please use <Provider>';
var warningObject = {
  get s
  /* [STATE_CONTEXT_PROPERTY] */
  () {
    throw new Error(WARNING_MESSAGE);
  },

  get u
  /* [UPDATE_CONTEXT_PROPERTY] */
  () {
    throw new Error(WARNING_MESSAGE);
  }

};

var calculateChangedBits = function calculateChangedBits(a, b) {
  return a[UPDATE_CONTEXT_PROPERTY] !== b[UPDATE_CONTEXT_PROPERTY] || a[SUBSCRIBE_CONTEXT_PROPERTY] !== b[SUBSCRIBE_CONTEXT_PROPERTY] ? 1 : 0;
};

var createCustomContext = function createCustomContext() {
  var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : warningObject;
  var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : calculateChangedBits;
  return (0, _react.createContext)(w, c);
}; // -------------------------------------------------------
// provider
// -------------------------------------------------------


exports.createCustomContext = createCustomContext;

var createProvider = function createProvider(context, useValue) {
  var Provider = function Provider(props) {
    var _value;

    var _useValue = useValue(props),
        _useValue2 = _slicedToArray(_useValue, 2),
        state = _useValue2[0],
        update = _useValue2[1];

    var _useState = (0, _react.useState)(0),
        _useState2 = _slicedToArray(_useState, 2),
        version = _useState2[0],
        setVersion = _useState2[1];

    var versionRef = (0, _react.useRef)(0);
    var listeners = (0, _react.useRef)([]);
    var updateAndNotify = (0, _react.useCallback)(function () {
      versionRef.current += 1;
      listeners.current.forEach(function (listener) {
        return listener(versionRef.current);
      });
      setVersion(versionRef.current);
      return update.apply(void 0, arguments);
    }, [update]);
    (0, _react.useEffect)(function () {
      versionRef.current += 1;
      listeners.current.forEach(function (listener) {
        return listener(versionRef.current, state);
      });
      setVersion(versionRef.current);
    }, [state]);
    var subscribe = (0, _react.useCallback)(function (listener) {
      listeners.current.push(listener);

      var unsubscribe = function unsubscribe() {
        var index = listeners.current.indexOf(listener);
        listeners.current.splice(index, 1);
      };

      return unsubscribe;
    }, []);
    return (0, _react.createElement)(context.Provider, {
      value: (_value = {}, _defineProperty(_value, STATE_CONTEXT_PROPERTY, state), _defineProperty(_value, VERSION_CONTEXT_PROPERTY, version), _defineProperty(_value, UPDATE_CONTEXT_PROPERTY, updateAndNotify), _defineProperty(_value, SUBSCRIBE_CONTEXT_PROPERTY, subscribe), _value)
    }, props.children);
  };

  return Provider;
};

exports.createProvider = createProvider;