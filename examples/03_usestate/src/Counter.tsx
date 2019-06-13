import * as React from 'react';

import { useTracked } from 'react-tracked';

import { State, Updater } from './state';

const Counter = () => {
  const [state, setState] = useTracked<State, Updater>();
  const increment1 = () => {
    setState({
      ...state,
      counter: state.counter + 1,
    });
  };
  const increment2 = () => {
    setState(s => ({
      ...s,
      counter: s.counter + 1,
    }));
  };
  return (
    <div>
      {Math.random()}
      <div>
        <span>Count:{state.counter}</span>
        <button type="button" onClick={increment1}>+1</button>
        <button type="button" onClick={increment2}>+1</button>
      </div>
    </div>
  );
};

export default Counter;
