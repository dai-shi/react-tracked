---
id: tutorial-03
title: Tutorial - ToDo App with useState
sidebar_label: ToDo App (useState)
---

This tutorial shows example code with useState, [Immer](https://immerjs.github.io/immer/) and custom hooks.

## src/components/App.js

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
import { useState, useCallback } from 'react';
import { createContainer } from 'react-tracked';
import produce, { Draft } from 'immer';

type TodoType = {
  id: number;
  title: string;
  completed?: boolean;
};

export type State = {
  todos: TodoType[];
  query: string;
};

const initialState: State = {
  todos: [
    { id: 1, title: 'Wash dishes' },
    { id: 2, title: 'Study JS' },
    { id: 3, title: 'Buy ticket' },
  ],
  query: '',
};

const useValue = () => useState(initialState);

const { Provider, useTrackedState, useUpdate: useSetState } = createContainer(
  useValue
);

const useSetDraft = () => {
  const setState = useSetState();
  return useCallback(
    (draftUpdater: (draft: Draft<State>) => void) => {
      setState(produce(draftUpdater));
    },
    [setState]
  );
};

export { Provider, useTrackedState, useSetDraft };
```

The store is created by useState.
useUpdate is renamed to useSetState,
and based on it, useSetDraft with Immer is exported.

## src/hooks/useTodoList.js

```typescript ts2js
import { useTrackedState } from '../store';

export const useTodoList = () => {
  const state = useTrackedState();
  return state.todos;
};
```

This is a custom hook to simply return `todos`.

## src/hooks/useAddTodo.js

```typescript ts2js
import { useCallback } from 'react';

import { useSetDraft } from '../store';

let nextId = 100;

export const useAddTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    title => {
      setDraft(draft => {
        draft.todos.push({ id: nextId++, title });
      });
    },
    [setDraft]
  );
};
```

This is a custom hook to return `addTodo` function.

## src/hooks/useDeleteTodo.js

```typescript ts2js
import { useCallback } from 'react';

import { useSetDraft } from '../store';

export const useDeleteTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    (id: number) => {
      setDraft(draft => {
        const index = draft.todos.findIndex(todo => todo.id === id);
        if (index >= 0) draft.todos.splice(index, 1);
      });
    },
    [setDraft]
  );
};
```

This is a custom hook to return `deleteTodo` function.

## src/hooks/useToogleTodo.js

```typescript ts2js
import { useCallback } from 'react';

import { useSetDraft } from '../store';

export const useToggleTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    (id: number) => {
      setDraft(draft => {
        const todo = draft.todos.find(todo => todo.id === id);
        if (todo) todo.completed = !todo.completed;
      });
    },
    [setDraft]
  );
};
```

This is a custom hook to return `toggleTodo` function.

## src/hooks/useQuery.js

```typescript ts2js
import { useCallback } from 'react';

import { useTrackedState, useSetDraft } from '../store';

export const useQuery = () => {
  const state = useTrackedState();
  const getQuery = () => state.query;
  const setDraft = useSetDraft();
  const setQuery = useCallback(
    (query: string) => {
      setDraft(draft => {
        draft.query = query;
      });
    },
    [setDraft]
  );
  return { getQuery, setQuery };
};
```

This is a custom hook to return getQuery and setQuery.
It doesn't return `state.query` directly, because
it will be used conditionally.

## src/components/TodoList.js

```typescript ts2js
import React from 'react';

import { useTodoList } from '../hooks/useTodoList';
import { useQuery } from '../hooks/useQuery';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';

const TodoList: React.FC = () => {
  const { getQuery, setQuery } = useQuery();
  const todos = useTodoList();
  return (
    <div>
      <ul>
        {todos.map(({ id, title, completed }) => (
          <TodoItem key={id} id={id} title={title} completed={completed} />
        ))}
        <NewTodo />
      </ul>
      <div>
        Highlight Query for incomplete items:
        <input value={getQuery()} onChange={e => setQuery(e.target.value)} />
      </div>
    </div>
  );
};

export default TodoList;
```

This component is to show the list of `TodoItem`s,
`NewTodo` to create a new item, and
Clear button to reset notes in all items.

## src/components/TodoItem.js

```typescript ts2js
import React from 'react';

import { useQuery } from '../hooks/useQuery';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import { useToggleTodo } from '../hooks/useToggleTodo';
import { useFlasher } from '../utils';

const renderHighlight = (title, query) => {
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
  id: number;
  title: string;
  completed?: boolean;
};

const TodoItem: React.FC<Props> = ({ id, title, completed }) => {
  const { getQuery } = useQuery();
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();
  return (
    <li ref={useFlasher()}>
      <input
        type="checkbox"
        checked={!!completed}
        onChange={() => toggleTodo(id)}
      />
      <span
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {completed ? title : renderHighlight(title, getQuery())}
      </span>
      <button onClick={() => deleteTodo(id)}>Delete</button>
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

## src/components/NewTodo.js

```typescript ts2js
import React, { useState } from 'react';

import { useAddTodo } from '../hooks/useAddTodo';
import { useFlasher } from '../utils';

const NewTodo: React.FC = () => {
  const addTodo = useAddTodo();
  const [text, setText] = useState('');
  return (
    <li ref={useFlasher()}>
      <input
        value={text}
        placeholder="Enter title..."
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={() => {
          addTodo(text);
          setText('');
        }}
      >
        Add
      </button>
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

You can try [working example](https://codesandbox.io/s/infallible-firefly-yzwxc).
