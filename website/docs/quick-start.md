---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

Let's try a minimal example from scratch.

## Create a new app

Use [create-react-app](https://create-react-app.dev) to create a new app.

```bash
npx create-react-app my-app # Add --typescript for TypeScript
```

Run the app.

```bash
cd my-app
npm start # Or yarn start
```

## Create a global state with pure React

Now, we create a global state that contains a number and a string.

Create a new file `./src/store.js`. (`./src/store.tsx` for TypeScript)

```typescript ts2js
import React, { createContext, useState, useContext } from 'react';

const initialState = {
  count: 0,
  text: 'hello',
};

const useMyState = () => useState(initialState);

const MyContext = createContext<ReturnType<typeof useMyState> | null>(null);

export const useSharedState = () => {
  const value = useContext(MyContext);
  if (value === null) throw new Error('Please add SharedStateProvider');
  return value;
};

export const SharedStateProvider: React.FC = ({ children }) => (
  <MyContext.Provider value={useMyState()}>
    {children}
  </MyContext.Provider>
);
```

Create a new file `./src/Counter.js`. (`./src/Counter.tsx` for TypeScript)

```typescript ts2js
import React from 'react';

import { useSharedState } from './store';

const Counter: React.FC = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState(prev => ({ ...prev, count: prev.count + 1 }));
  };
  return (
    <div>
      {state.count}
      <button onClick={increment}>+1</button>
    </div>
  );
};

export default Counter;
```

Create a new file `./src/TextBox.js`. (`./src/TextBox.tsx` for TypeScript)

```typescript ts2js
import React from 'react';

import { useSharedState } from './store';

const TextBox: React.FC = () => {
  const [state, setState] = useSharedState();
  const setText = (text: string) => {
    setState(prev => ({ ...prev, text }));
  };
  return (
    <div>
      {state.text}
      <input value={state.text} onChange={e => setText(e.target.value)} />
    </div>
  );
};

export default TextBox;
```

Finally, modify the file `./src/App.js`. (`./src/App.tsx` for TypeScript)

```typescript ts2js
import React from 'react';
import logo from './logo.svg';
import './App.css';

import { SharedStateProvider } from './store';
import Counter from './Counter';
import TextBox from './TextBox';

const App: React.FC = () => (
  <SharedStateProvider>
    <div className="App">
      <header className="App-header">
        <Counter />
        <TextBox />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  </SharedStateProvider>
);

export default App;
```

Check the running app again and see how the counter and the text box work.

## Performance issue with pure React

Our app works totally fine.
But if a shared state becomes very big,
we may experience a drop in performance.
This is because all components that use the shared state
will re-render even if only a small part of the shared state is changed.

React Tracked solves this issue without efforts.

> Note: In pure React, it's recommended to split context into pieces. Check out [this](https://blog.axlight.com/posts/4-options-to-prevent-extra-rerenders-with-react-context/) or [that](https://www.basefactor.com/global-state-with-react) for more information.

## Install React Tracked

It's time to try React Tracked.
Let's install the library.

```bash
npm install react-tracked # Or yarn add react-tracked
```

## Use React Tracked instead of bare context

It's very simple.
Modify the file `./src/store.js`. (`./src/store.tsx` for TypeScript)

```typescript ts2js
import { useState } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
  count: 0,
  text: 'hello',
};

const useMyState = () => useState(initialState);

export const {
  Provider: SharedStateProvider,
  useTracked: useSharedState,
} = createContainer(useMyState);
```

That's it. Check the running app and see it works as before.

How can we see the difference?
You could add `console.log` in render (which is technically a side effect),
or add `{Math.random()}` in JSX which is easier.

For example, modify the Counter component like this.

```typescript ts2js
const Counter: React.FC = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState(prev => ({ ...prev, count: prev.count + 1 }));
  };
  return (
    <div>
      {state.count}
      <button onClick={increment}>+1</button>
      {Math.random()}
    </div>
  );
};
```

With this, try both pure React version and React Tracked version.

In the React Tracked version,
the random number only changes when clicking the increment button.
It won't change when typing in the text box.
