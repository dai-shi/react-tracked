import { createElement } from 'react';

import { TrackedProvider, createCustomContext } from './TrackedProvider';
import { useTrackedState, useTracked } from './useTracked';
import { useDispatch } from './useDispatch';
import { useSelector } from './useSelector';

export const createContainer = (useValue) => {
  const customContext = createCustomContext();
  return {
    TrackedProvider: ({ children }) => createElement(
      TrackedProvider,
      { useValue, customContext },
      children,
    ),
    useTrackedState: () => useTrackedState({ customContext }),
    useTracked: () => useTracked({ customContext }),
    useDispatch: () => useDispatch({ customContext }),
    useSelector: (selector, equalityFn) => useSelector(selector, { equalityFn, customContext }),
  };
};
