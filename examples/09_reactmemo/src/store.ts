import { useReducer, Reducer } from 'react';
import { createContainer } from 'react-tracked';

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

type State = {
  todos: TodoType[];
};

type Action =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'CHANGE_TODO'; id: number; title: string }
  | { type: 'TOGGLE_TODO'; id: number };

const initialState: State = {
  todos: [
    { id: 1, title: 'Wash dishes', completed: false },
    { id: 2, title: 'Study JS', completed: false },
    { id: 3, title: 'Buy ticket', completed: false },
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
          { id: nextId++, title: action.title, completed: false },
        ],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case 'CHANGE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => (
          todo.id === action.id ? { ...todo, title: action.title } : todo
        )),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => (
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )),
      };
    default:
      return state;
  }
};

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
