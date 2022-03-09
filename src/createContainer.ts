/* eslint react/destructuring-assignment: off */

import {
  Context as ContextOrig,
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
  useContext,
  useContextSelector,
  useContextUpdate,
} from 'use-context-selector';

import { createTrackedSelector } from './createTrackedSelector';

type AnyFunction = (...args: any[]) => any;
type Options = {
  stateContextName?: string;
  updateContextName?: string;
  concurrentMode?: boolean;
}
/**
 * [Deprecated] Please use object option
 */
type DeprecatedOption = boolean

export const createContainer = <State, Update extends AnyFunction, Props>(
  useValue: (props: Props) => readonly [State, Update],
  options?: Options | DeprecatedOption,
) => {
  if (typeof options === 'boolean') {
    // eslint-disable-next-line no-console
    console.warn('boolean option is deprecated, please specify { concurrentMode: true }');
    options = { concurrentMode: options };
  }
  const {
    stateContextName = 'StateContainer',
    updateContextName = 'UpdateContainer',
    concurrentMode,
  } = options || {};
  const StateContext = createContext<State | null>(null);
  const UpdateContext = createContextOrig<Update | null>(null);
  StateContext.displayName = stateContextName;
  UpdateContext.displayName = updateContextName;

  const Provider: FC<Props> = (props) => {
    const [state, update] = useValue(props);
    return createElement(
      UpdateContext.Provider,
      { value: update },
      createElement(StateContext.Provider, { value: state }, props.children),
    );
  };

  const useSelector = <Selected>(
    selector: (state: State) => Selected,
  ) => {
    if (
      typeof process === 'object'
      && process.env.NODE_ENV !== 'production'
      // eslint-disable-next-line react-hooks/rules-of-hooks
      && useContext(StateContext) === null
    ) {
      throw new Error('Please use <Provider>');
    }
    const selected = useContextSelector(StateContext as Context<State>, selector);
    useDebugValue(selected);
    return selected;
  };

  const useTrackedState = createTrackedSelector(useSelector);

  const useUpdate = concurrentMode
    ? () => {
      if (
        typeof process === 'object'
        && process.env.NODE_ENV !== 'production'
        && (
          useContext(StateContext) === null
          || useContextOrig(UpdateContext) === null
        )
      ) {
        throw new Error('Please use <Provider>');
      }
      const contextUpdate = useContextUpdate(StateContext as Context<unknown>);
      const update = useContextOrig(UpdateContext as ContextOrig<Update>);
      return useCallback((...args: Parameters<Update>) => {
        let result: ReturnType<Update> | undefined;
        contextUpdate(() => {
          result = update(...args);
        });
        return result as ReturnType<Update>;
      }, [contextUpdate, update]);
    }
    // not concurrentMode
    : () => {
      if (
        typeof process === 'object'
        && process.env.NODE_ENV !== 'production'
        && useContextOrig(UpdateContext) === null
      ) {
        throw new Error('Please use <Provider>');
      }
      return useContextOrig(UpdateContext as ContextOrig<Update>);
    };

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
