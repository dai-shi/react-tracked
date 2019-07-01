import React from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useTrackedState } from 'reactive-react-redux';

const initialState = {
  count: 0,
  text: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + 1 };
    case 'decrement': return { ...state, count: state.count - 1 };
    case 'setText': return { ...state, text: action.text };
    default: return state;
  }
};

const store = createStore(reducer);

const Counter = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  return (
    <div>
      <span>Count: {state.count}</span>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Counter />
    <Counter />
  </Provider>
);

export default App;
