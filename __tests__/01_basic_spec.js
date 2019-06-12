import React, { useReducer, StrictMode } from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';

import {
  TrackedProvider,
  useTracked,
} from '../src/index';

describe('basic spec', () => {
  afterEach(cleanup);

  it('hooks are defiend', () => {
    expect(useTracked).toBeDefined();
  });

  it('create a component', () => {
    const initialState = {
      counter1: 0,
    };
    const reducer = (state = initialState, action) => {
      if (action.type === 'increment') {
        return { ...state, counter1: state.counter1 + 1 };
      }
      return state;
    };
    const useValue = () => useReducer(reducer, initialState);
    const Counter = () => {
      const [state, dispatch] = useTracked();
      return (
        <div>
          <span>{state.counter1}</span>
          <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        </div>
      );
    };
    const App = () => (
      <StrictMode>
        <TrackedProvider useValue={useValue}>
          <Counter />
          <Counter />
        </TrackedProvider>
      </StrictMode>
    );
    const { getAllByText, container } = render(<App />);
    expect(container).toMatchSnapshot();
    fireEvent.click(getAllByText('+1')[0]);
    expect(container).toMatchSnapshot();
  });
});
