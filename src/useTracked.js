import {
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { defaultContext } from './TrackedProvider';

import { useIsomorphicLayoutEffect, useForceUpdate } from './utils';

import { createDeepProxy, isDeepChanged } from './deepProxy';

export const useTracked = (opts = {}) => {
  const {
    customContext = defaultContext,
  } = opts;
  const forceUpdate = useForceUpdate();
  const { state, dispatch, subscribe } = useContext(customContext);
  const affected = new WeakMap();
  const lastTracked = useRef(null);
  useIsomorphicLayoutEffect(() => {
    lastTracked.current = {
      state,
      affected,
      cache: new WeakMap(),
      /* eslint-disable no-nested-ternary, indent, @typescript-eslint/indent */
      assumeChangedIfNotAffected:
        opts.unstable_forceUpdateForStateChange ? true
      : opts.unstable_ignoreIntermediateObjectUsage ? false
      : /* default */ null,
      /* eslint-enable no-nested-ternary, indent, @typescript-eslint/indent */
    };
  });
  useEffect(() => {
    const callback = (nextState) => {
      const changed = isDeepChanged(
        lastTracked.current.state,
        nextState,
        lastTracked.current.affected,
        lastTracked.current.cache,
        lastTracked.current.assumeChangedIfNotAffected,
      );
      if (changed) {
        lastTracked.current.state = nextState;
        forceUpdate();
      }
    };
    // run once in case the state is already changed
    callback();
    const unsubscribe = subscribe(callback);
    return unsubscribe;
  }, [forceUpdate, subscribe]);
  const proxyCache = useRef(new WeakMap()); // per-hook proxyCache
  const proxied = createDeepProxy(state, affected, proxyCache.current);
  return useMemo(() => [proxied, dispatch], [proxied, dispatch]);
};
