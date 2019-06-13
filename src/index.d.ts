import * as React from 'react';

type CustomContext = React.Context<unknown>;

export type createCustomContext = () => CustomContext;

export type TrackedProviderProps<S, D> = {
  useValue: () => [S, D];
  customContext?: CustomContext;
};

export type TrackedProviderType<S = unknown, D = unknown>
  = React.ComponentType<TrackedProviderProps<S, D>>;

export const TrackedProvider: TrackedProviderType;

type Opts = {
  customContext?: CustomContext;
};

export const useTracked: <S, D>(opts?: Opts) => [S, D];

export const useDispatch: <D>(opts?: Opts) => D;

export const useSelector: <S, M>(
  selector: (state: S) => M,
  equalityFn?: (a: M, b: M) => boolean | Opts & { equalityFn?: (a: M, b: M) => boolean },
  opts?: Opts,
) => M;
