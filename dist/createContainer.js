"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContainer = void 0;

var _Provider = require("./Provider");

var _useTrackedState = require("./useTrackedState");

var _useDispatch = require("./useDispatch");

var _useSelector = require("./useSelector");

var createContainer = function createContainer(useValue) {
  var customContext = (0, _Provider.createCustomContext)();
  return {
    Provider: (0, _Provider.createProvider)(customContext, useValue),
    useTrackedState: (0, _useTrackedState.createUseTrackedState)(customContext),
    useTracked: (0, _useTrackedState.createUseTracked)(customContext),
    useDispatch: (0, _useDispatch.createUseDispatch)(customContext),
    useSelector: (0, _useSelector.createUseSelector)(customContext)
  };
};

exports.createContainer = createContainer;