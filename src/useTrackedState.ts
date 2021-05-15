import { useMemo } from 'react';
import { Context, useContextSelector } from 'use-context-selector';

import { createTrackedSelector } from './createTrackedSelector';

export const useTrackedState = <State>(StateContext: Context<State>) => {
  const useTrackedSelector = useMemo(() => {
    const useSelector = <Selected>(selector: (state: State) => Selected) => (
      useContextSelector(StateContext, selector)
    );
    return createTrackedSelector(useSelector);
  }, [StateContext]);
  return useTrackedSelector();
};
