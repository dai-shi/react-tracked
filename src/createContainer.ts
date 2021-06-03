/* eslint react/destructuring-assignment: off */

import {
  FC,
  createContext as createContextOrig,
  createElement,
  useContext as useContextOrig,
} from 'react';

import { createContext } from 'use-context-selector';
import { useTrackedState as useTrackedStateOrig } from './useTrackedState';
import { useSelector as useSelectorOrig } from './useSelector';
import { useUpdate as useUpdateOrig } from './useUpdate';

const warningObject = new Proxy({}, {
  get() { throw new Error('Please use <Provider>'); },
  apply() { throw new Error('Please use <Provider>'); },
});

type AnyFunction = (...args: any[]) => any;

export const createContainer = <State, Update extends AnyFunction, Props>(
  useValue: (props: Props) => readonly [State, Update],
  concurrentMode = false,
) => {
  const StateContext = createContext(warningObject as State);
  const UpdateContext = createContextOrig(warningObject as Update);

  const Provider: FC<Props> = (props) => {
    const [state, update] = useValue(props);
    return createElement(UpdateContext.Provider, { value: update },
      createElement(StateContext.Provider, { value: state }, props.children));
  };

  const useTrackedState = () => useTrackedStateOrig(StateContext);

  const useUpdate = concurrentMode
    ? () => useUpdateOrig(StateContext, UpdateContext)
    : () => useContextOrig(UpdateContext);

  const useTracked = () => [useTrackedState(), useUpdate()] as [
    ReturnType<typeof useTrackedState>,
    ReturnType<typeof useUpdate>,
  ];

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
