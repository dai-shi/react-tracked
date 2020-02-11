"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsomorphicLayoutEffect = void 0;

var _react = require("react");

var isClient = typeof window !== 'undefined' && typeof window.navigator !== 'undefined' && typeof window.navigator.userAgent === 'string' && !window.navigator.userAgent.includes('ServerSideRendering');
var useIsomorphicLayoutEffect = isClient ? _react.useLayoutEffect : _react.useEffect;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;