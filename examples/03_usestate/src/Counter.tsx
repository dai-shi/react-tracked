import * as React from 'react';

import { useTracked } from 'react-tracked';

import { State, Updater } from './state';

const Counter = () => {
  const [state, setState] = useTracked<State, Updater>();
  const increment = () => {
    setState(s => ({
      ...s,
      count: s.count + 1,
    }));
  };
  return (
    <div>
      {Math.random()}
      <div>
        <span>Count: {state.count}</span>
        <button type="button" onClick={increment}>+1</button>
      </div>
    </div>
  );
};

export default Counter;
