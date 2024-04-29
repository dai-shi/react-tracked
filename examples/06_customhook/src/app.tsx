import { useEffect, useState, StrictMode } from 'react';

import { createContainer } from 'react-tracked';

const useValue = () => {
  const [count, setCountOrig] = useState(0);
  const setCount = (nextCount: number) => {
    console.log({ nextCount });
    setCountOrig(nextCount);
  };
  useEffect(() => {
    console.log({ count });
  });
  return [count, setCount] as const;
};

const { Provider, useTracked } = createContainer(useValue, {
  concurrentMode: true,
});

const Counter = () => {
  const [count, setCount] = useTracked();
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return (
    <div>
      <span>Count: {count}</span>
      <button type="button" onClick={increment}>
        +1
      </button>
      <button type="button" onClick={decrement}>
        -1
      </button>
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

export default App;
