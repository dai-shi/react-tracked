# react-tracked

[![Build Status](https://travis-ci.com/dai-shi/react-tracked.svg?branch=master)](https://travis-ci.com/dai-shi/react-tracked)
[![npm version](https://badge.fury.io/js/react-tracked.svg)](https://badge.fury.io/js/react-tracked)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-tracked)](https://bundlephobia.com/result?p=react-tracked)

Super fast React global/shared state with context and hooks

## Motivation

I have been developing [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux) which is an alternative to react-redux providing state usage tracking for optimization.
This library provides almost same functionality, but without Redux.
No middleware, no devtools, and/but no dependencies.

## Analogies

- Like [constate](https://github.com/diegohaz/constate) and [unstated-next](https://github.com/jamiebuilds/unstated-next), this receives `useValue` hook. Unlike them, this doesn't use factory pattern.
- Like [react-redux](https://react-redux.js.org/api/hooks) and [zustand](https://github.com/react-spring/zustand), it's optimized to trigger re-render only necessarily. Unlike them, this tracks state usage with Proxy for optomization, so you don't need a "selector".

Some other notes:

- not only `useReducer` but also `useState` can be used for `useValue`
- `useSelector` emulates that in react-redux

## Install

```bash
npm install react-tracked
```

## Usage

```javascript
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import {
  Provider,
  useTracked,
} from 'react-tracked';

const initialState = {
  counter: 0,
  text: 'hello',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { ...state, counter: state.counter + 1 };
    case 'decrement': return { ...state, counter: state.counter - 1 };
    case 'setText': return { ...state, text: action.text };
    default: throw new Error(`unknown action type: ${action.type}`);
  }
};

const useValue = () => useReducer(reducer, initialState);

const Counter = () => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      {Math.random()}
      <div>
        <span>Count:{state.counter}</span>
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      </div>
    </div>
  );
};

const TextBox = () => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      {Math.random()}
      <div>
        <span>Text:{state.text}</span>
        <input value={state.text} onChange={event => dispatch({ type: 'setText', text: event.target.value })} />
      </div>
    </div>
  );
};

const App = () => (
  <Provider useValue={useValue}>
    <h1>Counter</h1>
    <Counter />
    <Counter />
    <h1>TextBox</h1>
    <TextBox />
    <TextBox />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
```

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:minimal
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/02_typescript)
[03](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/03_usestate)
[04](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/04_selector)
[05](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/05_container)
