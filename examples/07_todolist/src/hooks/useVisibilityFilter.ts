import { useCallback } from 'react';
import { useTracked } from 'react-tracked';
import produce from 'immer';

import { VisibilityFilterType, State, SetState } from '../state';

const useVisibilityFilter = () => {
  const [state, setState] = useTracked<State, SetState>();
  const setVisibilityFilter = useCallback((filter: VisibilityFilterType) => {
    setState(s => produce(s, (draft) => {
      draft.visibilityFilter = filter;
    }));
  }, [setState]);
  return [state.visibilityFilter, setVisibilityFilter] as [
    VisibilityFilterType,
    typeof setVisibilityFilter,
  ];
};

export default useVisibilityFilter;
