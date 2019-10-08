---
id: tutorial-01
title: Tutorial - ToDo App with useReducer
sidebar_label: ToDo App (useReducer)
---

This tutorial shows example code with useReducer.

## src/App.js

```typescript ts2js
import * as React from 'react';

import { Provider } from './store';
import TodoList from './TodoList';

const App: React.FC = () => (
  <Provider>
    <TodoList />
  </Provider>
);

export default App;
```

This is the root component.
It wraps TodoList with Provider.

## src/store.js

```typescript ts2js
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

export type TodoType = {
  id: number;
  title: string;
  note?: string;
  completed?: boolean;
};

type State = {
  todos: TodoType[];
};

type Action =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'CHANGE_TODO'; id: number; note: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'CLEAR_ALL_NOTES' };

const initialState: State = {
  todos: [
    { id: 1, title: 'Wash dishes' },
    { id: 2, title: 'Study JS' },
    { id: 3, title: 'Buy ticket' },
  ],
};

let nextId = 4;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: nextId++, title: action.title }],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case 'CHANGE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, note: action.note } : todo
        ),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'CLEAR_ALL_NOTES':
      return {
        ...state,
        todos: state.todos.map(todo => {
          const { note, ...rest } = todo;
          return rest;
        }),
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
```

The store is created by useReducer.
useUpdated is renamed to useDispatch for exporting.

## src/TodoList.js

```typescript ts2js
import * as React from 'react';

import { useDispatch, useTrackedState } from './store';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const { todos } = state;
  return (
    <div>
      <ul>
        {todos.map(({ id, title, completed, note }) => (
          <TodoItem
            key={id}
            id={id}
            title={title}
            completed={completed}
            note={note}
          />
        ))}
        <NewTodo />
      </ul>
      <button onClick={() => dispatch({ type: 'CLEAR_ALL_NOTES' })}>
        Clear all notes
      </button>
    </div>
  );
};

export default TodoList;
```

This component is to show the list of `TodoItem`s,
`NewTodo` to create a new item, and
Clear button to reset notes in all items.

## src/TodoItem.js

```typescript ts2js
import * as React from 'react';

import { useDispatch, TodoType } from './store';
import { useFlasher } from './utils';

const TodoItem: React.FC<TodoType> = ({ id, title, completed, note }) => {
  const dispatch = useDispatch();
  const delTodo = () => {
    dispatch({ type: 'DELETE_TODO', id });
  };
  return (
    <li ref={useFlasher()}>
      <input
        type="checkbox"
        onChange={() => dispatch({ type: 'TOGGLE_TODO', id })}
      />
      <span
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {title}
      </span>
      <input
        value={note || ''}
        placeholder="Enter note..."
        onChange={e =>
          dispatch({ type: 'CHANGE_TODO', id, note: e.target.value })
        }
      />
      <button onClick={delTodo}>Delete</button>
    </li>
  );
};

export default React.memo(TodoItem);
```

This is the TodoItem component.
We prefer primitive props for memoized components.

If you want to use object props for memoized components,
you need to notify the objects by [trackMemo](/docs/api#trackmemo).
See [example/09](https://github.com/dai-shi/react-tracked/tree/master/examples/09_reactmemo) for the usage.

## src/NewTodo.js

```typescript ts2js
import * as React from 'react';
import { useState } from 'react';

import { useDispatch } from './store';
import { useFlasher } from './utils';

const NewTodo: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const addTodo = () => {
    dispatch({ type: 'ADD_TODO', title: text });
    setText('');
  };
  return (
    <li ref={useFlasher()}>
      <input
        value={text}
        placeholder="Enter title..."
        onChange={e => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
    </li>
  );
};

export default React.memo(NewTodo);
```

This is the NewTodo component to create a new item.
It uses a local state for the text field.

## src/utils.js

```typescript ts2js
import { useRef, useEffect } from 'react';

export const useFlasher = () => {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.setAttribute(
      'style',
      'box-shadow: 0 0 2px 1px red; transition: box-shadow 100ms ease-out;'
    );
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.setAttribute('style', '');
    }, 300);
  });
  return ref;
};
```

This is a util function to show which components render.

## CodeSandbox

You can try [working example](https://codesandbox.io/s/modest-lumiere-j266e).
