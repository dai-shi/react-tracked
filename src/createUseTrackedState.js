import {
  useContext,
  useMemo,
  useRef,
  useReducer,
} from 'react';

import { useIsomorphicLayoutEffect } from './utils';
import {
  STATE_CONTEXT_PROPERTY,
  SUBSCRIBE_CONTEXT_PROPERTY,
} from './createProvider';
import { createDeepProxy, isDeepChanged } from './deepProxy';
import { createUseUpdate } from './createUseUpdate';

const STATE_PROPERTY = 's';
const AFFECTED_PROPERTY = 'a';
const CACHE_PROPERTY = 'c';
const ASSUME_CHANGED_IF_NOT_AFFECTED_PROPERTY = 'g';

export const createUseTrackedState = (context) => (opts = {}) => {
  const [, forceUpdate] = useReducer((c) => c + 1, 0);
  const {
    [STATE_CONTEXT_PROPERTY]: state,
    [SUBSCRIBE_CONTEXT_PROPERTY]: subscribe,
  } = useContext(context);
  const affected = new WeakMap();
  const lastTracked = useRef();
  useIsomorphicLayoutEffect(() => {
    lastTracked.current = {
      [STATE_PROPERTY]: state,
      [AFFECTED_PROPERTY]: affected,
      [CACHE_PROPERTY]: new WeakMap(),
      /* eslint-disable no-nested-ternary, indent */
      [ASSUME_CHANGED_IF_NOT_AFFECTED_PROPERTY]:
        opts.unstable_forceUpdateForStateChange ? true
      : opts.unstable_ignoreIntermediateObjectUsage ? false
      : /* default */ null,
      /* eslint-enable no-nested-ternary, indent */
    };
  });
  useIsomorphicLayoutEffect(() => {
    const callback = (nextState) => {
      const lastTrackedCurrent = lastTracked.current;
      if (lastTrackedCurrent[STATE_PROPERTY] === nextState
        || !isDeepChanged(
          lastTrackedCurrent[STATE_PROPERTY],
          nextState,
          lastTrackedCurrent[AFFECTED_PROPERTY],
          lastTrackedCurrent[CACHE_PROPERTY],
          lastTrackedCurrent[ASSUME_CHANGED_IF_NOT_AFFECTED_PROPERTY],
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
