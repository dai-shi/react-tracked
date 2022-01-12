import { useReducer, useCallback, Reducer } from 'react';
import { createContainer, getUntrackedObject } from 'react-tracked';

export type TodoType = {
  id: number;
  detail: {
    title: string;
  };
  completed: boolean;
};

type State = {
  todos: TodoType[];
};

type Action =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'CHANGE_TODO'; id: number; title: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DUPLICATE_TODO'; todo: TodoType };

const initialState: State = {
  todos: [
    { id: 1, detail: { title: 'Wash dishes' }, completed: true },
    { id: 2, detail: { title: 'Study JS' }, completed: false },
    { id: 3, detail: { title: 'Buy ticket' }, completed: false },
  ],
};

let nextId = 4;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: nextId++, detail: { title: action.title }, completed: false },
        ],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case 'CHANGE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => (
          todo.id === action.id ? {
            ...todo,
            detail: { ...todo.detail, title: action.title },
          } : todo
        )),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => (
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )),
      };
    case 'DUPLICATE_TODO':
      return {
        ...state,
        todos: [...state.todos, { ...action.todo, id: nextId++ }],
      };
    default:
      return state;
  }
};

const useValue = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);
  return [state, dispatch] as const;
};

const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue, { concurrentMode: true });

// eslint-disable-next-line arrow-parens
const untrackDeep = <T>(obj: T) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  const untrackedObj = getUntrackedObject(obj);
  if (untrackedObj !== null) return untrackedObj;
  const newObj = {} as T;
  let modified = false;
  Object.entries(obj).forEach(([k, v]) => {
    const vv = untrackDeep(v);
    if (vv !== null) {
      newObj[k as keyof T] = vv;
      modified = true;
    } else {
      newObj[k as keyof T] = v;
    }
  });
  return modified ? newObj : obj;
};

const useUntrackedDispatch = () => {
  const dispatch = useDispatch();
  return useCallback((action) => {
    const untrackedAction = untrackDeep(action);
    // console.log(action, untrackedAction);
    dispatch(untrackedAction);
  }, [dispatch]);
};

export {
  Provider,
  useTrackedState,
  useDispatch,
  useUntrackedDispatch,
};
