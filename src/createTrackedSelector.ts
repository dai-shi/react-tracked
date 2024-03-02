import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { createProxy, isChanged } from 'proxy-compare';

import { useAffectedDebugValue } from './utils';

type Affected = WeakMap<object, unknown>;

export const createTrackedSelector = <State>(
  useSelector: <Selected>(selector: (state: State) => Selected) => Selected,
) => {
  const useTrackedSelector = () => {
    const [, forceUpdate] = useReducer((c) => c + 1, 0);
    const lastStateAndAffected = useRef<readonly [State, Affected]>();
    const prevState = useRef<State>();
    const latestState = useRef<State>();
    useEffect(() => {
      lastStateAndAffected.current = [state, affected];
      if (prevState.current !== latestState.current
        && isChanged(
          prevState.current,
          latestState.current,
          affected,
          new WeakMap(),
        )) {
        prevState.current = latestState.current;
        forceUpdate();
      }
    });
    const selector = useCallback((nextState: State) => {
      latestState.current = nextState;
      if (prevState.current
        && prevState.current !== nextState
        && lastStateAndAffected.current
        && !isChanged(
          prevState.current,
          nextState,
          lastStateAndAffected.current[1],
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
    const affected = lastStateAndAffected.current?.[0] === state
      ? lastStateAndAffected.current[1]
      : new WeakMap();
    if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAffectedDebugValue(state, affected);
    }
    const proxyCache = useMemo(() => new WeakMap(), []); // per-hook proxyCache
    return createProxy(state, affected, proxyCache);
  };
  return useTrackedSelector;
};
