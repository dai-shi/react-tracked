import * as React from 'react';

type EqlFn<V> = (a: V, b: V) => boolean;

// container

export type ContainerProviderType<S = unknown, D = unknown> = React.ComponentType<{
  initialState: S;
}>;

export const createContainer: <S, D>(useValue: (state: S) => [S, D]) => {
  Provider: ContainerProviderType;
  useTrackedState: () => S;
  useTracked: () => [S, D];
  useDispatch: () => D;
  useSelector: <V>(selector: (state: S) => V, equalityFn?: EqlFn<V>) => V;
};

// default context

// `S = unknown | any` because `App.tsx` does not compile
export type ProviderType<S = unknown | any, D = unknown> = React.ComponentType<{
  useValue: (state: S) => [S, D];
  initialState: S;
}>;

export const Provider: ProviderType;
export const useTrackedState: <S>() => S;
export const useTracked: <S, D>() => [S, D];
export const useDispatch: <D>() => D;
export const useSelector: <S, V>(selector: (state: S) => V, equalityFn?: EqlFn<V>) => V;
