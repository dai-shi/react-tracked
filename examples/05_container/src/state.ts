import { useReducer } from 'react';

const initialState = {
  count: 0,
};

type State = typeof initialState;

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment': return {
      ...state,
      count: state.count + 1,
    };
    case 'decrement': return {
      ...state,
      count: state.count - 1,
    };
    default:
      throw new Error('unknown action type');
  }
};

export const useValue = () => useReducer(reducer, initialState);
