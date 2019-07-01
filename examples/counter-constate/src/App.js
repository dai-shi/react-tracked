import React, { useReducer } from 'react';
import createUseContext from 'constate';

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

const useCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

const useCounterContext = createUseContext(useCounter);

const Counter = () => {
  const { state, dispatch } = useCounterContext();
  return (
    <div>
      <span>Count: {state.count}</span>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    </div>
  );
};

const App = () => (
  <useCounterContext.Provider>
    <Counter />
    <Counter />
  </useCounterContext.Provider>
);

export default App;
