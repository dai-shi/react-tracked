import * as React from 'react';

export type TrackedProviderProps<S, D> = {
  useValue: () => [S, D];
};

export type TrackedProviderType<S = unknown, D = unknown>
  = React.ComponentType<TrackedProviderProps<S, D>>;

export const TrackedProvider: TrackedProviderType;

export const useTracked: <S, D>() => [S, D];

export const useDispatch: <D>() => D;

export const useSelector: <S, M>(
  selector: (state: S) => M,
  equalityFn?: (a: unknown, b: unknown) => boolean,
) => M;
