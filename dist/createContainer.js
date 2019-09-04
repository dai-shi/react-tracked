"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContainer = void 0;

var _createProvider = require("./createProvider");

var _createUseTrackedState = require("./createUseTrackedState");

var _createUseUpdate = require("./createUseUpdate");

var _createUseSelector = require("./createUseSelector");

var createContainer = function createContainer(useValue) {
  var context = (0, _createProvider.createCustomContext)();
  return {
    Provider: (0, _createProvider.createProvider)(context, useValue),
    useTrackedState: (0, _createUseTrackedState.createUseTrackedState)(context),
    useTracked: (0, _createUseTrackedState.createUseTracked)(context),
    useUpdate: (0, _createUseUpdate.createUseUpdate)(context),
    useSelector: (0, _createUseSelector.createUseSelector)(context)
  };
};

exports.createContainer = createContainer;