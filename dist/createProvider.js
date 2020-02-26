"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProvider = exports.createCustomContext = exports.SUBSCRIBE_CONTEXT_PROPERTY = exports.UPDATE_CONTEXT_PROPERTY = exports.STATE_CONTEXT_PROPERTY = void 0;

var _react = require("react");

var _utils = require("./utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// -------------------------------------------------------
// context
// -------------------------------------------------------
var STATE_CONTEXT_PROPERTY = 's';
exports.STATE_CONTEXT_PROPERTY = STATE_CONTEXT_PROPERTY;
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
  return function (props) {
    var _value;

    var _useValue = useValue(props),
        _useValue2 = _slicedToArray(_useValue, 2),
        state = _useValue2[0],
        update = _useValue2[1];

    var listeners = (0, _react.useRef)([]);

    if (process.env.NODE_ENV !== 'production') {
      // we use layout effect to eliminate warnings.
      // but, this leads tearing with startTransition.
      // https://github.com/dai-shi/use-context-selector/pull/13
      (0, _utils.useIsomorphicLayoutEffect)(function () {
        listeners.current.forEach(function (listener) {
          return listener(state);
        });
      });
    } else {
      // we call listeners in render for optimization.
      // although this is not a recommended pattern,
      // so far this is only the way to make it as expected.
      // we are looking for better solutions.
      // https://github.com/dai-shi/use-context-selector/pull/12
      listeners.current.forEach(function (listener) {
        return listener(state);
      });
    }

    var subscribe = (0, _react.useCallback)(function (listener) {
      listeners.current.push(listener);

      var unsubscribe = function unsubscribe() {
        var index = listeners.current.indexOf(listener);
        listeners.current.splice(index, 1);
      };

      return unsubscribe;
    }, []);
    return (0, _react.createElement)(context.Provider, {
      value: (_value = {}, _defineProperty(_value, STATE_CONTEXT_PROPERTY, state), _defineProperty(_value, UPDATE_CONTEXT_PROPERTY, update), _defineProperty(_value, SUBSCRIBE_CONTEXT_PROPERTY, subscribe), _value)
    }, props.children);
  };
};

exports.createProvider = createProvider;