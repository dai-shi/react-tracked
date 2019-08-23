import React, { useReducer } from 'react';
import { Provider, useTracked } from 'react-tracked';

const initialState = {
  count: 0,
  text: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + 1 };
    case 'decrement': return { ...state, count: state.count - 1 };
    case 'setText': return { ...state, text: action.text };
    default: return state;
  }
};

const useValue = initState => useReducer(reducer, initState);

const Counter = () => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      <span>Count: {state.count}</span>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    </div>
  );
};

const App = () => (
  <Provider useValue={useValue} initialState={initialState}>
    <Counter />
    <Counter />
  </Provider>
);

export default App;
