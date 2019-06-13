"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTracked = exports.useTrackedState = void 0;

var _react = require("react");

var _Provider = require("./Provider");

var _utils = require("./utils");

var _deepProxy = require("./deepProxy");

var _useDispatch = require("./useDispatch");

var useTrackedState = function useTrackedState() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _opts$customContext = opts.customContext,
      customContext = _opts$customContext === void 0 ? _Provider.defaultContext : _opts$customContext;
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
    }; // run once in case the state is already changed


    forceUpdate();
    var unsubscribe = subscribe(callback);
    return unsubscribe;
  }, [subscribe, forceUpdate]);
  var proxyCache = (0, _react.useRef)(new WeakMap()); // per-hook proxyCache

  return (0, _deepProxy.createDeepProxy)(state, affected, proxyCache.current);
};

exports.useTrackedState = useTrackedState;

var useTracked = function useTracked() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var state = useTrackedState(opts);
  var dispatch = (0, _useDispatch.useDispatch)(opts);
  return (0, _react.useMemo)(function () {
    return [state, dispatch];
  }, [state, dispatch]);
};

exports.useTracked = useTracked;