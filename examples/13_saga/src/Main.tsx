import React, { useState } from 'react';

import { useTrackedState } from './store';
import Person from './Person';
import Counter from './Counter';

const Main: React.FC = () => {
  const state = useTrackedState();
  const [id, setId] = useState('3');
  return (
    <div>
      <h1>Person</h1>
      <div>
        User ID:
        <input value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      {state.loadingState !== 'idle' ? <span>{state.loadingState}...</span> : <Person id={id} />}
      <Counter />
    </div>
  );
};

export default Main;
