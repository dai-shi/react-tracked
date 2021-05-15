import React, { useReducer, StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'react-tracked';

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState);
const { Provider, useTracked } = createContainer(useValue, true);

const initialState = {
  count: 0,
  text: 'hello',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + 1 };
    case 'decrement': return { ...state, count: state.count - 1 };
    case 'setText': return { ...state, text: action.text };
    default: throw new Error(`unknown action type: ${action.type}`);
  }
};

let numRendered = 0;

const Counter = () => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      numRendered: {++numRendered}
      <div>
        <span>Count: {state.count}</span>
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
      numRendered: {++numRendered}
      <div>
        <span>Text: {state.text}</span>
        <input value={state.text} onChange={(event) => dispatch({ type: 'setText', text: event.target.value })} />
      </div>
    </div>
  );
};

const App = () => (
  <StrictMode>
    <Provider reducer={reducer} initialState={initialState}>
      <h1>Counter</h1>
      <Counter />
      <Counter />
      <h1>TextBox</h1>
      <TextBox />
      <TextBox />
    </Provider>
  </StrictMode>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
