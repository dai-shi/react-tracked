import { Context as ContextOrig, useContext as useContextOrig, useCallback } from 'react';
import { Context, useContextUpdate } from 'use-context-selector';

type AnyFunction = (...args: any[]) => any;

export const useUpdate = <State, Update extends AnyFunction>(
  StateContext: Context<State>,
  UpdateContext: ContextOrig<Update>,
) => {
  const contextUpdate = useContextUpdate(StateContext as Context<unknown>);
  const update = useContextOrig(UpdateContext);
  return useCallback((...args: Parameters<Update>) => {
    let result: ReturnType<Update> | undefined;
    contextUpdate(() => {
      result = update(...args);
    });
    return result as ReturnType<Update>;
  }, [contextUpdate, update]);
};
