import { useCallback } from 'react';
import produce from 'immer';

import { VisibilityFilterType, useTracked } from '../state';

const useVisibilityFilter = () => {
  const [state, setState] = useTracked();
  const setVisibilityFilter = useCallback((filter: VisibilityFilterType) => {
    setState((s) => produce(s, (draft) => {
      draft.visibilityFilter = filter;
    }));
  }, [setState]);
  return [state.visibilityFilter, setVisibilityFilter] as [
    VisibilityFilterType,
    typeof setVisibilityFilter,
  ];
};

export default useVisibilityFilter;
