"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUseUpdate = void 0;

var _react = require("react");

var createUseUpdate = function createUseUpdate(context) {
  return function () {
    var _useContext = (0, _react.useContext)(context),
        update = _useContext.update;

    return update;
  };
};

exports.createUseUpdate = createUseUpdate;