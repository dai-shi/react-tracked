import React from 'react';

import useVisibilityFilter from '../hooks/useVisibilityFilter';
import { VisibilityFilterType } from '../state';

type Props = {
  filter: VisibilityFilterType;
};

const FilterLink: React.FC<Props> = ({ filter, children }) => {
  const [visibilityFilter, setVisibilityFilter] = useVisibilityFilter();
  const active = filter === visibilityFilter;
  return (
    <button
      type="button"
      onClick={() => setVisibilityFilter(filter)}
      disabled={active}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  );
};

export default FilterLink;
