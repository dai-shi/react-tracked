import {
  useContext,
  useRef,
  useReducer,
} from 'react';

import { useIsomorphicLayoutEffect } from './utils';
import {
  STATE_CONTEXT_PROPERTY,
  SUBSCRIBE_CONTEXT_PROPERTY,
} from './createProvider';

const EQUALITY_FN_PROPERTY = 'e';
const SELECTOR_PROPERTY = 'r';
const STATE_PROPERTY = 's';
const SELECTED_PROPERTY = 'l';

const defaultEqualityFn = (a, b) => a === b;

export const createUseSelector = (context) => (
  selector,
  equalityFn = defaultEqualityFn,
) => {
  const [, forceUpdate] = useReducer((c) => c + 1, 0);
  const {
    [STATE_CONTEXT_PROPERTY]: state,
    [SUBSCRIBE_CONTEXT_PROPERTY]: subscribe,
  } = useContext(context);
  const selected = selector(state);
  const ref = useRef(null);
  useIsomorphicLayoutEffect(() => {
    ref.current = {
      [EQUALITY_FN_PROPERTY]: equalityFn,
      [SELECTOR_PROPERTY]: selector,
      [STATE_PROPERTY]: state,
      [SELECTED_PROPERTY]: selected,
    };
  });
  useIsomorphicLayoutEffect(() => {
    const callback = (nextState) => {
      try {
        const refCurrent = ref.current;
        if (refCurrent[STATE_PROPERTY] === nextState
          || refCurrent[EQUALITY_FN_PROPERTY](
            refCurrent[SELECTED_PROPERTY],
            refCurrent[SELECTOR_PROPERTY](nextState),
          )) {
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
  }, [subscribe]);
  return selected;
};
