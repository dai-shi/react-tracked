import * as React from 'react';

import { useTracked } from 'react-tracked';

import { State, Dispatch } from './state';

const Counter = () => {
  const [state, dispatch] = useTracked<State, Dispatch>();
  return (
    <div>
      {Math.random()}
      <div>
        <span>Count:{state.counter}</span>
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      </div>
    </div>
  );
};

export default Counter;
