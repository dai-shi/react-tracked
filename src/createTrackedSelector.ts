import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { createProxy, isChanged } from 'proxy-compare';

import { useAffectedDebugValue } from './utils';

export const createTrackedSelector = <State>(
  useSelector: <Selected>(selector: (state: State) => Selected) => Selected,
) => {
  const useTrackedSelector = () => {
    const [, forceUpdate] = useReducer((c) => c + 1, 0);
    const affected = new WeakMap();
    const lastAffected = useRef<typeof affected>();
    const prevState = useRef<State>();
    const lastState = useRef<State>();
    useEffect(() => {
      lastAffected.current = affected;
      if (prevState.current !== lastState.current
        && isChanged(
          prevState.current,
          lastState.current,
          affected,
          new WeakMap(),
        )) {
        prevState.current = lastState.current;
        forceUpdate();
      }
    });
    const selector = useCallback((nextState: State) => {
      lastState.current = nextState;
      if (prevState.current
        && prevState.current !== nextState
        && lastAffected.current
        && !isChanged(
          prevState.current,
          nextState,
          lastAffected.current,
          new WeakMap(),
        )
      ) {
        // not changed
        return prevState.current;
      }
      prevState.current = nextState;
      return nextState;
    }, []);
    const state = useSelector(selector);
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAffectedDebugValue(state, affected);
    }
    const proxyCache = useMemo(() => new WeakMap(), []); // per-hook proxyCache
    return createProxy(state, affected, proxyCache);
  };
  return useTrackedSelector;
};
