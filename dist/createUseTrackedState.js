"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUseTracked = exports.createUseTrackedState = void 0;

var _react = require("react");

var _utils = require("./utils");

var _createProvider = require("./createProvider");

var _deepProxy = require("./deepProxy");

var _createUseUpdate = require("./createUseUpdate");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED = 0;
var MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED = _deepProxy.MODE_ASSUME_UNCHANGED_IF_UNAFFECTED | _deepProxy.MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP;
var MODE_MUTABLE_ROOT_STATE = _deepProxy.MODE_IGNORE_REF_EQUALITY; // only for root

var MODE_DEFAULT = _deepProxy.MODE_ASSUME_UNCHANGED_IF_UNAFFECTED; // only for root

var STATE_PROPERTY = 's';
var AFFECTED_PROPERTY = 'a';
var CACHE_PROPERTY = 'c';
var DEEP_PROXY_MODE_PROPERTY = 'd';

var createUseTrackedState = function createUseTrackedState(context) {
  var useTrackedState = function useTrackedState() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _useReducer = (0, _react.useReducer)(function (c) {
      return c + 1;
    }, 0),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        forceUpdate = _useReducer2[1];

    var _useContext = (0, _react.useContext)(context),
        state = _useContext[_createProvider.STATE_CONTEXT_PROPERTY],
        subscribe = _useContext[_createProvider.SUBSCRIBE_CONTEXT_PROPERTY];

    var affected = new WeakMap();
    var lastTracked = (0, _react.useRef)();
    (0, _utils.useIsomorphicLayoutEffect)(function () {
      var _lastTracked$current;

      lastTracked.current = (_lastTracked$current = {}, _defineProperty(_lastTracked$current, STATE_PROPERTY, state), _defineProperty(_lastTracked$current, AFFECTED_PROPERTY, affected), _defineProperty(_lastTracked$current, CACHE_PROPERTY, new WeakMap()), _defineProperty(_lastTracked$current, DEEP_PROXY_MODE_PROPERTY, opts.unstable_forceUpdateForStateChange ? MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED : opts.unstable_ignoreIntermediateObjectUsage ? MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED : opts.unstable_ignoreStateEquality ? MODE_MUTABLE_ROOT_STATE :
      /* default */
      MODE_DEFAULT), _lastTracked$current);
    });
    (0, _utils.useIsomorphicLayoutEffect)(function () {
      var callback = function callback(nextState) {
        try {
          var lastTrackedCurrent = lastTracked.current;

          if (lastTrackedCurrent[STATE_PROPERTY] === nextState || !(0, _deepProxy.isDeepChanged)(lastTrackedCurrent[STATE_PROPERTY], nextState, lastTrackedCurrent[AFFECTED_PROPERTY], lastTrackedCurrent[CACHE_PROPERTY], lastTrackedCurrent[DEEP_PROXY_MODE_PROPERTY])) {
            // not changed
            return;
          }
        } catch (e) {// ignored (thrown promise or some other reason)
        }

        forceUpdate();
      };

      var unsubscribe = subscribe(callback);
      return unsubscribe;
    }, [subscribe]);

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      (0, _utils.useAffectedDebugValue)(state, affected);
    }

    var proxyCache = (0, _react.useRef)(new WeakMap()); // per-hook proxyCache

    return (0, _deepProxy.createDeepProxy)(state, affected, proxyCache.current);
  };

  return useTrackedState;
};

exports.createUseTrackedState = createUseTrackedState;

var createUseTracked = function createUseTracked(context) {
  var useTrackedState = createUseTrackedState(context);
  var useUpdate = (0, _createUseUpdate.createUseUpdate)(context);

  var useTracked = function useTracked(opts) {
    var state = useTrackedState(opts);
    var update = useUpdate();
    return (0, _react.useMemo)(function () {
      return [state, update];
    }, [state, update]);
  };

  return useTracked;
};

exports.createUseTracked = createUseTracked;