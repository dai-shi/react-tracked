import {
  useContext,
  useEffect,
  useRef,
} from 'react';

import { defaultContext } from './TrackedProvider';

import { useIsomorphicLayoutEffect, useForceUpdate } from './utils';

const isFunction = f => typeof f === 'function';
const defaultEqualityFn = (a, b) => a === b;

export const useSelector = (selector, eqlFn, opts) => {
  const {
    equalityFn = isFunction(eqlFn) ? eqlFn : defaultEqualityFn,
    customContext = defaultContext,
  } = opts || (!isFunction(eqlFn) && eqlFn) || {};
  const forceUpdate = useForceUpdate();
  const { state, subscribe } = useContext(customContext);
  const selected = selector(state);
  const last = useRef(null);
  useIsomorphicLayoutEffect(() => {
    last.current = {
      selector,
      state,
      selected,
    };
  });
  useEffect(() => {
    const callback = (nextState) => {
      if (last.current.state === nextState) return;
      let changed;
      try {
        changed = !equalityFn(last.current.selected, last.current.selector(nextState));
      } catch (e) {
        changed = true; // stale props or some other reason
      }
      if (changed) {
        last.current.state = nextState;
        forceUpdate();
      }
    };
    // run once in case the state is already changed
    callback();
    const unsubscribe = subscribe(callback);
    return unsubscribe;
  }, [forceUpdate, subscribe, equalityFn]);
  return selected;
};
