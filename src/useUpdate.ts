import {
  Context as ContextOrig,
  useContext as useContextOrig,
  useCallback,
} from 'react';
import {
  Context,
  useContextUpdate,
} from 'use-context-selector';

export const useUpdate = <State, Update extends (...args: any[]) => any>(
  StateContext: Context<State>,
  UpdateContext: ContextOrig<Update>,
) => {
  const contextUpdate = useContextUpdate(StateContext as Context<unknown>);
  const update = useContextOrig(UpdateContext);
  return useCallback((...args: Parameters<Update>) => {
    let result: ReturnType<Update> | null = null;
    contextUpdate(() => {
      result = update(...args);
    });
    return result as ReturnType<Update>;
  }, [contextUpdate, update]);
};
