import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { Context, useContextSelector } from 'use-context-selector';
import {
  createDeepProxy,
  isDeepChanged,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED,
  MODE_IGNORE_REF_EQUALITY,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP,
} from 'proxy-compare';

import { useAffectedDebugValue } from './utils';

const isSSR = typeof window === 'undefined'
  || /ServerSideRendering/.test(window.navigator && window.navigator.userAgent);

const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;

const MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED = 0;
const MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED = (
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED | MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP
);
const MODE_MUTABLE_ROOT_STATE = MODE_IGNORE_REF_EQUALITY; // only for root
const MODE_IGNORE_ROOT_STATE_USAGE = MODE_ASSUME_UNCHANGED_IF_UNAFFECTED; // only for root

type Opts = {
  /* eslint-disable camelcase */
  unstable_ignoreIntermediateObjectUsage?: boolean;
  unstable_ignoreStateEquality?: boolean;
  unstable_ignoreUntouchedState?: boolean;
  /* eslint-enable camelcase */
};

export const useTrackedState = <State>(
  StateContext: Context<State>,
  opts: Opts = {},
) => {
  const [, forceUpdate] = useReducer((c) => c + 1, 0);
  const deepChangedMode = (
    /* eslint-disable no-nested-ternary, indent, no-multi-spaces */
      opts.unstable_ignoreIntermediateObjectUsage ? MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED
    : opts.unstable_ignoreStateEquality           ? MODE_MUTABLE_ROOT_STATE
    : opts.unstable_ignoreUntouchedState          ? MODE_IGNORE_ROOT_STATE_USAGE
    : /* default */                                 MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED
    /* eslint-enable no-nested-ternary, indent, no-multi-spaces */
  );
  const affected = new WeakMap();
  const lastAffected = useRef<typeof affected>();
  const prevState = useRef<State>();
  const lastState = useRef<State>();
  useIsomorphicLayoutEffect(() => {
    lastAffected.current = affected;
    if (prevState.current !== lastState.current
      && isDeepChanged(
        prevState.current,
        lastState.current,
        affected,
        new WeakMap(),
        deepChangedMode,
      )) {
      prevState.current = lastState.current;
      forceUpdate();
    }
  });
  const selector = useMemo(() => {
    const deepChangedCache = new WeakMap();
    return (nextState: State) => {
      lastState.current = nextState;
      if (prevState.current
        && prevState.current !== nextState
        && lastAffected.current
        && !isDeepChanged(
          prevState.current,
          nextState,
          lastAffected.current,
          deepChangedCache,
          deepChangedMode,
        )
      ) {
        // not changed
        return prevState.current;
      }
      prevState.current = nextState;
      return nextState;
    };
  }, [deepChangedMode]);
  const state = useContextSelector(StateContext, selector);
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAffectedDebugValue(state, affected);
  }
  const proxyCache = useMemo(() => new WeakMap(), []); // per-hook proxyCache
  return createDeepProxy(state, affected, proxyCache);
};
