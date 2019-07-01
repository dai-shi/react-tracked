import React, { Fragment } from 'react';
import create from 'zustand';

const [useStore] = create(set => ({
  count: 0,
  text: '',
  increment: () => set(state => ({ ...state, count: state.count + 1 })),
  decrement: () => set(state => ({ ...state, count: state.count - 1 })),
  setText: text => set(state => ({ ...state, text })),
}));

const Counter = () => {
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  const decrement = useStore(state => state.decrement);
  return (
    <div>
      <span>Count: {count}</span>
      <button type="button" onClick={increment}>+1</button>
      <button type="button" onClick={decrement}>-1</button>
    </div>
  );
};

const App = () => (
  <Fragment>
    <Counter />
    <Counter />
  </Fragment>
);

export default App;
