import {
  useContext,
  useRef,
  useReducer,
} from 'react';

import { useIsomorphicLayoutEffect } from './utils';
import {
  STATE_CONTEXT_PROPERTY,
  VERSION_CONTEXT_PROPERTY,
  SUBSCRIBE_CONTEXT_PROPERTY,
} from './createProvider';

const EQUALITY_FN_PROPERTY = 'e';
const SELECTOR_PROPERTY = 'r';
const STATE_PROPERTY = 's';
const SELECTED_PROPERTY = 'l';

const defaultEqualityFn = (a, b) => a === b;

export const createUseSelector = (context) => {
  const useSelector = (
    selector,
    equalityFn = defaultEqualityFn,
  ) => {
    const {
      [STATE_CONTEXT_PROPERTY]: state,
      [VERSION_CONTEXT_PROPERTY]: version,
      [SUBSCRIBE_CONTEXT_PROPERTY]: subscribe,
    } = useContext(context);
    const selected = selector(state);
    const ref = useRef();
    useIsomorphicLayoutEffect(() => {
      ref.current = {
        [EQUALITY_FN_PROPERTY]: equalityFn,
        [SELECTOR_PROPERTY]: selector,
        [STATE_PROPERTY]: state,
        [SELECTED_PROPERTY]: selected,
      };
    });
    const [, checkUpdate] = useReducer((c, v) => {
      if (version < v) {
        return c + 1; // schedule update
      }
      try {
        const refCurrent = ref.current;
        if (refCurrent[STATE_PROPERTY] === state
          || refCurrent[EQUALITY_FN_PROPERTY](
            refCurrent[SELECTED_PROPERTY],
            refCurrent[SELECTOR_PROPERTY](state),
          )) {
          // not changed
          return c; // bail out
        }
      } catch (e) {
        // ignored (stale props or some other reason)
      }
      return c + 1;
    }, 0);
    useIsomorphicLayoutEffect(() => {
      const callback = (nextVersion, nextState) => {
        try {
          const refCurrent = ref.current;
          if (nextState && (refCurrent[STATE_PROPERTY] === nextState
            || refCurrent[EQUALITY_FN_PROPERTY](
              refCurrent[SELECTED_PROPERTY],
              refCurrent[SELECTOR_PROPERTY](nextState),
            ))) {
            // not changed
            return;
          }
        } catch (e) {
          // ignored (stale props or some other reason)
        }
        checkUpdate(nextVersion);
      };
      const unsubscribe = subscribe(callback);
      return unsubscribe;
    }, [subscribe]);
    return selected;
  };
  return useSelector;
};
