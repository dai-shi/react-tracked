"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContainer = void 0;

var _react = require("react");

var _TrackedProvider2 = require("./TrackedProvider");

var _useTracked2 = require("./useTracked");

var _useDispatch2 = require("./useDispatch");

var _useSelector2 = require("./useSelector");

var createContainer = function createContainer(useValue) {
  var customContext = (0, _TrackedProvider2.createCustomContext)();
  return {
    TrackedProvider: function TrackedProvider(_ref) {
      var children = _ref.children;
      return (0, _react.createElement)(_TrackedProvider2.TrackedProvider, {
        useValue: useValue,
        customContext: customContext
      }, children);
    },
    useTrackedState: function useTrackedState() {
      return (0, _useTracked2.useTrackedState)({
        customContext: customContext
      });
    },
    useTracked: function useTracked() {
      return (0, _useTracked2.useTracked)({
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