import { createProvider, createCustomContext } from './createProvider';
import { createUseTrackedState, createUseTracked } from './createUseTrackedState';
import { createUseUpdate } from './createUseUpdate';
import { createUseSelector } from './createUseSelector';

export const createContainer = (useValue) => {
  const context = createCustomContext();
  return {
    Provider: createProvider(context, useValue),
    useTrackedState: createUseTrackedState(context),
    useTracked: createUseTracked(context),
    useUpdate: createUseUpdate(context),
    useSelector: createUseSelector(context),
  };
};
