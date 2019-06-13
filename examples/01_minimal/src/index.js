/* eslint-env browser */

import React, { useReducer, StrictMode } from 'react';
import ReactDOM from 'react-dom';

import {
  Provider,
  useTracked,
} from 'react-tracked';

const initialState = {
  counter: 0,
  text: 'hello',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { ...state, counter: state.counter + 1 };
    case 'decrement': return { ...state, counter: state.counter - 1 };
    case 'setText': return { ...state, text: action.text };
    default: throw new Error(`unknown action type: ${action.type}`);
  }
};

const useValue = () => useReducer(reducer, initialState);

const Counter = () => {
  const [state, dispatch] = useTracked();
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

const TextBox = () => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      {Math.random()}
      <div>
        <span>Text:{state.text}</span>
        <input value={state.text} onChange={event => dispatch({ type: 'setText', text: event.target.value })} />
      </div>
    </div>
  );
};

const App = () => (
  <StrictMode>
    <Provider useValue={useValue}>
      <h1>Counter</h1>
      <Counter />
      <Counter />
      <h1>TextBox</h1>
      <TextBox />
      <TextBox />
    </Provider>
  </StrictMode>
);

ReactDOM.unstable_createRoot(document.getElementById('app')).render(<App />);
