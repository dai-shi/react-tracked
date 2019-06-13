import * as React from 'react';

import { useSelector, useDispatch } from 'react-tracked';

import { State, Dispatch } from './state';

const Counter = () => {
  const counter = useSelector<State, number>(state => state.counter);
  const dispatch = useDispatch<Dispatch>();
  return (
    <div>
      {Math.random()}
      <div>
        <span>Count:{counter}</span>
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      </div>
    </div>
  );
};

export default Counter;
