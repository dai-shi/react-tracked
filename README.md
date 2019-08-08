# react-tracked

[![Build Status](https://travis-ci.com/dai-shi/react-tracked.svg?branch=master)](https://travis-ci.com/dai-shi/react-tracked)
[![npm version](https://badge.fury.io/js/react-tracked.svg)](https://badge.fury.io/js/react-tracked)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-tracked)](https://bundlephobia.com/result?p=react-tracked)

Super fast React global/shared state with context and hooks

> If you are looking for a Redux-based library, please visit [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux) which has the same hooks API.

## Introduction

React Context and useContext is often used to avoid prop drilling,
however it's known that there's a performance issue.
When a context value is changed, all components that useContext
will re-render.
React idiomatic usage of the Context API is
to separate concerns into pieces and use multiple contexts.
If each context value is small enough, there shouldn't be
any performance issue.

What if one wants to put a bigger state object into a context
for various reasons?
React Redux is one solution in this field. Redux is designed to
handle one big global state, and React Redux optimizes that use case.

This library tosses a new option. It's based on Context and
typically with useReducer, and provides APIs to solve
the performance issue.
Most notably, it comes with `useTrackedState`, which allows
optimization without hassle. Technically, it uses Proxy underneath,
and it tracks state usage in render so that if only used part of the state
is changed, it will re-render.

## Install

```bash
npm install react-tracked
```

## Usage (useTracked)

```javascript
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import { Provider, useTracked } from 'react-tracked';

const initialState = {
  count: 0,
  text: 'hello',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + 1 };
    case 'decrement': return { ...state, count: state.count - 1 };
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
        <span>Count: {state.count}</span>
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
        <span>Text: {state.text}</span>
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

## Technical memo

React context by nature triggers propagation of component re-rendering
if a value is changed. To avoid this, this libraries use undocumented
feature of `calculateChangedBits`. It then uses a subscription model
to force update when a component needs to re-render.

## API (container)

### createContainer

```javascript
import { createContainer } from 'react-tracked';

const useValue = () => useReducer(...); // any custom hook that returns a tuple

const {
  Provider,
  useDispatch,
  useSelector,
  useTrackedState,
  useTracked,
} = createContainer(useValue);
```

### Provider

```javascript
const App = () => (
  <Provider>
    ...
  </Provider>
);
```

### useDispatch

```javascript
const Component = () => {
  const dispatch = useDispatch(); // simply to get the second one of the tuple
  // ...
};
```

### useSelector

```javascript
const Component = () => {
  const selected = useSelector(selector); // same API in react-redux
  // ...
};
```

### useTrackedState

```javascript
const Component = () => {
  const state = useTrackedState(); // same API in reactive-react-redux
  // ...
};
```

### useTracked

```javascript
const Component = () => {
  const [state, dispatch] = useTracked(); // combination of useTrackedState and useDispatch
  // ...
};
```

## API (default context)

### Provider

```javascript
import { Provider } from 'react-tracked';

const useValue = () => useReducer(...); // any custom hook that returns a tuple

const App = () => (
  <Provider useValue={useValue}>
    ...
  </Provider>
);
```

### useDispatch

```javascript
import { useDispatch } from 'react-tracked';

const Component = () => {
  const dispatch = useDispatch(); // simply to get the second one of the tuple
  // ...
};
```

### useSelector

```javascript
import { useSelector } from 'react-tracked';

const Component = () => {
  const selected = useSelector(selector); // same API in react-redux
  // ...
};
```

### useTrackedState

```javascript
import { useTrackedState } from 'react-tracked';

const Component = () => {
  const state = useTrackedState(); // same API in reactive-react-redux
  // ...
};
```

### useTracked

```javascript
import { useTracked } from 'react-tracked';

const Component = () => {
  const [state, dispatch] = useTracked(); // combination of useTrackedState and useDispatch
  // ...
};
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
[06](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/06_customhook)
[07](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/07_todolist)

## Related projects

<table>

<tr>
<th></th>
<th>Context value</th>
<th>Using subscriptions</th>
<th>Optimization for rendering big object</th>
<th>Dependencies</th>
<th>Package size</th>
</tr>

<tr>
<th><a href="https://github.com/dai-shi/react-tracked">react-tracked</a></th>
<td>state-based object</t3>
<td>Yes *1</td>
<td>Proxy-based tracking</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=react-tracked@0.4.0">1.5kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/diegohaz/constate">constate</a></th>
<td>state-based object</td>
<td>No</td>
<td>No (should use multiple contexts)</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=constate@1.1.1">296B</a></td>
</tr>

<tr>
<th><a href="https://github.com/jamiebuilds/unstated-next">unstated-next</a></th>
<td>state-based object</td>
<td>No</td>
<td>No (should use multiple contexts)</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=unstated-next@1.1.0">362B</a></td>
</tr>

<tr>
<th><a href="https://github.com/react-spring/zustand">zustand</a></th>
<td>N/A</td>
<td>Yes</td>
<td>Selector function</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=zustand@0.2.1">623B</a></td>
</tr>

<tr>
<th><a href="https://github.com/atlassian/react-sweet-state">react-sweet-state</a></th>
<td>state-based object</t3>
<td>Yes *3</td>
<td>Selector function</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=react-sweet-state@1.0.2">4.5kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/storeon/storeon">storeon</a></th>
<td>store</td>
<td>Yes</td>
<td>state names</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=storeon@0.8.5">337B</a></td>
</tr>

<tr>
<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
<td>state object</td>
<td>No *2</td>
<td>state names</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=react-hooks-global-state@0.14.0">913B</a></td>
</tr>

<tr>
<th><a href="https://github.com/reduxjs/react-redux">react-redux (hooks)</a></th>
<td>store</td>
<td>Yes</td>
<td>Selector function</td>
<td>Redux</td>
<td><a href="https://bundlephobia.com/result?p=react-redux@7.1.0">5.6kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/dai-shi/reactive-react-redux">reactive-react-redux</a></th>
<td>state-based object</t3>
<td>Yes *1</td>
<td>Proxy-based tracking</td>
<td>Redux</td>
<td><a href="https://bundlephobia.com/result?p=reactive-react-redux@4.0.0-beta.0">8.4kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/ctrlplusb/easy-peasy">easy-peasy</a></th>
<td>store</t3>
<td>Yes</td>
<td>Selector function</td>
<td>Redux, immer, and so on</td>
<td><a href="https://bundlephobia.com/result?p=easy-peasy@2.5.0">10.4kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/avkonst/react-use-state-x">react-use-state-x</a> *5</th>
<td>mutable reference to state object *4</t3>
<td>Yes</td>
<td>No (should use multiple contexts)</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=react-use-state-x@0.9.1">2.9kB</a></td>
</tr>

</table>

See [#1](https://github.com/dai-shi/react-tracked/issues/1) for details.

## Blogs

- [Super performant global state with React context and hooks](https://blog.axlight.com/posts/super-performant-global-state-with-react-context-and-hooks/)
- [Redux-less context-based useSelector hook that has same performance as React-Redux](https://blog.axlight.com/posts/benchmark-react-tracked/)
- [Four different approaches to non-Redux global state libraries](https://blog.axlight.com/posts/four-different-approaches-to-non-redux-global-state-libraries/)
- [What is state usage tracking? A novel approach to intuitive and performant global state with React hooks and Proxy](https://blog.axlight.com/posts/what-is-state-usage-tracking-a-novel-approach-to-intuitive-and-performant-api-with-react-hooks-and-proxy/)
- [How to use react-tracked: React hooks-oriented Todo List example](https://blog.axlight.com/posts/how-to-use-react-tracked-react-hooks-oriented-todo-list-example/)
- [Effortless render optimization with state usage tracking with React hooks](https://blog.axlight.com/posts/effortless-render-optimization-with-state-usage-tracking-with-react-hooks/)
