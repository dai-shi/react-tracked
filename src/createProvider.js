import {
  createContext,
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { batchedUpdates } from './batchedUpdates';

// -------------------------------------------------------
// context
// -------------------------------------------------------

export const STATE_CONTEXT_PROPERTY = 's';
export const VERSION_CONTEXT_PROPERTY = 'v';
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
    const [version, setVersion] = useState(0);
    const versionRef = useRef(0);
    const listeners = useRef([]);
    const updateAndNotify = useCallback((...args) => {
      batchedUpdates(() => {
        versionRef.current += 1;
        listeners.current.forEach((listener) => listener(versionRef.current));
        setVersion(versionRef.current);
        update(...args);
      });
    }, [update]);
    useEffect(() => {
      versionRef.current += 1;
      listeners.current.forEach((listener) => listener(versionRef.current, state));
      setVersion(versionRef.current);
    }, [state]);
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
          [VERSION_CONTEXT_PROPERTY]: version,
          [UPDATE_CONTEXT_PROPERTY]: updateAndNotify,
          [SUBSCRIBE_CONTEXT_PROPERTY]: subscribe,
        },
      },
      props.children,
    );
  };
  return Provider;
};
