import React, { useState, StrictMode } from 'react';
import {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  createRoot,
} from 'react-dom';

import { createContainer } from 'react-tracked';

const useValue = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  return [count, { increment, decrement }] as const;
};

const { Provider, useTracked } = createContainer(useValue);

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
    <Provider>
      <Counter />
      <Counter />
    </Provider>
  </StrictMode>
);

const ele = document.getElementById('app');
if (!ele) throw new Error('no app');
createRoot(ele).render(React.createElement(App));
