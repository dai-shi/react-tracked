import {
  createContext,
  createElement,
  useCallback,
  useRef,
} from 'react';

import { useIsomorphicLayoutEffect } from './utils';

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

export const createProvider = (context, useValue) => {
  const Provider = (props) => {
    const [state, update] = useValue(props);
    const listeners = useRef([]);
    if (process.env.NODE_ENV !== 'production') {
      // we use layout effect to eliminate warnings.
      // but, this leads tearing with startTransition.
      // https://github.com/dai-shi/use-context-selector/pull/13
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useIsomorphicLayoutEffect(() => {
        listeners.current.forEach((listener) => listener(state));
      });
    } else {
      // we call listeners in render for optimization.
      // although this is not a recommended pattern,
      // so far this is only the way to make it as expected.
      // we are looking for better solutions.
      // https://github.com/dai-shi/use-context-selector/pull/12
      listeners.current.forEach((listener) => listener(state));
    }
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
  return Provider;
};
