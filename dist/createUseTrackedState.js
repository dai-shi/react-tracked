"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUseTracked = exports.createUseTrackedState = void 0;

var _react = require("react");

var _utils = require("./utils");

var _deepProxy = require("./deepProxy");

var _createUseUpdate = require("./createUseUpdate");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createUseTrackedState = function createUseTrackedState(context) {
  return function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _useReducer = (0, _react.useReducer)(function (c) {
      return c + 1;
    }, 0),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        forceUpdate = _useReducer2[1];

    var _useContext = (0, _react.useContext)(context),
        state = _useContext.state,
        subscribe = _useContext.subscribe;

    var affected = new WeakMap();
    var lastTracked = (0, _react.useRef)(null);
    (0, _utils.useIsomorphicLayoutEffect)(function () {
      lastTracked.current = {
        state: state,
        affected: affected,
        cache: new WeakMap(),

        /* eslint-disable no-nested-ternary, indent */
        assumeChangedIfNotAffected: opts.unstable_forceUpdateForStateChange ? true : opts.unstable_ignoreIntermediateObjectUsage ? false :
        /* default */
        null
        /* eslint-enable no-nested-ternary, indent */

      };
    });
    (0, _utils.useIsomorphicLayoutEffect)(function () {
      var callback = function callback(nextState) {
        if (lastTracked.current.state === nextState || !(0, _deepProxy.isDeepChanged)(lastTracked.current.state, nextState, lastTracked.current.affected, lastTracked.current.cache, lastTracked.current.assumeChangedIfNotAffected)) {
          // not changed
          return;
        }

        forceUpdate();
      };

      var unsubscribe = subscribe(callback);
      return unsubscribe;
    }, [subscribe]);
    var proxyCache = (0, _react.useRef)(new WeakMap()); // per-hook proxyCache

    return (0, _deepProxy.createDeepProxy)(state, affected, proxyCache.current);
  };
};

exports.createUseTrackedState = createUseTrackedState;

var createUseTracked = function createUseTracked(context) {
  var useTrackedState = createUseTrackedState(context);
  var useUpdate = (0, _createUseUpdate.createUseUpdate)(context);
  return function (opts) {
    var state = useTrackedState(opts);
    var update = useUpdate();
    return (0, _react.useMemo)(function () {
      return [state, update];
    }, [state, update]);
  };
};

exports.createUseTracked = createUseTracked;