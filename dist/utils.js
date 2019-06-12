"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForceUpdate = exports.useIsomorphicLayoutEffect = void 0;

var _react = require("react");

var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? _react.useLayoutEffect : _react.useEffect; // useForceUpdate hook

exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;

var forcedReducer = function forcedReducer(state) {
  return state + 1;
};

var useForceUpdate = function useForceUpdate() {
  return (0, _react.useReducer)(forcedReducer, 0)[1];
};

exports.useForceUpdate = useForceUpdate;