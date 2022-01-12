import { Reducer } from 'react';
import {
  call,
  put,
  delay,
  takeLatest,
  takeEvery,
  all,
} from 'redux-saga/effects';
import useSagaReducer from 'use-saga-reducer';
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

const reducer: Reducer<State, InnerAction | OuterAction> = (state, action) => {
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
      return state; // needs this for AsyncAction
  }
};

type AsyncActionFetch = { type: 'FETCH_USER'; id: number }
type AsyncActionDecrement = { type: 'DELAYED_DECREMENT' };
type AsyncAction = AsyncActionFetch | AsyncActionDecrement;

function* userFetcher(action: AsyncActionFetch) {
  try {
    yield put<InnerAction>({ type: 'START_FETCH_USER' });
    const response: Response = yield call(() => fetch(`https://reqres.in/api/users/${action.id}?delay=1`));
    yield put<InnerAction>({ type: 'CONTINUE_FETCH_USER' });
    const data: { data: Record<string, unknown> } = yield call(() => response.json());
    yield delay(500);
    const firstName = data.data.first_name;
    if (typeof firstName !== 'string') throw new Error();
    yield put<InnerAction>({ type: 'FINISH_FETCH_USER', firstName });
  } catch (e) {
    yield put<InnerAction>({ type: 'ERROR_FETCH_USER' });
  }
}

function* delayedDecrementer() {
  yield delay(500);
  yield put<InnerAction>({ type: 'DECREMENT' });
}

function* userFetchingSaga() {
  yield takeLatest<AsyncActionFetch>('FETCH_USER', userFetcher);
}

function* delayedDecrementingSaga() {
  yield takeEvery<AsyncActionDecrement>('DELAYED_DECREMENT', delayedDecrementer);
}

function* rootSaga() {
  yield all([
    userFetchingSaga(),
    delayedDecrementingSaga(),
  ]);
}

const useValue = () => useSagaReducer(
  rootSaga,
  reducer as Reducer<State, AsyncAction | OuterAction>,
  initialState,
);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue, { concurrentMode: true });
