import {
  createContext,
} from 'react';

import { ContextValue, createProvider } from './createProvider';
import {
  useTrackedState as useTrackedStateOrig,
  useTracked as useTrackedOrig,
} from './useTrackedState';
import { useUpdate as useUpdateOrig } from './useUpdate';
import { useSelector as useSelectorOrig } from './useSelector';

export const createContainer = <State, Update extends (...args: any) => any, Props>(
  useValue: (props: Props) => readonly [State, Update],
) => {
  const context = createContext(new Proxy({}, {
    get() { throw new Error('Please use <Provider>'); },
  }) as ContextValue<State, Update>);
  const Provider = createProvider(context, useValue);
  const useTrackedState = (
    opts?: Parameters<typeof useTrackedStateOrig>[1],
  ) => useTrackedStateOrig(context, opts);
  const useTracked = (
    opts?: Parameters<typeof useTrackedOrig>[1],
  ) => useTrackedOrig(context, opts);
  const useUpdate = () => useUpdateOrig(context);
  const useSelector = <Selected>(
    selector: (state: State) => Selected,
  ) => useSelectorOrig(context, selector);
  return {
    Provider,
    useTrackedState,
    useTracked,
    useUpdate,
    useSelector,
  } as const;
};
