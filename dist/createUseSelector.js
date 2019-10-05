"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUseSelector = void 0;

var _react = require("react");

var _utils = require("./utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultEqualityFn = function defaultEqualityFn(a, b) {
  return a === b;
};

var createUseSelector = function createUseSelector(context) {
  return function (selector) {
    var equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityFn;

    var _useReducer = (0, _react.useReducer)(function (c) {
      return c + 1;
    }, 0),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        forceUpdate = _useReducer2[1];

    var _useContext = (0, _react.useContext)(context),
        state = _useContext.state,
        subscribe = _useContext.subscribe;

    var selected = selector(state);
    var ref = (0, _react.useRef)(null);
    (0, _utils.useIsomorphicLayoutEffect)(function () {
      ref.current = {
        equalityFn: equalityFn,
        selector: selector,
        state: state,
        selected: selected
      };
    });
    (0, _utils.useIsomorphicLayoutEffect)(function () {
      var callback = function callback(nextState) {
        try {
          if (ref.current.state === nextState || ref.current.equalityFn(ref.current.selected, ref.current.selector(nextState))) {
            // not changed
            return;
          }
        } catch (e) {// ignored (stale props or some other reason)
        }

        forceUpdate();
      };

      var unsubscribe = subscribe(callback);
      return unsubscribe;
    }, [subscribe]);
    return selected;
  };
};

exports.createUseSelector = createUseSelector;