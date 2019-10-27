import React from 'react';

import { useTrackedState, useDispatch } from './store';

const Counter: React.FC = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter</h1>
      Count: {state.count}
      <button type="button" onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button type="button" onClick={() => dispatch({ type: 'DELAYED_DECREMENT' })}>-1 (Delayed)</button>
    </div>
  );
};

export default React.memo(Counter);
