/* eslint-env browser */

import React, { useState, StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider, useTracked } from 'react-tracked';

const useValue = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return [count, { increment, decrement }];
};

const Counter = () => {
  const [count, actions] = useTracked();
  return (
    <div>
      <span>Count: {count}</span>
      <button type="button" onClick={actions.increment}>+1</button>
      <button type="button" onClick={actions.decrement}>-1</button>
    </div>
  );
};

const App = () => (
  <StrictMode>
    <Provider useValue={useValue}>
      <Counter />
      <Counter />
    </Provider>
  </StrictMode>
);

ReactDOM.unstable_createRoot(document.getElementById('app')).render(<App />);
