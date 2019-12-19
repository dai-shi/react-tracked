import React from 'react';

import { useTracked } from './state';

let numRendered = 0;

const Counter: React.FC = () => {
  const [state, setState] = useTracked();
  const increment = () => {
    setState((s) => ({
      ...s,
      count: s.count + 1,
    }));
  };
  return (
    <div>
      numRendered: {++numRendered}
      <div>
        <span>Count: {state.count}</span>
        <button type="button" onClick={increment}>+1</button>
      </div>
    </div>
  );
};

export default Counter;
