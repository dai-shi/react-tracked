!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("react"),require("scheduler"),require("proxy-compare")):"function"==typeof define&&define.amd?define(["exports","react","scheduler","proxy-compare"],r):r((e=e||self).reactTracked={},e.react,e.scheduler,e.proxyCompare)}(this,function(e,r,n,t){var u="undefined"==typeof window||/ServerSideRendering/.test(window.navigator&&window.navigator.userAgent)?r.useEffect:r.useLayoutEffect,o=function(e,t){return function(o){var c=r.useRef(new Set),a=t(o),i=a[0],f=a[1],s=r.useRef(i);u(function(){s.current=i,n.unstable_runWithPriority(n.unstable_NormalPriority,function(){c.current.forEach(function(e){return e()})})});var d=r.useCallback(function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return n.unstable_runWithPriority(n.unstable_UserBlockingPriority,function(){return f.apply(void 0,r)})},[f]),l=r.useMemo(function(){var e;return r.createMutableSource(((e={}).r=s,e.l=c,e),function(){return s.current})},[]),E=r.useMemo(function(){var e;return(e={}).s=l,e.u=d,e},[l,d]);return r.createElement(e.Provider,{value:E},o.children)}},c=function(e,r){var n=e.l.current;return n.add(r),function(){return n.delete(r)}},a=function(e){return r.useContext(e).u},i=t.MODE_ASSUME_UNCHANGED_IF_UNAFFECTED|t.MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP,f=t.MODE_IGNORE_REF_EQUALITY,s=t.MODE_ASSUME_UNCHANGED_IF_UNAFFECTED,d=function(e,n){void 0===n&&(n={});var u=r.useContext(e).s,o=new WeakMap,a=n.unstable_forceUpdateForStateChange?0:n.unstable_ignoreIntermediateObjectUsage?i:n.unstable_ignoreStateEquality?f:s,d=r.useMemo(function(){var e=null,r=new WeakMap;return function(n){var u=n.r.current;return null===e||e===u||t.isDeepChanged(e,u,o,r,a)?(e=u,u):e}},[o,a]),l=r.useMutableSource(u,d,c);"production"!==process.env.NODE_ENV&&function(e,n){var t=r.useRef();r.useEffect(function(){t.current=function(e,r){var n=[];return function e(t,u){var o=r.get(t);o?o.forEach(function(r){e(t[r],u?[].concat(u,[r]):[r])}):u&&n.push(u)}(e),n}(e,n)}),r.useDebugValue(t)}(l,o);var E=r.useMemo(function(){return new WeakMap},[]);return t.createDeepProxy(l,o,E)},l=function(e,n){var t=d(e,n),u=a(e);return r.useMemo(function(){return[t,u]},[t,u])},E=function(e,n){var t=r.useContext(e).s,u=r.useCallback(function(e){return n(e.r.current)},[n]);return r.useMutableSource(t,u,c)};Object.defineProperty(e,"getUntrackedObject",{enumerable:!0,get:function(){return t.getUntrackedObject}}),Object.defineProperty(e,"trackMemo",{enumerable:!0,get:function(){return t.trackMemo}}),e.createContainer=function(e){var n=r.createContext(new Proxy({},{get:function(){throw new Error("Please use <Provider>")}}));return{Provider:o(n,e),useTrackedState:function(e){return d(n,e)},useTracked:function(e){return l(n,e)},useUpdate:function(){return a(n)},useSelector:function(e){return E(n,e)}}},e.createProvider=o,e.useSelector=E,e.useTracked=l,e.useTrackedState=d,e.useUpdate=a});
//# sourceMappingURL=index.umd.js.map
