import { useMemo, useRef, useEffect } from 'react';
import { Context, useContextSelector } from 'use-context-selector';
import {
  createDeepProxy,
  isDeepChanged,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED,
  MODE_IGNORE_REF_EQUALITY,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP,
} from 'proxy-compare';

import { useAffectedDebugValue } from './utils';

const MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED = 0;
const MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED = (
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED | MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP
);
const MODE_MUTABLE_ROOT_STATE = MODE_IGNORE_REF_EQUALITY; // only for root
const MODE_IGNORE_ROOT_STATE_USAGE = MODE_ASSUME_UNCHANGED_IF_UNAFFECTED; // only for root

export type Opts = {
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
  const affected = new WeakMap();
  const lastAffected = useRef<WeakMap<Record<string, unknown>, unknown>>();
  useEffect(() => {
    lastAffected.current = affected;
  });
  const deepChangedMode = (
    /* eslint-disable no-nested-ternary, indent, no-multi-spaces */
      opts.unstable_ignoreIntermediateObjectUsage ? MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED
    : opts.unstable_ignoreStateEquality           ? MODE_MUTABLE_ROOT_STATE
    : opts.unstable_ignoreUntouchedState          ? MODE_IGNORE_ROOT_STATE_USAGE
    : /* default */                                 MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED
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
  }, [deepChangedMode]);
  const state = useContextSelector(StateContext, selector);
  if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAffectedDebugValue(state, affected);
  }
  const proxyCache = useMemo(() => new WeakMap(), []); // per-hook proxyCache
  return createDeepProxy(state, affected, proxyCache);
};
