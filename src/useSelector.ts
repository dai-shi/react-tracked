import {
  useDebugValue,
} from 'react';
import {
  Context,
  useContext,
} from 'use-context-selector';

export const useSelector = <State, Selected>(
  StateContext: Context<State>,
  selector: (state: State) => Selected,
) => {
  const selected = useContext(StateContext, selector);
  useDebugValue(selected);
  return selected;
};
