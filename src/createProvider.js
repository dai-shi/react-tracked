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
    throw new Error('Please use <Provider>');
  },
  get dispatch() {
    throw new Error('Please use <Provider>');
  },
  get subscribe() {
    throw new Error('Please use <Provider>');
  },
};

const calculateChangedBits = (a, b) => (
  a.update !== b.update || a.subscribe !== b.subscribe ? 1 : 0
);

export const createCustomContext = (
  w = warningObject,
  c = calculateChangedBits,
) => createContext(w, c);

// -------------------------------------------------------
// provider
// -------------------------------------------------------

export const createProvider = (context, useValue) => (props) => {
  const [state, update] = useValue(props);
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
    context.Provider,
    { value: { state, update, subscribe } },
    props.children,
  );
};
