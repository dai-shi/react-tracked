import {
  useContext,
  useMemo,
  useRef,
  useReducer,
} from 'react';

import { useIsomorphicLayoutEffect } from './utils';
import { createDeepProxy, isDeepChanged } from './deepProxy';
import { createUseUpdate } from './createUseUpdate';

export const createUseTrackedState = context => (opts = {}) => {
  const [, forceUpdate] = useReducer(c => c + 1, 0);
  const { state, subscribe } = useContext(context);
  const affected = new WeakMap();
  const lastTracked = useRef(null);
  useIsomorphicLayoutEffect(() => {
    lastTracked.current = {
      state,
      affected,
      cache: new WeakMap(),
      /* eslint-disable no-nested-ternary, indent */
      assumeChangedIfNotAffected:
        opts.unstable_forceUpdateForStateChange ? true
      : opts.unstable_ignoreIntermediateObjectUsage ? false
      : /* default */ null,
      /* eslint-enable no-nested-ternary, indent */
    };
  });
  useIsomorphicLayoutEffect(() => {
    const callback = (nextState) => {
      if (lastTracked.current.state === nextState
        || !isDeepChanged(
          lastTracked.current.state,
          nextState,
          lastTracked.current.affected,
          lastTracked.current.cache,
          lastTracked.current.assumeChangedIfNotAffected,
        )) {
        // not changed
        return;
      }
      forceUpdate();
    };
    const unsubscribe = subscribe(callback);
    return unsubscribe;
  }, [subscribe]);
  const proxyCache = useRef(new WeakMap()); // per-hook proxyCache
  return createDeepProxy(state, affected, proxyCache.current);
};

export const createUseTracked = (context) => {
  const useTrackedState = createUseTrackedState(context);
  const useUpdate = createUseUpdate(context);
  return (opts) => {
    const state = useTrackedState(opts);
    const update = useUpdate();
    return useMemo(() => [state, update], [state, update]);
  };
};
