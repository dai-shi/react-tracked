import { createElement } from 'react';

import { Provider, createCustomContext } from './Provider';
import { useTrackedState, useTracked } from './useTrackedState';
import { useDispatch } from './useDispatch';
import { useSelector } from './useSelector';

export const createContainer = (useValue) => {
  const customContext = createCustomContext();
  return {
    Provider: ({ children }) => createElement(
      Provider,
      { useValue, customContext },
      children,
    ),
    useTrackedState: () => useTrackedState({ customContext }),
    useTracked: () => useTracked({ customContext }),
    useDispatch: () => useDispatch({ customContext }),
    useSelector: (selector, equalityFn) => useSelector(selector, { equalityFn, customContext }),
  };
};
