"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContainer = void 0;

var _react = require("react");

var _Provider2 = require("./Provider");

var _useTrackedState2 = require("./useTrackedState");

var _useDispatch2 = require("./useDispatch");

var _useSelector2 = require("./useSelector");

var createContainer = function createContainer(useValue) {
  var customContext = (0, _Provider2.createCustomContext)();
  return {
    Provider: function Provider(_ref) {
      var children = _ref.children;
      return (0, _react.createElement)(_Provider2.Provider, {
        useValue: useValue,
        customContext: customContext
      }, children);
    },
    useTrackedState: function useTrackedState() {
      return (0, _useTrackedState2.useTrackedState)({
        customContext: customContext
      });
    },
    useTracked: function useTracked() {
      return (0, _useTrackedState2.useTracked)({
        customContext: customContext
      });
    },
    useDispatch: function useDispatch() {
      return (0, _useDispatch2.useDispatch)({
        customContext: customContext
      });
    },
    useSelector: function useSelector(selector, equalityFn) {
      return (0, _useSelector2.useSelector)(selector, {
        equalityFn: equalityFn,
        customContext: customContext
      });
    }
  };
};

exports.createContainer = createContainer;