import * as React from 'react';

import { useSelector, useDispatch } from 'react-tracked';

import { State, Dispatch } from './state';

const Counter = () => {
  const count = useSelector<State, number>(state => state.count);
  const dispatch = useDispatch<Dispatch>();
  return (
    <div>
      {Math.random()}
      <div>
        <span>Count: {count}</span>
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      </div>
    </div>
  );
};

export default Counter;
