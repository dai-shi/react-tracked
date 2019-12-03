import React from 'react';

import { useValue } from './state';

let numRendered = 0;

const Counter: React.FC<{ useTracked: typeof useValue }> = ({ useTracked }) => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      numRendered: {++numRendered}
      <div>
        <span>Count: {state.count}</span>
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      </div>
    </div>
  );
};

export default Counter;
