import {
  FC,
  createContext as createContextOrig,
  createElement,
  useMemo,
} from 'react';
import {
  createContext,
  wrapCallbackWithPriority,
} from 'use-context-selector';

import {
  useTrackedState as useTrackedStateOrig,
  useTracked as useTrackedOrig,
} from './useTrackedState';
import { useUpdate as useUpdateOrig } from './useUpdate';
import { useSelector as useSelectorOrig } from './useSelector';

const warningObject = new Proxy({}, {
  get() { throw new Error('Please use <Provider>'); },
  apply() { throw new Error('Please use <Provider>'); },
});

export const createContainer = <State, Update extends (...args: any) => any, Props>(
  useValue: (props: Props) => readonly [State, Update],
) => {
  const StateContext = createContext(warningObject as State);
  const UpdateContext = createContextOrig(warningObject as Update);
  const Provider: FC<Props> = (props) => {
    const [state, update] = useValue(props);
    const updateValue = useMemo(() => wrapCallbackWithPriority(update), [update]);
    return createElement(UpdateContext.Provider, { value: updateValue },
      createElement(StateContext.Provider, { value: state }, props.children));
  };
  const useTrackedState = (
    opts?: Parameters<typeof useTrackedStateOrig>[1],
  ) => useTrackedStateOrig(StateContext, opts);
  const useTracked = (
    opts?: Parameters<typeof useTrackedOrig>[2],
  ) => useTrackedOrig(StateContext, UpdateContext, opts);
  const useUpdate = () => useUpdateOrig(UpdateContext);
  const useSelector = <Selected>(
    selector: (state: State) => Selected,
  ) => useSelectorOrig(StateContext, selector);
  return {
    Provider,
    useTrackedState,
    useTracked,
    useUpdate,
    useSelector,
  } as const;
};
