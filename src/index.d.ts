import * as React from 'react';

type EqlFn<V> = (a: V, b: V) => boolean;

// container

export const createContainer: <State, Update, Props>(
  useValue: (props?: Props) => [State, Update],
) => {
  Provider: React.ComponentType<Props>;
  useTrackedState: () => State;
  useTracked: () => [State, Update];
  useUpdate: () => Update;
  useSelector: <V>(selector: (state: State) => V, equalityFn?: EqlFn<V>) => V;
};

// deep proxy utils

/**
 * If `obj` is a proxy, it will mark the entire object as used.
 * Otherwise, it does nothing.
 */
export const trackMemo: (obj: unknown) => void;

/**
 * If `obj` is a proxy, it will return the original object.
 * Otherwise, it will return the same value.
 *
 * Note:
 * One can test with `x !== getUntrackedObject(x)` to see if `x` is a proxy.
 */
export const getUntrackedObject: <T>(obj: T) => T;
