import * as React from 'react';

import { useTrackedState, useDispatch } from './store';

const Counter: React.FC = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  return (
    <div>
      {Math.random()}
      <div>
        <span>Count: {state.count}</span>
        <button type="button" onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      </div>
    </div>
  );
};

export default React.memo(Counter);
