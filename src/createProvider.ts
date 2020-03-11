/* eslint-disable @typescript-eslint/ban-ts-ignore */

import {
  Context,
  FC,
  MutableRefObject,
  // @ts-ignore
  createMutableSource,
  createElement,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  unstable_UserBlockingPriority as UserBlockingPriority,
  unstable_NormalPriority as NormalPriority,
  unstable_runWithPriority as runWithPriority,
} from 'scheduler';

import { useIsomorphicLayoutEffect } from './utils';

export const MUTABLE_SOURCE_CONTEXT_PROPERTY = 's';
export const UPDATE_CONTEXT_PROPERTY = 'u';

export const STATEREF_SOURCE_PROPERTY = 'r';
export const LISTENERS_SOURCE_PROPERTY = 'l';

// @ts-ignore
export type ContextValue<State, Update> = {
  [MUTABLE_SOURCE_CONTEXT_PROPERTY]: any;
  [UPDATE_CONTEXT_PROPERTY]: Update;
};

export const createProvider = <State, Update extends (...args: any) => any, Props>(
  CustomContext: Context<ContextValue<State, Update>>,
  useValue: (props: Props) => readonly [State, Update],
) => {
  const Provider: FC<Props> = (props) => {
    const listeners = useRef(new Set<() => void>());
    const [state, update] = useValue(props);
    const stateRef = useRef(state);
    useIsomorphicLayoutEffect(() => {
      stateRef.current = state;
      runWithPriority(NormalPriority, () => {
        listeners.current.forEach((listener) => listener());
      });
    });
    const updateWithPriority = useCallback((...args: any) => (
      runWithPriority(UserBlockingPriority, () => update(...args))
    ), [update]) as Update;
    const mutableSource = useMemo(() => createMutableSource({
      [STATEREF_SOURCE_PROPERTY]: stateRef,
      [LISTENERS_SOURCE_PROPERTY]: listeners,
    }, () => stateRef.current), []);
    const contextValue = useMemo(() => ({
      [MUTABLE_SOURCE_CONTEXT_PROPERTY]: mutableSource,
      [UPDATE_CONTEXT_PROPERTY]: updateWithPriority,
    }), [mutableSource, updateWithPriority]);
    return createElement(CustomContext.Provider, { value: contextValue }, props.children);
  };
  return Provider;
};

export const subscribe = (
  source: { [LISTENERS_SOURCE_PROPERTY]: MutableRefObject<Set<() => void>> },
  callback: () => void,
) => {
  const listeners = source[LISTENERS_SOURCE_PROPERTY].current;
  listeners.add(callback);
  return () => listeners.delete(callback);
};
