"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDeepChanged = exports.createDeepProxy = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// -------------------------------------------------------
// deep proxy
// -------------------------------------------------------
var OWN_KEYS_SYMBOL = Symbol('OWN_KEYS'); // check if obj is a plain object or an array

var isPlainObject = function isPlainObject(obj) {
  try {
    var proto = Object.getPrototypeOf(obj);
    return proto === Object.prototype || proto === Array.prototype;
  } catch (e) {
    return false;
  }
}; // copy obj if frozen


var unfreeze = function unfreeze(obj) {
  if (!Object.isFrozen(obj)) return obj;

  if (Array.isArray(obj)) {
    return Array.from(obj);
  }

  return Object.assign({}, obj);
};

var createProxyHandler = function createProxyHandler() {
  return {
    recordUsage: function recordUsage(key) {
      var used = this.affected.get(this.originalObj);

      if (!used) {
        used = new Set();
        this.affected.set(this.originalObj, used);
      }

      used.add(key);
    },
    get: function get(target, key) {
      this.recordUsage(key); // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define

      return createDeepProxy(target[key], this.affected, this.proxyCache);
    },
    has: function has(target, key) {
      // LIMITATION:
      // We simply record the same as get.
      // This means { a: {} } and { a: {} } is detected as changed,
      // if 'a' in obj is handled.
      this.recordUsage(key);
      return key in target;
    },
    ownKeys: function ownKeys(target) {
      this.recordUsage(OWN_KEYS_SYMBOL);
      return Reflect.ownKeys(target);
    }
  };
};

var createDeepProxy = function createDeepProxy(obj, affected, proxyCache) {
  if (!isPlainObject(obj)) return obj;
  var proxyHandler = proxyCache && proxyCache.get(obj);

  if (!proxyHandler) {
    proxyHandler = createProxyHandler();
    proxyHandler.proxy = new Proxy(unfreeze(obj), proxyHandler);
    proxyHandler.originalObj = obj;

    if (proxyCache) {
      proxyCache.set(obj, proxyHandler);
    }
  }

  proxyHandler.affected = affected;
  proxyHandler.proxyCache = proxyCache;
  return proxyHandler.proxy;
};

exports.createDeepProxy = createDeepProxy;

var isOwnKeysChanged = function isOwnKeysChanged(origObj, nextObj) {
  var origKeys = Reflect.ownKeys(origObj);
  var nextKeys = Reflect.ownKeys(nextObj);
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

    if (hit && hit.nextObj === nextObj) {
      return hit.changed;
    } // for object with cycles (changed is `undefined`)


    cache.set(origObj, {
      nextObj: nextObj
    });
  }

  var changed = null; // eslint-disable-next-line no-restricted-syntax

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = used[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;
      var c = key === OWN_KEYS_SYMBOL ? isOwnKeysChanged(origObj, nextObj) : isDeepChanged(origObj[key], nextObj[key], affected, cache, assumeChangedIfNotAffected !== false);
      if (typeof c === 'boolean') changed = c;
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
    cache.set(origObj, {
      nextObj: nextObj,
      changed: changed
    });
  }

  return changed;
};

exports.isDeepChanged = isDeepChanged;