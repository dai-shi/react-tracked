"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDispatch = void 0;

var _react = require("react");

var _TrackedProvider = require("./TrackedProvider");

var useDispatch = function useDispatch(_ref) {
  var _ref$customContext = _ref.customContext,
      customContext = _ref$customContext === void 0 ? _TrackedProvider.defaultContext : _ref$customContext;

  var _useContext = (0, _react.useContext)(customContext),
      dispatch = _useContext.dispatch;

  return dispatch;
};

exports.useDispatch = useDispatch;