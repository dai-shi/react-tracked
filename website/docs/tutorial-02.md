---
id: tutorial-02
title: Tutorial - ToDo App with useState
sidebar_label: ToDo App (useState)
---

This tutorial shows example code with useState and [Immer](https://immerjs.github.io/immer/).

## src/components/App.js

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
import { useState, useCallback } from 'react';
import { createContainer } from 'react-tracked';
import produce from 'immer';

export type TodoType = {
  id: number;
  title: string;
  note?: string;
  completed?: boolean;
};

export type State = {
  todos: TodoType[];
};

const initialState: State = {
  todos: [
    { id: 1, title: 'Wash dishes' },
    { id: 2, title: 'Study JS' },
    { id: 3, title: 'Buy ticket' },
  ],
};

const useValue = () => useState(initialState);

const { Provider, useTrackedState, useUpdate: useSetState } = createContainer(
  useValue
);

const useSetDraft = () => {
  const setState = useSetState();
  return useCallback(
    draftUpdater => {
      setState(produce(draftUpdater));
    },
    [setState]
  );
};

export { Provider, useTrackedState, useSetDraft };
```

The store is created by useState.
useUpdated is renamed to useSetState for exporting.

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

import { useSetDraft, State } from '../store';

let nextId = 100;

export const useAddTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    title => {
      setDraft((draft: State) => {
        draft.todos.push({ id: nextId++, title });
      });
    },
    [setDraft]
  );
};
```

This is a custom hook to return `addTodo` function.

## src/hooks/useChangeTodo.js

```typescript ts2js
import { useCallback } from 'react';

import { useSetDraft, State } from '../store';

export const useChangeTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    (id: number, note: string) => {
      setDraft((draft: State) => {
        const todo = draft.todos.find(todo => todo.id === id);
        if (todo) todo.note = note;
      });
    },
    [setDraft]
  );
};
```

This is a custom hook to return `changeTodo` function.

## src/hooks/useClearAllNotes.js

```typescript ts2js
import { useCallback } from 'react';

import { useSetDraft, State } from '../store';

export const useClearAllNotes = () => {
  const setDraft = useSetDraft();
  return useCallback(() => {
    setDraft((draft: State) => {
      draft.todos.forEach(todo => {
        delete todo.note;
      });
    });
  }, [setDraft]);
};
```

This is a custom hook to return `clearAllNotes` function.

## src/hooks/useDeleteTodo.js

```typescript ts2js
import { useCallback } from 'react';

import { useSetDraft, State } from '../store';

export const useDeleteTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    (id: number) => {
      setDraft((draft: State) => {
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

import { useSetDraft, State } from '../store';

export const useToggleTodo = () => {
  const setDraft = useSetDraft();
  return useCallback(
    (id: number) => {
      setDraft((draft: State) => {
        const todo = draft.todos.find(todo => todo.id === id);
        if (todo) todo.completed = !todo.completed;
      });
    },
    [setDraft]
  );
};
```

This is a custom hook to return `toggleTodo` function.

## src/components/TodoList.js

```typescript ts2js
import * as React from 'react';

import { useTodoList } from '../hooks/useTodoList';
import { useClearAllNotes } from '../hooks/useClearAllNotes';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';

const TodoList: React.FC = () => {
  const clearAllNotes = useClearAllNotes();
  const todos = useTodoList();
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
      <button onClick={clearAllNotes}>Clear all notes</button>
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
import * as React from 'react';

import { TodoType } from '../store';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import { useToggleTodo } from '../hooks/useToggleTodo';
import { useChangeTodo } from '../hooks/useChangeTodo';
import { useFlasher } from '../utils';

const TodoItem: React.FC<TodoType> = ({ id, title, completed, note }) => {
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();
  const changeTodo = useChangeTodo();
  return (
    <li ref={useFlasher()}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
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
        onChange={e => changeTodo(id, e.target.value)}
      />
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
import * as React from 'react';
import { useState } from 'react';

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

You can try [working example](https://codesandbox.io/s/black-leftpad-bs43b).
