import { Context, useContext } from 'react';

import { ContextValue, UPDATE_CONTEXT_PROPERTY } from './createProvider';

export const useUpdate = <State, Update>(
  CustomContext: Context<ContextValue<State, Update>>,
) => {
  const { [UPDATE_CONTEXT_PROPERTY]: update } = useContext(CustomContext);
  return update;
};
