---
id: tutorial-04
title: Tutorial - ToDo App with Async Actions
sidebar_label: ToDo App (async)
---

This tutorial shows example code with async actions.

## src/App.js

```typescript ts2js
import React from 'react';

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
import { Reducer } from 'react';
import { useReducerAsync, AsyncActionHandlers } from 'use-reducer-async';
import { createContainer } from 'react-tracked';

type TodoType = {
  id: string;
  title: string;
  completed?: boolean;
};

type State = {
  todoIds: string[];
  todoMap: { [id: string]: TodoType };
  query: string;
  pending: boolean;
  error: Error | null;
};

const initialState: State = {
  todoIds: [],
  todoMap: {},
  query: '',
  pending: false,
  error: null,
};

type InnerAction =
  | { type: 'STARTED' }
  | { type: 'TODO_CREATED'; todo: TodoType }
  | { type: 'TODO_UPDATED'; todo: TodoType }
  | { type: 'TODO_DELETED'; id: string }
  | { type: 'FAILED'; error: Error };

type OuterAction = { type: 'QUERY_CHANGED'; query: string };

type Action = InnerAction | OuterAction;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'STARTED':
      return {
        ...state,
        pending: true,
      };
    case 'TODO_CREATED':
      return {
        ...state,
        todoIds: [...state.todoIds, action.todo.id],
        todoMap: { ...state.todoMap, [action.todo.id]: action.todo },
        pending: false,
      };
    case 'TODO_UPDATED':
      return {
        ...state,
        todoMap: { ...state.todoMap, [action.todo.id]: action.todo },
        pending: false,
      };
    case 'TODO_DELETED': {
      const { [action.id]: _removed, ...rest } = state.todoMap;
      return {
        ...state,
        todoIds: state.todoIds.filter(id => id !== action.id),
        todoMap: rest,
        pending: false,
      };
    }
    case 'FAILED':
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case 'QUERY_CHANGED':
      return {
        ...state,
        query: action.query,
      };
    default:
      throw new Error('unknown action type');
  }
};

type AsyncActionCreate = { type: 'CREATE_TODO'; title: string };
type AsyncActionToggle = { type: 'TOGGLE_TODO'; id: string };
type AsyncActionDelete = { type: 'DELETE_TODO'; id: string };

type AsyncAction = AsyncActionCreate | AsyncActionDelete | AsyncActionToggle;

const asyncActionHandlers: AsyncActionHandlers<
  Reducer<State, Action>,
  AsyncAction
> = {
  CREATE_TODO: dispatch => async action => {
    try {
      dispatch({ type: 'STARTED' });
      const response = await fetch(`https://reqres.in/api/todos?delay=1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: action.title }),
      });
      const data = await response.json();
      if (typeof data.id !== 'string') throw new Error('no id');
      if (typeof data.title !== 'string') throw new Error('no title');
      dispatch({ type: 'TODO_CREATED', todo: data });
    } catch (error) {
      dispatch({ type: 'FAILED', error });
    }
  },
  TOGGLE_TODO: (dispatch, getState) => async action => {
    try {
      dispatch({ type: 'STARTED' });
      const todo = getState().todoMap[action.id];
      const body = {
        ...todo,
        completed: !todo.completed,
      };
      const response = await fetch(
        `https://reqres.in/api/todos/${action.id}?delay=1`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      if (typeof data.title !== 'string') throw new Error('no title');
      dispatch({ type: 'TODO_UPDATED', todo: { ...data, id: action.id } });
    } catch (error) {
      dispatch({ type: 'FAILED', error });
    }
  },
  DELETE_TODO: dispatch => async action => {
    try {
      dispatch({ type: 'STARTED' });
      await fetch(`https://reqres.in/api/todos/${action.id}?delay=1`, {
        method: 'DELETE',
      });
      dispatch({ type: 'TODO_DELETED', id: action.id });
    } catch (error) {
      dispatch({ type: 'FAILED', error });
    }
  },
};

const useValue = () =>
  useReducerAsync<
    Reducer<State, Action>,
    AsyncAction,
    AsyncAction | OuterAction
  >(reducer, initialState, asyncActionHandlers);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
```

This is the store we use.
It is a bit long and you would eventually want to split into files.
It defines a reducer for normal (sync) actions.
Then, we combine it with async actioin handlers
to create a store.

In this example we use `use-reducer-async` helper hook.
It's a tiny custom hook, and actually it's fairly easy
to do the same thing without the custom hook.

You could also use `redux-saga` for async actions.
For saga users, here is [an example](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/13_saga).

Another note in this store is that it has both `todoIds` and `todoMap`.
They are denormalized. The reason for this pattern is
it would allow state usage tracking easier.
In other words, we might not need `React.memo` in a certain case.
If you want the data in the store to be normalized,
please check out the array pattern in [the other Tutorial](./tutorial-01.md).

## src/TodoList.js

```typescript ts2js
import React from 'react';

import { useDispatch, useTrackedState } from './store';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const setQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'QUERY_CHANGED', query: event.target.value });
  };
  return (
    <div>
      {state.error && <h1>{state.error.message}</h1>}
      <ul>
        {state.todoIds.map(id => (
          <TodoItem key={id} id={id} />
        ))}
        <NewTodo />
      </ul>
      <div>
        Highlight Query for incomplete items:
        <input value={state.query} onChange={setQuery} />
      </div>
      {state.pending && <h3>Processing...</h3>}
    </div>
  );
};

export default TodoList;
```

This component is to show the list of `TodoItem`s,
`NewTodo` to create a new item, and
a text field for highlight query.
It will also show error and pending states.

Notice it only passes `id` to `TodoItem`.

## src/TodoItem.js

```typescript ts2js
import React from 'react';

import { useDispatch, useTrackedState } from './store';

const renderHighlight = (title: string, query: string) => {
  if (!query) return title;
  const index = title.indexOf(query);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <b>{query}</b>
      {title.slice(index + query.length)}
    </>
  );
};

type Props = {
  id: string;
};

const TodoItem: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const todo = state.todoMap[id];
  const delTodo = () => {
    dispatch({ type: 'DELETE_TODO', id: todo.id });
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.completed ? todo.title : renderHighlight(todo.title, state.query)}
      </span>
      <button onClick={delTodo}>Delete</button>
    </li>
  );
};

export default React.memo(TodoItem);
```

This is the TodoItem component.
It dispathes async actions,
but it doesn't need to know if an action is sync or async.

## src/NewTodo.js

```typescript ts2js
import React from 'react';
import { useState } from 'react';

import { useDispatch } from './store';

const NewTodo: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const addTodo = () => {
    dispatch({ type: 'CREATE_TODO', title: text });
    setText('');
  };
  return (
    <li>
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

## CodeSandbox

You can try [working example](https://codesandbox.io/s/great-euler-22bxz).
