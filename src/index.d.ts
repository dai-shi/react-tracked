import { FC } from 'react';

type EqlFn<V> = (a: V, b: V) => boolean;

// container

export const createContainer: <State, Update, Props>(
  useValue: (props: Props) => readonly [State, Update],
) => {
  Provider: FC<Props>;
  useTrackedState: () => State;
  useTracked: () => [State, Update];
  useUpdate: () => Update;
  useSelector: <V>(selector: (state: State) => V, equalityFn?: EqlFn<V>) => V;
};

// deep proxy utils

/**
 * If `obj` is a proxy, it will return the original object.
 * Otherwise, it will return null.
 */
export const getUntrackedObject: <T>(obj: T) => T | null;

// special React.memo with tracking suppoort

export function memo<Props>(
  Component: FC<Props>,
  areEqual?: (prevProps: Props, nextProps: Props) => boolean,
): FC<Props>;
