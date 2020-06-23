"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memo = void 0;

var _react = require("react");

var _deepProxy = require("./deepProxy");

var memo = function memo(Component, areEqual) {
  var WrappedComponent = function WrappedComponent(props) {
    Object.values(props).forEach(_deepProxy.trackMemo);
    return /*#__PURE__*/(0, _react.createElement)(Component, props);
  };

  return /*#__PURE__*/(0, _react.memo)(WrappedComponent, areEqual);
};

exports.memo = memo;