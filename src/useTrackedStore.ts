import { useCallback, useMemo } from 'react';
import { createProxy, isChanged } from 'proxy-compare';
import type { ExtractState, StoreApi } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { useAffectedDebugValue } from './utils.js';

const condUseAffectedDebugValue = useAffectedDebugValue;

const hasGlobalProcess = typeof process === 'object';

type ReadonlyStoreApi<T> = Pick<
  StoreApi<T>,
  'getState' | 'getInitialState' | 'subscribe'
>;

const identity = <T>(arg: T): T => arg;

export function useTrackedStore<S extends ReadonlyStoreApi<unknown>>(
  api: S,
): ExtractState<S>;

export function useTrackedStore<S extends ReadonlyStoreApi<unknown>, U>(
  api: S,
  selector: (state: ExtractState<S>) => U,
): U;

export function useTrackedStore<TState, StateSlice>(
  api: ReadonlyStoreApi<TState>,
  selector: (state: TState) => StateSlice = identity as never,
) {
  const affected = useMemo(() => new WeakMap(), []);
  const isTrackedEqual = useCallback(
    (prev: StateSlice, next: StateSlice): boolean =>
      !isChanged(prev, next, affected, new WeakMap()),
    [affected],
  );
  const state = useStoreWithEqualityFn(api, selector, isTrackedEqual);
  if (hasGlobalProcess && process.env.NODE_ENV !== 'production') {
    condUseAffectedDebugValue(state, affected);
  }
  const proxyCache = useMemo(() => new WeakMap(), []);
  return createProxy(state, affected, proxyCache);
}
