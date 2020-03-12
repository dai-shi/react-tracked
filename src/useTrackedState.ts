/* eslint-disable @typescript-eslint/ban-ts-ignore */

import {
  Context,
  MutableRefObject,
  useCallback,
  useContext,
  useMemo,
  // @ts-ignore
  useMutableSource,
  useRef,
} from 'react';
import {
  createDeepProxy,
  isDeepChanged,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED,
  MODE_IGNORE_REF_EQUALITY,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP,
} from 'proxy-compare';

import { useIsomorphicLayoutEffect, useAffectedDebugValue } from './utils';
import {
  ContextValue,
  MUTABLE_SOURCE_CONTEXT_PROPERTY,
  STATEREF_SOURCE_PROPERTY,
  subscribe,
} from './createProvider';
import { useUpdate } from './useUpdate';

const MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED = 0;
const MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED = (
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED | MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP
);
const MODE_MUTABLE_ROOT_STATE = MODE_IGNORE_REF_EQUALITY; // only for root
const MODE_DEFAULT = MODE_ASSUME_UNCHANGED_IF_UNAFFECTED; // only for root

const STATE_PROPERTY = 's';
const AFFECTED_PROPERTY = 'a';
const CACHE_PROPERTY = 'c';
const DEEP_PROXY_MODE_PROPERTY = 'd';

type Opts = any; // TODO types

export const useTrackedState = <State, Update>(
  CustomContext: Context<ContextValue<State, Update>>,
  opts: Opts = {},
) => {
  const {
    [MUTABLE_SOURCE_CONTEXT_PROPERTY]: mutableSource,
  } = useContext(CustomContext);
  const affected = new WeakMap();
  const lastTracked = useRef<any>(); // TODO types
  const getSnapshot = useCallback(
    (source: {
      [STATEREF_SOURCE_PROPERTY]: MutableRefObject<State>;
    }) => {
      const nextState = source[STATEREF_SOURCE_PROPERTY].current;
      const lastTrackedCurrent = lastTracked.current;
      if (!lastTrackedCurrent) return nextState;
      if (lastTrackedCurrent[AFFECTED_PROPERTY] !== affected) return nextState;
      if (lastTrackedCurrent[STATE_PROPERTY] === nextState) return nextState;
      if (isDeepChanged(
        lastTrackedCurrent[STATE_PROPERTY],
        nextState,
        lastTrackedCurrent[AFFECTED_PROPERTY],
        lastTrackedCurrent[CACHE_PROPERTY],
        lastTrackedCurrent[DEEP_PROXY_MODE_PROPERTY],
      )) return nextState;
      // not changed
      return lastTrackedCurrent[STATE_PROPERTY];
    },
    [affected],
  );
  const state: State = useMutableSource(mutableSource, getSnapshot, subscribe);
  useIsomorphicLayoutEffect(() => {
    lastTracked.current = {
      [STATE_PROPERTY]: state,
      [AFFECTED_PROPERTY]: affected,
      [CACHE_PROPERTY]: new WeakMap(),
      /* eslint-disable no-nested-ternary, indent */
      [DEEP_PROXY_MODE_PROPERTY]:
      opts.unstable_forceUpdateForStateChange ? MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED
      : opts.unstable_ignoreIntermediateObjectUsage ? MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED
      : opts.unstable_ignoreStateEquality ? MODE_MUTABLE_ROOT_STATE
      : /* default */ MODE_DEFAULT,
      /* eslint-enable no-nested-ternary, indent */
    };
  });
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAffectedDebugValue(state, affected);
  }
  const proxyCache = useRef(new WeakMap()); // per-hook proxyCache
  return createDeepProxy(state, affected, proxyCache.current);
};

export const useTracked = <State, Update>(
  CustomContext: Context<ContextValue<State, Update>>,
  opts?: Opts,
) => {
  const state = useTrackedState(CustomContext, opts);
  const update = useUpdate(CustomContext);
  return useMemo(() => [state, update], [state, update]) as [State, Update];
};
