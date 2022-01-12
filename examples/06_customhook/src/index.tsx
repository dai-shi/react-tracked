// eslint-disable-next-line spaced-comment
/// <reference types="react-dom/next" />

import React, { useEffect, useState, StrictMode } from 'react';
import { createRoot } from 'react-dom';

import { createContainer } from 'react-tracked';

const useValue = () => {
  const [count, setCountOrig] = useState(0);
  const setCount = (nextCount: number) => {
    // eslint-disable-next-line no-console
    console.log({ nextCount });
    setCountOrig(nextCount);
  };
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ count });
  });
  return [count, setCount] as const;
};

const { Provider, useTracked } = createContainer(useValue, { concurrentMode: true });

const Counter = () => {
  const [count, setCount] = useTracked();
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return (
    <div>
      <span>Count: {count}</span>
      <button type="button" onClick={increment}>+1</button>
      <button type="button" onClick={decrement}>-1</button>
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
