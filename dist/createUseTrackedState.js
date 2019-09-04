"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUseTracked = exports.createUseTrackedState = void 0;

var _react = require("react");

var _utils = require("./utils");

var _deepProxy = require("./deepProxy");

var _createUseUpdate = require("./createUseUpdate");

var createUseTrackedState = function createUseTrackedState(context) {
  return function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var forceUpdate = (0, _utils.useForceUpdate)();

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

        /* eslint-disable no-nested-ternary, indent, @typescript-eslint/indent */
        assumeChangedIfNotAffected: opts.unstable_forceUpdateForStateChange ? true : opts.unstable_ignoreIntermediateObjectUsage ? false :
        /* default */
        null
        /* eslint-enable no-nested-ternary, indent, @typescript-eslint/indent */

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
    }, [subscribe, forceUpdate]);
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