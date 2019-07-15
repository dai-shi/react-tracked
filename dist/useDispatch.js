"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDispatch = exports.createUseDispatch = void 0;

var _react = require("react");

var _Provider = require("./Provider");

var createUseDispatch = function createUseDispatch(customContext) {
  return function () {
    var _useContext = (0, _react.useContext)(customContext),
        dispatch = _useContext.dispatch;

    return dispatch;
  };
};

exports.createUseDispatch = createUseDispatch;
var useDispatch = createUseDispatch(_Provider.defaultContext);
exports.useDispatch = useDispatch;