/* eslint react/destructuring-assignment: off */

import {
  FC,
  createContext as createContextOrig,
  createElement,
  useCallback,
  useContext as useContextOrig,
  useDebugValue,
} from 'react';

import {
  Context,
  createContext,
  useContextSelector,
  useContextUpdate,
} from 'use-context-selector';

import { createTrackedSelector } from './createTrackedSelector';

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

  const useSelector = <Selected>(
    selector: (state: State) => Selected,
  ) => {
    const selected = useContextSelector(StateContext, selector);
    useDebugValue(selected);
    return selected;
  };

  const useTrackedState = createTrackedSelector(useSelector);

  const useUpdate = concurrentMode
    ? () => {
      const contextUpdate = useContextUpdate(StateContext as Context<unknown>);
      const update = useContextOrig(UpdateContext);
      return useCallback((...args: Parameters<Update>) => {
        let result: ReturnType<Update> | undefined;
        contextUpdate(() => {
          result = update(...args);
        });
        return result as ReturnType<Update>;
      }, [contextUpdate, update]);
    }
    // not concurrentMode
    : () => useContextOrig(UpdateContext);

  const useTracked = () => [useTrackedState(), useUpdate()] as [
    ReturnType<typeof useTrackedState>,
    ReturnType<typeof useUpdate>,
  ];

  return {
    Provider,
    useTrackedState,
    useTracked,
    useUpdate,
    useSelector,
  } as const;
};
