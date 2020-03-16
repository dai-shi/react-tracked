/* eslint-disable @typescript-eslint/ban-ts-ignore */

import {
  Context,
  MutableRefObject,
  useContext,
  useMemo,
  // @ts-ignore
  useMutableSource,
} from 'react';
import {
  createDeepProxy,
  isDeepChanged,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED,
  MODE_IGNORE_REF_EQUALITY,
  MODE_ASSUME_UNCHANGED_IF_UNAFFECTED_IN_DEEP,
} from 'proxy-compare';

import { useAffectedDebugValue } from './utils';
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

type Opts = any; // TODO types

export const useTrackedState = <State, Update>(
  CustomContext: Context<ContextValue<State, Update>>,
  opts: Opts = {},
) => {
  const {
    [MUTABLE_SOURCE_CONTEXT_PROPERTY]: mutableSource,
  } = useContext(CustomContext);
  const affected = new WeakMap();
  const deepChangedMode = (
    /* eslint-disable no-nested-ternary, indent, no-multi-spaces */
      opts.unstable_forceUpdateForStateChange     ? MODE_ALWAYS_ASSUME_CHANGED_IF_UNAFFECTED
    : opts.unstable_ignoreIntermediateObjectUsage ? MODE_ALWAYS_ASSUME_UNCHANGED_IF_UNAFFECTED
    : opts.unstable_ignoreStateEquality           ? MODE_MUTABLE_ROOT_STATE
    : /* default */                                 MODE_DEFAULT
    /* eslint-enable no-nested-ternary, indent, no-multi-spaces */
  );
  const getSnapshot = useMemo(() => {
    let prevState: State | null = null;
    const deepChangedCache = new WeakMap();
    return (source: {
      [STATEREF_SOURCE_PROPERTY]: MutableRefObject<State>;
    }) => {
      const nextState = source[STATEREF_SOURCE_PROPERTY].current;
      if (prevState !== null && prevState !== nextState && !isDeepChanged(
        prevState,
        nextState,
        affected,
        deepChangedCache,
        deepChangedMode,
      )) {
        // not changed
        return prevState;
      }
      prevState = nextState;
      return nextState;
    };
  }, [affected, deepChangedMode]);
  const state: State = useMutableSource(mutableSource, getSnapshot, subscribe);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAffectedDebugValue(state, affected);
  }
  const proxyCache = useMemo(() => new WeakMap(), []); // per-hook proxyCache
  return createDeepProxy(state, affected, proxyCache);
};

export const useTracked = <State, Update>(
  CustomContext: Context<ContextValue<State, Update>>,
  opts?: Opts,
) => {
  const state = useTrackedState(CustomContext, opts);
  const update = useUpdate(CustomContext);
  return useMemo(() => [state, update], [state, update]) as [State, Update];
};
