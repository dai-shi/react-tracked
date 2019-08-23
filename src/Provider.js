import {
  createContext,
  createElement,
  useCallback,
  useRef,
} from 'react';

// -------------------------------------------------------
// context
// -------------------------------------------------------

const warningObject = {
  get state() {
    throw new Error('Please use <Provider useValue={...}>');
  },
  get dispatch() {
    throw new Error('Please use <Provider useValue={...}>');
  },
  get subscribe() {
    throw new Error('Please use <Provider useValue={...}>');
  },
};

const calculateChangedBits = (a, b) => (
  a.dispatch !== b.dispatch || a.subscribe !== b.subscribe ? 1 : 0
);

export const createCustomContext = (
  w = warningObject,
  c = calculateChangedBits,
) => createContext(w, c);

export const defaultContext = createCustomContext();

// -------------------------------------------------------
// provider
// -------------------------------------------------------

export const createProvider = (customContext, customUseValue) => ({
  useValue,
  children,
  initialState,
}) => {
  if (customUseValue) {
    useValue = customUseValue;
  } else {
    // Although this looks like violating the hooks rule,
    // it is ok because it won't change once created.
    const useValueRef = useRef(useValue);
    if (useValueRef.current !== useValue) {
      throw new Error('useValue must be statically defined');
    }
  }
  const [state, dispatch] = useValue(initialState);
  const listeners = useRef([]);
  // we call listeners in render intentionally.
  // listeners are not technically pure, but
  // otherwise we can't get benefits from concurrent mode.
  // we make sure to work with double or more invocation of listeners.
  listeners.current.forEach(listener => listener(state));
  const subscribe = useCallback((listener) => {
    listeners.current.push(listener);
    const unsubscribe = () => {
      const index = listeners.current.indexOf(listener);
      listeners.current.splice(index, 1);
    };
    return unsubscribe;
  }, []);
  return createElement(
    customContext.Provider,
    { value: { state, dispatch, subscribe } },
    children,
  );
};

export const Provider = createProvider(defaultContext);
