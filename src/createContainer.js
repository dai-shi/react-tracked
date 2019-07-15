import { createProvider, createCustomContext } from './Provider';
import { createUseTrackedState, createUseTracked } from './useTrackedState';
import { createUseDispatch } from './useDispatch';
import { createUseSelector } from './useSelector';

export const createContainer = (useValue) => {
  const customContext = createCustomContext();
  return {
    Provider: createProvider(customContext, useValue),
    useTrackedState: createUseTrackedState(customContext),
    useTracked: createUseTracked(customContext),
    useDispatch: createUseDispatch(customContext),
    useSelector: createUseSelector(customContext),
  };
};
