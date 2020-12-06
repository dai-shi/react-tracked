import { Context as ContextOrig, useMemo } from 'react';
import { Context } from 'use-context-selector';

import { useTrackedState } from './useTrackedState';
import { useUpdate } from './useUpdate';

export const useTracked = <State, Update extends (...args: any[]) => any>(
  StateContext: Context<State>,
  UpdateContext: ContextOrig<Update>,
  opts?: Parameters<typeof useTrackedState>[1],
) => {
  const state = useTrackedState(StateContext, opts);
  const update = useUpdate(StateContext, UpdateContext);
  return useMemo(() => [state, update], [state, update]) as [State, Update];
};
