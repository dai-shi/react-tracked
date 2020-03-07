"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUseSelector = void 0;

var _react = require("react");

var _utils = require("./utils");

var _createProvider = require("./createProvider");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EQUALITY_FN_PROPERTY = 'e';
var SELECTOR_PROPERTY = 'r';
var STATE_PROPERTY = 's';
var SELECTED_PROPERTY = 'l';

var defaultEqualityFn = function defaultEqualityFn(a, b) {
  return a === b;
};

var createUseSelector = function createUseSelector(context) {
  var useSelector = function useSelector(selector) {
    var equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityFn;

    var _useContext = (0, _react.useContext)(context),
        state = _useContext[_createProvider.STATE_CONTEXT_PROPERTY],
        version = _useContext[_createProvider.VERSION_CONTEXT_PROPERTY],
        subscribe = _useContext[_createProvider.SUBSCRIBE_CONTEXT_PROPERTY];

    var selected = selector(state);
    var ref = (0, _react.useRef)();
    (0, _utils.useIsomorphicLayoutEffect)(function () {
      var _ref$current;

      ref.current = (_ref$current = {}, _defineProperty(_ref$current, EQUALITY_FN_PROPERTY, equalityFn), _defineProperty(_ref$current, SELECTOR_PROPERTY, selector), _defineProperty(_ref$current, STATE_PROPERTY, state), _defineProperty(_ref$current, SELECTED_PROPERTY, selected), _ref$current);
    });

    var _useReducer = (0, _react.useReducer)(function (c, v) {
      if (version < v) {
        return c + 1; // schedule update
      }

      try {
        var refCurrent = ref.current;

        if (refCurrent[STATE_PROPERTY] === state || refCurrent[EQUALITY_FN_PROPERTY](refCurrent[SELECTED_PROPERTY], refCurrent[SELECTOR_PROPERTY](state))) {
          // not changed
          return c; // bail out
        }
      } catch (e) {// ignored (stale props or some other reason)
      }

      return c + 1;
    }, 0),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        checkUpdate = _useReducer2[1];

    (0, _utils.useIsomorphicLayoutEffect)(function () {
      var callback = function callback(nextVersion, nextState) {
        try {
          var refCurrent = ref.current;

          if (nextState && (refCurrent[STATE_PROPERTY] === nextState || refCurrent[EQUALITY_FN_PROPERTY](refCurrent[SELECTED_PROPERTY], refCurrent[SELECTOR_PROPERTY](nextState)))) {
            // not changed
            return;
          }
        } catch (e) {// ignored (stale props or some other reason)
        }

        checkUpdate(nextVersion);
      };

      var unsubscribe = subscribe(callback);
      return unsubscribe;
    }, [subscribe]);
    return selected;
  };

  return useSelector;
};

exports.createUseSelector = createUseSelector;