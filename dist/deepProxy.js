"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUntrackedObject = exports.trackMemo = exports.isDeepChanged = exports.createDeepProxy = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// -------------------------------------------------------
// deep proxy
// -------------------------------------------------------
var OWN_KEYS_SYMBOL = Symbol();
var TRACK_MEMO_SYMBOL = Symbol();
var GET_ORIGINAL_SYMBOL = Symbol();
var TRACK_OBJ_PROPERTY = 't';
var AFFECTED_PROPERTY = 'a';
var RECORD_USAGE_PROPERTY = 'r';
var RECORD_OBJECT_AS_USED_PROPERTY = 'u';
var ORIGINAL_OBJECT_PROPERTY = 'o';
var PROXY_PROPERTY = 'p';
var PROXY_CACHE_PROPERTY = 'c';
var NEXT_OBJECT_PROPERTY = 'n';
var CHANGED_PROPERTY = 'g';
var GLOBAL_OBJECT = Object;
var GLOBAL_ARRAY = Array;
var GLOBAL_REFLECT = Reflect; // check if obj is a plain object or an array

var isPlainObject = function isPlainObject(obj) {
  try {
    var proto = GLOBAL_OBJECT.getPrototypeOf(obj);
    return proto === GLOBAL_OBJECT.prototype || proto === GLOBAL_ARRAY.prototype;
  } catch (e) {
    return false;
  }
}; // copy obj if frozen


var unfreeze = function unfreeze(obj) {
  if (!GLOBAL_OBJECT.isFrozen(obj)) return obj;

  if (GLOBAL_ARRAY.isArray(obj)) {
    return GLOBAL_ARRAY.from(obj);
  }

  return GLOBAL_OBJECT.assign({}, obj);
};

var createProxyHandler = function createProxyHandler() {
  var _ref;

  return _ref = {}, _defineProperty(_ref, RECORD_USAGE_PROPERTY, function (key) {
    if (this[TRACK_OBJ_PROPERTY]) return;
    var used = this[AFFECTED_PROPERTY].get(this[ORIGINAL_OBJECT_PROPERTY]);

    if (!used) {
      used = new Set();
      this[AFFECTED_PROPERTY].set(this[ORIGINAL_OBJECT_PROPERTY], used);
    }

    used.add(key);
  }), _defineProperty(_ref, RECORD_OBJECT_AS_USED_PROPERTY, function () {
    this[TRACK_OBJ_PROPERTY] = true;
    this[AFFECTED_PROPERTY]["delete"](this[ORIGINAL_OBJECT_PROPERTY]);
  }), _defineProperty(_ref, "get", function get(target, key) {
    if (key === GET_ORIGINAL_SYMBOL) {
      return this[ORIGINAL_OBJECT_PROPERTY];
    }

    this[RECORD_USAGE_PROPERTY](key); // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define

    return createDeepProxy(target[key], this[AFFECTED_PROPERTY], this[PROXY_CACHE_PROPERTY]);
  }), _defineProperty(_ref, "has", function has(target, key) {
    if (key === TRACK_MEMO_SYMBOL) {
      this[RECORD_OBJECT_AS_USED_PROPERTY]();
      return true;
    } // LIMITATION:
    // We simply record the same as get.
    // This means { a: {} } and { a: {} } is detected as changed,
    // if 'a' in obj is handled.


    this[RECORD_USAGE_PROPERTY](key);
    return key in target;
  }), _defineProperty(_ref, "ownKeys", function ownKeys(target) {
    this[RECORD_USAGE_PROPERTY](OWN_KEYS_SYMBOL);
    return GLOBAL_REFLECT.ownKeys(target);
  }), _ref;
};

var createDeepProxy = function createDeepProxy(obj, affected, proxyCache) {
  if (!isPlainObject(obj)) return obj;
  var proxyHandler = proxyCache && proxyCache.get(obj);

  if (!proxyHandler) {
    proxyHandler = createProxyHandler();
    proxyHandler[PROXY_PROPERTY] = new Proxy(unfreeze(obj), proxyHandler);
    proxyHandler[ORIGINAL_OBJECT_PROPERTY] = obj;
    proxyHandler[TRACK_OBJ_PROPERTY] = false; // for trackMemo

    if (proxyCache) {
      proxyCache.set(obj, proxyHandler);
    }
  }

  proxyHandler[AFFECTED_PROPERTY] = affected;
  proxyHandler[PROXY_CACHE_PROPERTY] = proxyCache;
  return proxyHandler[PROXY_PROPERTY];
};

exports.createDeepProxy = createDeepProxy;

var isOwnKeysChanged = function isOwnKeysChanged(origObj, nextObj) {
  var origKeys = GLOBAL_REFLECT.ownKeys(origObj);
  var nextKeys = GLOBAL_REFLECT.ownKeys(nextObj);
  return origKeys.length !== nextKeys.length || origKeys.some(function (k, i) {
    return k !== nextKeys[i];
  });
};

var isDeepChanged = function isDeepChanged(origObj, nextObj, affected, cache, assumeChangedIfNotAffected) {
  if (origObj === nextObj) return false;
  if (_typeof(origObj) !== 'object' || origObj === null) return true;
  if (_typeof(nextObj) !== 'object' || nextObj === null) return true;
  var used = affected.get(origObj);
  if (!used) return !!assumeChangedIfNotAffected;

  if (cache) {
    var hit = cache.get(origObj);

    if (hit && hit[NEXT_OBJECT_PROPERTY] === nextObj) {
      return hit[CHANGED_PROPERTY];
    } // for object with cycles (CHANGED_PROPERTY is `undefined`)


    cache.set(origObj, _defineProperty({}, NEXT_OBJECT_PROPERTY, nextObj));
  }

  var changed = null; // eslint-disable-next-line no-restricted-syntax

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = used[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;
      var c = key === OWN_KEYS_SYMBOL ? isOwnKeysChanged(origObj, nextObj) : isDeepChanged(origObj[key], nextObj[key], affected, cache, assumeChangedIfNotAffected !== false);
      if (c === true || c === false) changed = c;
      if (changed) break;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (changed === null) changed = !!assumeChangedIfNotAffected;

  if (cache) {
    var _cache$set2;

    cache.set(origObj, (_cache$set2 = {}, _defineProperty(_cache$set2, NEXT_OBJECT_PROPERTY, nextObj), _defineProperty(_cache$set2, CHANGED_PROPERTY, changed), _cache$set2));
  }

  return changed;
}; // explicitly track object with memo


exports.isDeepChanged = isDeepChanged;

var trackMemo = function trackMemo(obj) {
  if (isPlainObject(obj)) {
    return TRACK_MEMO_SYMBOL in obj;
  }

  return false;
}; // get original object from proxy


exports.trackMemo = trackMemo;

var getUntrackedObject = function getUntrackedObject(obj) {
  if (isPlainObject(obj)) {
    return obj[GET_ORIGINAL_SYMBOL] || null;
  }

  return null;
};

exports.getUntrackedObject = getUntrackedObject;