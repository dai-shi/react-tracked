import {
  useDebugValue,
} from 'react';
import {
  Context,
  useContextSelector,
} from 'use-context-selector';

export const useSelector = <State, Selected>(
  StateContext: Context<State>,
  selector: (state: State) => Selected,
) => {
  const selected = useContextSelector(StateContext, selector);
  useDebugValue(selected);
  return selected;
};
