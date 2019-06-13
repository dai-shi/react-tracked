"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDispatch = void 0;

var _react = require("react");

var _Provider = require("./Provider");

var useDispatch = function useDispatch() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _opts$customContext = opts.customContext,
      customContext = _opts$customContext === void 0 ? _Provider.defaultContext : _opts$customContext;

  var _useContext = (0, _react.useContext)(customContext),
      dispatch = _useContext.dispatch;

  return dispatch;
};

exports.useDispatch = useDispatch;