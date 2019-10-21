import React from 'react';

import { useTrackedState } from './store';
import Person from './Person';
import Counter from './Counter';

const Main: React.FC = () => {
  const state = useTrackedState();
  return (
    <div>
      {state.loading ? <span>Loading...</span> : <Person />}
      <Counter />
    </div>
  );
};

export default Main;
