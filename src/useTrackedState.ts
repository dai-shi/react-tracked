import {
  Context as ContextOrig,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  Context,
  useContextSelector,
} from 'use-context-selector';
import {
  createDeepProxy,
  isDeepChanged,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED,
  MODE_IGNORE_REF_EQUALITY,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP,
} from 'proxy-compare';

import { useAffectedDebugValue } from './utils';
import { useUpdate } from './useUpdate';

const MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED = 0;
const MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED = (
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED | MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP
);
const MODE_MUTABLE_ROOT_STATE = MODE_IGNORE_REF_EQUALITY; // only for root
const MODE_DEFAULT = MODE_ASSUME_UNCHANGED_IF_UNAFFECTED; // only for root

type Opts = {
  /* eslint-disable camelcase */
  unstable_forceUpdateForStateChange?: boolean;
  unstable_ignoreIntermediateObjectUsage?: boolean;
  unstable_ignoreStateEquality?: boolean;
  /* eslint-enable camelcase */
};

export const useTrackedState = <State>(
  StateContext: Context<State>,
  opts: Opts = {},
) => {
  const affected = new WeakMap();
  const lastAffected = useRef<WeakMap<Record<string, unknown>, unknown>>();
  useEffect(() => {
    lastAffected.current = affected;
  });
  const deepChangedMode = (
    /* eslint-disable no-nested-ternary, indent, no-multi-spaces */
      opts.unstable_forceUpdateForStateChange     ? MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED
    : opts.unstable_ignoreIntermediateObjectUsage ? MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED
    : opts.unstable_ignoreStateEquality           ? MODE_MUTABLE_ROOT_STATE
    : /* default */                                 MODE_DEFAULT
    /* eslint-enable no-nested-ternary, indent, no-multi-spaces */
  );
  const selector = useMemo(() => {
    let prevState: State | null = null;
    const deepChangedCache = new WeakMap();
    return (nextState: State) => {
      if (prevState !== null
        && prevState !== nextState
        && lastAffected.current
        && !isDeepChanged(
          prevState,
          nextState,
          lastAffected.current,
          deepChangedCache,
          deepChangedMode,
        )
      ) {
        // not changed
        return prevState;
      }
      prevState = nextState;
      return nextState;
    };
  }, [deepChangedMode]); // eslint-disable-line react-hooks/exhaustive-deps
  const state = useContextSelector(StateContext, selector);
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAffectedDebugValue(state, affected);
  }
  const proxyCache = useMemo(() => new WeakMap(), []); // per-hook proxyCache
  return createDeepProxy(state, affected, proxyCache);
};

export const useTracked = <State, Update extends (...args: any[]) => any>(
  StateContext: Context<State>,
  UpdateContext: ContextOrig<Update>,
  opts?: Opts,
) => {
  const state = useTrackedState(StateContext, opts);
  const update = useUpdate(StateContext, UpdateContext);
  return useMemo(() => [state, update], [state, update]) as [State, Update];
};
