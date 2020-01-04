import {
  createContext,
  createElement,
  useCallback,
  useRef,
} from 'react';

// -------------------------------------------------------
// context
// -------------------------------------------------------

export const STATE_CONTEXT_PROPERTY = 's';
export const UPDATE_CONTEXT_PROPERTY = 'u';
export const SUBSCRIBE_CONTEXT_PROPERTY = 'b';

const WARNING_MESSAGE = 'Please use <Provider>';
const warningObject = {
  get s/* [STATE_CONTEXT_PROPERTY] */() {
    throw new Error(WARNING_MESSAGE);
  },
  get u/* [UPDATE_CONTEXT_PROPERTY] */() {
    throw new Error(WARNING_MESSAGE);
  },
};

const calculateChangedBits = (a, b) => (
  (
    a[UPDATE_CONTEXT_PROPERTY] !== b[UPDATE_CONTEXT_PROPERTY]
    || a[SUBSCRIBE_CONTEXT_PROPERTY] !== b[SUBSCRIBE_CONTEXT_PROPERTY]
  ) ? 1 : 0
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
  listeners.current.forEach((listener) => listener(state));
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
    {
      value: {
        [STATE_CONTEXT_PROPERTY]: state,
        [UPDATE_CONTEXT_PROPERTY]: update,
        [SUBSCRIBE_CONTEXT_PROPERTY]: subscribe,
      },
    },
    props.children,
  );
};
