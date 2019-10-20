import { useReducer, useCallback, Reducer } from 'react';
import { createContainer } from 'react-tracked';

type State = {
  firstName: string;
  loading: boolean;
  count: number;
};

const initialState: State = {
  firstName: '',
  loading: false,
  count: 0,
};

type InnerAction =
  | { type: 'START_FETCH' }
  | { type: 'FINISH_FETCH'; firstName: string }
  | { type: 'ERROR_FETCH' }
  | { type: 'CLEAR_FIRST_NAME' };

type OuterAction =
  | { type: 'INCREMENT' };

const reducer: Reducer<State, InnerAction | OuterAction> = (state, action) => {
  switch (action.type) {
    case 'START_FETCH':
      return {
        ...state,
        loading: true,
      };
    case 'FINISH_FETCH':
      return {
        ...state,
        loading: false,
        firstName: action.firstName,
      };
    case 'ERROR_FETCH':
      return {
        ...state,
        loading: false,
      };
    case 'CLEAR_FIRST_NAME':
      return {
        ...state,
        firstName: '',
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      throw new Error('unknown action type');
  }
};

const useValue = () => useReducer(reducer, initialState);

const {
  Provider,
  useTrackedState,
  useUpdate: useInnerDispatch,
} = createContainer(useValue);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type AsyncAction =
  | { type: 'FETCH_PERSON'; id: number }
  | { type: 'DELAYED_CLEAR' };

const useDispatch = () => {
  const innerDispatch = useInnerDispatch();
  const dispatch = useCallback(async (action: AsyncAction | OuterAction) => {
    if (action.type === 'FETCH_PERSON') {
      innerDispatch({ type: 'START_FETCH' });
      try {
        const response = await fetch(`https://reqres.in/api/users/${action.id}?delay=1`);
        const data = await response.json();
        const firstName = data.data.first_name;
        if (typeof firstName !== 'string') throw new Error();
        innerDispatch({ type: 'FINISH_FETCH', firstName });
      } catch (e) {
        innerDispatch({ type: 'ERROR_FETCH' });
      }
    } else if (action.type === 'DELAYED_CLEAR') {
      await sleep(500);
      innerDispatch({ type: 'CLEAR_FIRST_NAME' });
    } else {
      innerDispatch(action);
    }
  }, [innerDispatch]);
  return dispatch;
};

export {
  Provider,
  useTrackedState,
  useDispatch,
};
