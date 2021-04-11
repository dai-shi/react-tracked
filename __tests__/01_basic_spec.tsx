import React, { useReducer, StrictMode } from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';

import { createContainer } from '../src/index';

describe('basic spec', () => {
  afterEach(cleanup);

  it('create a component', () => {
    const initialState = {
      count1: 0,
    };
    type Action = { type: 'increment' };
    const reducer = (state = initialState, action: Action) => {
      if (action.type === 'increment') {
        return { ...state, count1: state.count1 + 1 };
      }
      return state;
    };
    const useValue = () => useReducer(reducer, initialState);
    const { Provider, useTracked } = createContainer(useValue, true);
    const Counter = () => {
      const [state, dispatch] = useTracked();
      return (
        <div>
          <span>{state.count1}</span>
          <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        </div>
      );
    };
    const App = () => (
      <StrictMode>
        <Provider>
          <Counter />
          <Counter />
        </Provider>
      </StrictMode>
    );
    const { getAllByText, container } = render(<App />);
    expect(container).toMatchSnapshot();
    fireEvent.click(getAllByText('+1')[0]);
    expect(container).toMatchSnapshot();
  });
});
