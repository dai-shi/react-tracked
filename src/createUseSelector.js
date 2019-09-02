import {
  useContext,
  useRef,
} from 'react';

import { useIsomorphicLayoutEffect, useForceUpdate } from './utils';

const defaultEqualityFn = (a, b) => a === b;

export const createUseSelector = context => (
  selector,
  equalityFn = defaultEqualityFn,
) => {
  const forceUpdate = useForceUpdate();
  const { state, subscribe } = useContext(context);
  const selected = selector(state);
  const ref = useRef(null);
  useIsomorphicLayoutEffect(() => {
    ref.current = {
      equalityFn,
      selector,
      state,
      selected,
    };
  });
  useIsomorphicLayoutEffect(() => {
    const callback = (nextState) => {
      try {
        if (ref.current.state === nextState
          || ref.current.equalityFn(ref.current.selected, ref.current.selector(nextState))) {
          // not changed
          return;
        }
      } catch (e) {
        // ignored (stale props or some other reason)
      }
      forceUpdate();
    };
    const unsubscribe = subscribe(callback);
    return unsubscribe;
  }, [subscribe, forceUpdate]);
  return selected;
};
