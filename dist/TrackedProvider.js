"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackedProvider = exports.defaultContext = void 0;

var _react = require("react");

var _batchedUpdates = require("./batchedUpdates");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// context
var warningObject = {
  get state() {
    throw new Error('Please use <TrackedProvider ...>');
  },

  get dispatch() {
    throw new Error('Please use <TrackedProvider ...>');
  },

  get subscribe() {
    throw new Error('Please use <TrackedProvider ...>');
  }

};

var calculateChangedBits = function calculateChangedBits() {
  return 0;
};

var defaultContext = (0, _react.createContext)(warningObject, calculateChangedBits);
exports.defaultContext = defaultContext;

var TrackedProvider = function TrackedProvider(_ref) {
  var useValue = _ref.useValue,
      _ref$customContext = _ref.customContext,
      customContext = _ref$customContext === void 0 ? defaultContext : _ref$customContext,
      children = _ref.children;

  var _useValue = useValue(),
      _useValue2 = _slicedToArray(_useValue, 2),
      state = _useValue2[0],
      dispatch = _useValue2[1];

  var listeners = (0, _react.useRef)([]);
  (0, _batchedUpdates.batchedUpdates)(function () {
    listeners.current.forEach(function (listener) {
      return listener(state);
    });
  });
  var subscribe = (0, _react.useCallback)(function (listener) {
    listeners.current.push(listener);

    var unsubscribe = function unsubscribe() {
      var index = listeners.current.indexOf(listener);
      listeners.current.splice(index, 1);
    };

    return unsubscribe;
  }, []);
  return (0, _react.createElement)(customContext.Provider, {
    value: {
      state: state,
      dispatch: dispatch,
      subscribe: subscribe
    }
  }, children);
};

exports.TrackedProvider = TrackedProvider;