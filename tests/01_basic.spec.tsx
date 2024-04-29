import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { useReducer, StrictMode } from 'react';
import { createContainer } from 'react-tracked';

describe('basic spec', () => {
  afterEach(cleanup);

  it('create a component', () => {
    const initialState = {
      count1: 0,
    };
    type Action = { type: 'increment' };
    const reducer = (state: typeof initialState, action: Action) => {
      if (action.type === 'increment') {
        return { ...state, count1: state.count1 + 1 };
      }
      return state;
    };
    const useValue = () => useReducer(reducer, initialState);
    const { Provider, useTracked } = createContainer(useValue, {
      concurrentMode: true,
    });
    const Counter = () => {
      const [state, dispatch] = useTracked();
      return (
        <div>
          <span>{state.count1}</span>
          <button type="button" onClick={() => dispatch({ type: 'increment' })}>
            +1
          </button>
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
    fireEvent.click(getAllByText('+1')[0] as HTMLElement);
    expect(container).toMatchSnapshot();
  });
});
