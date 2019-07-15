"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTracked = exports.useTrackedState = exports.createUseTracked = exports.createUseTrackedState = void 0;

var _react = require("react");

var _Provider = require("./Provider");

var _utils = require("./utils");

var _deepProxy = require("./deepProxy");

var _useDispatch = require("./useDispatch");

var createUseTrackedState = function createUseTrackedState(customContext) {
  return function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var forceUpdate = (0, _utils.useForceUpdate)();

    var _useContext = (0, _react.useContext)(customContext),
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
    (0, _react.useEffect)(function () {
      var callback = function callback(nextState) {
        var changed = (0, _deepProxy.isDeepChanged)(lastTracked.current.state, nextState, lastTracked.current.affected, lastTracked.current.cache, lastTracked.current.assumeChangedIfNotAffected);

        if (changed) {
          lastTracked.current.state = nextState;
          forceUpdate();
        }
      };

      var unsubscribe = subscribe(callback); // force update in case the state is already changed

      forceUpdate();
      return unsubscribe;
    }, [subscribe, forceUpdate]);
    var proxyCache = (0, _react.useRef)(new WeakMap()); // per-hook proxyCache

    return (0, _deepProxy.createDeepProxy)(state, affected, proxyCache.current);
  };
};

exports.createUseTrackedState = createUseTrackedState;

var createUseTracked = function createUseTracked(customContext) {
  var useTrackedState = createUseTrackedState(customContext);
  var useDispatch = (0, _useDispatch.createUseDispatch)(customContext);
  return function (opts) {
    var state = useTrackedState(opts);
    var dispatch = useDispatch();
    return (0, _react.useMemo)(function () {
      return [state, dispatch];
    }, [state, dispatch]);
  };
};

exports.createUseTracked = createUseTracked;
var useTrackedState = createUseTrackedState(_Provider.defaultContext);
exports.useTrackedState = useTrackedState;
var useTracked = createUseTracked(_Provider.defaultContext);
exports.useTracked = useTracked;