import {
  useContext,
  useEffect,
  useRef,
} from 'react';

import { defaultContext } from './Provider';

import { useIsomorphicLayoutEffect, useForceUpdate } from './utils';

const defaultEqualityFn = (a, b) => a === b;

export const createUseSelector = customContext => (
  selector,
  equalityFn = defaultEqualityFn,
) => {
  const forceUpdate = useForceUpdate();
  const { state, subscribe } = useContext(customContext);
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
  useEffect(() => {
    const callback = (nextState) => {
      if (ref.current.state === nextState) return;
      let changed;
      try {
        changed = !ref.current.equalityFn(ref.current.selected, ref.current.selector(nextState));
      } catch (e) {
        changed = true; // stale props or some other reason
      }
      if (changed) {
        ref.current.state = nextState;
        forceUpdate();
      }
    };
    const unsubscribe = subscribe(callback);
    // force update in case the state is already changed
    forceUpdate();
    return unsubscribe;
  }, [subscribe, forceUpdate]);
  return selected;
};

export const useSelector = createUseSelector(defaultContext);
