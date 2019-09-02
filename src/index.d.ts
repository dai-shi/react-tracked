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
