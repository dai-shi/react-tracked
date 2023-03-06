import { useReducer, Reducer } from 'react';

import { createContainer } from 'react-tracked';

const initialState = {
  count: [0, 0, 0],
  person: {
    age: 0,
    firstName: '',
    lastName: '',
  },
};

type State = typeof initialState;

type Action =
  | { type: 'increment'; index: number }
  | { type: 'decrement'; index: number }
  | { type: 'setFirstName'; firstName: string }
  | { type: 'setLastName'; lastName: string }
  | { type: 'setAge'; age: number };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'increment': return {
      ...state,
      count: [
        ...state.count.slice(0, action.index),
        (state.count[action.index] as number) + 1,
        ...state.count.slice(action.index + 1),
      ],
    };
    case 'decrement': return {
      ...state,
      count: [
        ...state.count.slice(0, action.index),
        (state.count[action.index] as number) - 1,
        ...state.count.slice(action.index + 1),
      ],
    };
    case 'setFirstName': return {
      ...state,
      person: {
        ...state.person,
        firstName: action.firstName,
      },
    };
    case 'setLastName': return {
      ...state,
      person: {
        ...state.person,
        lastName: action.lastName,
      },
    };
    case 'setAge': return {
      ...state,
      person: {
        ...state.person,
        age: action.age,
      },
    };
    default:
      throw new Error('unknown action type');
  }
};

const useValue = () => useReducer(reducer, initialState);

export const { Provider, useTracked } = createContainer(useValue, { concurrentMode: true });
