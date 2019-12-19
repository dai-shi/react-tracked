import { Reducer } from 'react';
import { useReducerAsync, AsyncActionHandlers } from 'use-reducer-async';
import { createContainer } from 'react-tracked';

type State = {
  firstName: string;
  loadingState: 'idle' | 'connecting' | 'fetching';
  count: number;
};

const initialState: State = {
  firstName: '',
  loadingState: 'idle',
  count: 0,
};

type InnerAction =
  | { type: 'START_FETCH_USER' }
  | { type: 'CONTINUE_FETCH_USER' }
  | { type: 'FINISH_FETCH_USER'; firstName: string }
  | { type: 'ERROR_FETCH_USER' }
  | { type: 'DECREMENT' };

type OuterAction =
  | { type: 'CLEAR_USER_NAME' }
  | { type: 'INCREMENT' };

type Action = InnerAction | OuterAction;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'START_FETCH_USER':
      return {
        ...state,
        loadingState: 'connecting',
      };
    case 'CONTINUE_FETCH_USER':
      return {
        ...state,
        loadingState: 'fetching',
      };
    case 'FINISH_FETCH_USER':
      return {
        ...state,
        loadingState: 'idle',
        firstName: action.firstName,
      };
    case 'ERROR_FETCH_USER':
      return {
        ...state,
        loadingState: 'idle',
      };
    case 'CLEAR_USER_NAME':
      return {
        ...state,
        firstName: '',
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      throw new Error('unknown action type');
  }
};

type AsyncActionFetch = { type: 'FETCH_USER'; id: number }
type AsyncActionClear = { type: 'DELAYED_DECREMENT' };
type AsyncAction = AsyncActionFetch | AsyncActionClear;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncActionHandlers: AsyncActionHandlers<Reducer<State, Action>, AsyncAction> = {
  FETCH_USER: (dispatch) => async (action) => {
    try {
      dispatch({ type: 'START_FETCH_USER' });
      const response = await fetch(`https://reqres.in/api/users/${action.id}?delay=1`);
      dispatch({ type: 'CONTINUE_FETCH_USER' });
      const data = await response.json();
      await sleep(500);
      const firstName = data.data.first_name;
      if (typeof firstName !== 'string') throw new Error();
      dispatch({ type: 'FINISH_FETCH_USER', firstName });
    } catch (e) {
      dispatch({ type: 'ERROR_FETCH_USER' });
    }
  },
  DELAYED_DECREMENT: (dispatch) => async () => {
    await sleep(500);
    dispatch({ type: 'DECREMENT' });
  },
};

const useValue = () => useReducerAsync<
  Reducer<State, Action>,
  AsyncAction,
  AsyncAction | OuterAction
>(reducer, initialState, asyncActionHandlers);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
