import * as React from 'react';

type EqlFn<V> = (a: V, b: V) => boolean;

// container

export const createContainer: <S, D>(useValue: () => [S, D]) => {
  Provider: React.ComponentType;
  useTrackedState: () => S;
  useTracked: () => [S, D];
  useDispatch: () => D;
  useSelector: <V>(selector: (state: S) => V, equalityFn?: EqlFn<V>) => V;
};

// default context

export type ProviderType<S = unknown, D = unknown> = React.ComponentType<{
  useValue: () => [S, D];
}>;

export const Provider: ProviderType;
export const useTrackedState: <S>() => S;
export const useTracked: <S, D>() => [S, D];
export const useDispatch: <D>() => D;
export const useSelector: <S, V>(selector: (state: S) => V, equalityFn?: EqlFn<V>) => V;
