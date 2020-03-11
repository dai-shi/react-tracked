/* eslint-disable @typescript-eslint/ban-ts-ignore */

import {
  Context,
  MutableRefObject,
  useCallback,
  useContext,
  // @ts-ignore
  useMutableSource,
} from 'react';

import {
  ContextValue,
  MUTABLE_SOURCE_CONTEXT_PROPERTY,
  STATEREF_SOURCE_PROPERTY,
  subscribe,
} from './createProvider';

export const useSelector = <State, Update, Selected>(
  CustomContext: Context<ContextValue<State, Update>>,
  selector: (state: State) => Selected,
) => {
  const {
    [MUTABLE_SOURCE_CONTEXT_PROPERTY]: mutableSource,
  } = useContext(CustomContext);
  const getSnapshot = useCallback(
    (source: { [STATEREF_SOURCE_PROPERTY]: MutableRefObject<State> }) => (
      selector(source[STATEREF_SOURCE_PROPERTY].current)
    ),
    [selector],
  );
  return useMutableSource(mutableSource, getSnapshot, subscribe);
};
