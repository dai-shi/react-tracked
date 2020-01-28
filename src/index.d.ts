import { ComponentType } from 'react';

type EqlFn<V> = (a: V, b: V) => boolean;

// container

export const createContainer: <State, Update, Props>(
  useValue: (props?: Props) => readonly [State, Update],
) => {
  Provider: ComponentType<Props>;
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
 * Otherwise, it will return null.
 */
export const getUntrackedObject: <T>(obj: T) => T | null;
