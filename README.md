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

The following shows a minimal example.
Please check out others in the [examples](examples) folder.

```javascript
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'react-tracked';

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState);
const { Provider, useTracked } = createContainer(useValue);

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
  <Provider reducer={reducer} initialState={initialState}>
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

## API

There's only one function exported from the library.
This `createContainer` creates a provider and other hooks.

### createContainer

It takes one argument `useValue`,
which is a hook that returns a tuple `[state, update]`.
Typically, it's with useReducer and useState,
but it can be any custom hooks based on them.

Note: you can create multiple containers in one app.

```javascript
import { createContainer } from 'react-tracked';

const useValue = (props) => useReducer(...);

const {
  Provider,
  useTracked,
  useUpdate,
  useTrackedState,
  useSelector,
} = createContainer(useValue);
```

### Provider

The `Provider` returned by createContainer has to be put
in the parent component.
Typically, it's close to the root component,
but it can be (sometimes desirably) lower in the component tree.

```javascript
const App = (props) => (
  <Provider {...props}>
    ...
  </Provider>
);
```

### useTracked

The `useTracked` hook returned by createContainer is the recommended hook.
It simply returns the `[state, update]` tuple that `useValue` returns.
The `state` is wrapped by Proxy for usage tracking.

```javascript
const Component = () => {
  const [state, dispatch] = useTracked();
  // ...
};
```

### useUpdate

The `useUpdate` hook returned by createContainer is for `update` from `useValue`;
It's named "update" ambiguously, but typically
it would be renamed to "dispatch" for useReducer,
"setState" for useState, or "actions" for any actions.

```javascript
const Component = () => {
  const dispatch = useUpdate();
  // ...
};
```

### useTrackedState

The `useTrackedState` hook returned by createContainer is for `state` from `useValue`;
This is wrapped by Proxy as same as `useTracked`.
Use this hook if you don't need `update`.
This hook is compatible with [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux).

```javascript
const Component = () => {
  const state = useTrackedState();
  // ...
};
```

### useSelector

The `useSelector` hook returned by createContainer is an optional hook.
Use this hook if state usage tracking doesn't work or fit well.
This hook is compatible with [react-redux](https://react-redux.js.org/api/hooks).
It would ease transition from/to react-redux apps.

```javascript
const Component = () => {
  const selected = useSelector(selector);
  // ...
};
```

## Recipes

The argument `useValue` in `createContainer` is so flexible
and there are various usages.

### useReducer (props)

This is the most typical usage.
You define a generic reducer and pass `reducer` and `initialState` as props.

```javascript
const {
  Provider,
  useTracked,
  // ...
} = createContainer(({ reducer, initialState, init }) => useReducer(reducer, initialState, init));

const reducer = ...;

const App = ({ initialState }) => (
  <Provider reducer={reducer} initialState={initialState}>
    ...
  </Provider>
);
```

### useReducer (embedded)

For most cases, you would have a static reducer.
In this case, define useValue with the reducer in advance.
The `initialState` can be defined in useValue like the following example,
or can be taken from props: `({ initialState }) => useReducer(...)`

This is good for TypeScript because the hooks returned by `createContainer` is already typed.

```javascript
const reducer = ...;
const initialState = ...;

const {
  Provider,
  useTracked,
  // ...
} = createContainer(() => useReducer(reducer, initialState));


const App = () => (
  <Provider>
    ...
  </Provider>
);
```

### useState (props)

If you don't need reducer, useState would be simpler.

```javascript
const {
  Provider,
  useTracked,
  // ...
} = createContainer(({ initialState }) => useState(initialState);


const App = ({ initialState }) => (
  <Provider initialState={initialState}>
    ...
  </Provider>
);
```

### useState (empty object)

You could even start with completely an empty object.

This might not be TypeScript friendly. Although, you could do this: `useState<State>({})`

```javascript
const {
  Provider,
  useTracked,
  // ...
} = createContainer(() => useState({});


const App = () => (
  <Provider>
    ...
  </Provider>
);
```

### useState (custom actions)

Finally, you can use a custom hook.
The `update` can be anything, so for example it can be a set of action functions.

```javascript
const useValue = () => {
  const [state, setState] = useState({ count1: 0, count2: 0 });
  const increment1 = () => {
    setCount(s => ({ ...s, count1: s.count1 + 1 });
  };
  const increment2 = () => {
    setCount(s => ({ ...s, count2: s.count2 + 2 });
  };
  return [count, { increment1, increment2 }];
};

const {
  Provider,
  useTracked,
  // ...
} = createContainer(useValue);


const App = () => (
  <Provider>
    ...
  </Provider>
);
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
[08](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/08_comparison)

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
<td><a href="https://bundlephobia.com/result?p=react-tracked@0.7.0">1.5kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/diegohaz/constate">constate</a></th>
<td>state-based object</td>
<td>No</td>
<td>No (should use multiple contexts)</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=constate@1.2.0">329B</a></td>
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
<td><a href="https://bundlephobia.com/result?p=zustand@1.0.3">742B</a></td>
</tr>

<tr>
<th><a href="https://github.com/atlassian/react-sweet-state">react-sweet-state</a></th>
<td>state-based object</t3>
<td>Yes *3</td>
<td>Selector function</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=react-sweet-state@1.0.4">4.5kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/storeon/storeon">storeon</a></th>
<td>store</td>
<td>Yes</td>
<td>state names</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=storeon@0.9.4">337B</a></td>
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
<td><a href="https://bundlephobia.com/result?p=reactive-react-redux@4.2.0">1.4kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/ctrlplusb/easy-peasy">easy-peasy</a></th>
<td>store</t3>
<td>Yes</td>
<td>Selector function</td>
<td>Redux, immer, and so on</td>
<td><a href="https://bundlephobia.com/result?p=easy-peasy@3.0.1">9.5kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/mobxjs/mobx-react-lite">mobx-react-lite</a></th>
<td>mutable state object</t3>
<td>No *4</td>
<td>Proxy-based tracking</td>
<td>MobX</td>
<td><a href="https://bundlephobia.com/result?p=mobx-react-lite@1.4.1">1.7kB</a></td>
</tr>

<tr>
<th><a href="https://github.com/avkonst/hookstate">hookstate</a></th>
<td>N/A</t3>
<td>Yes</td>
<td>Proxy-based tracking</td>
<td>No</td>
<td><a href="https://bundlephobia.com/result?p=@hookstate/core@0.10.1">2.6kB</a></td>
</tr>

</table>

- *1 Stops context propagation by `calculateChangedBits=0`
- *2 Uses `observedBits`
- *3 Hack with readContext
- *4 Mutation trapped by Proxy triggers re-render

## Blogs

- [Super performant global state with React context and hooks](https://blog.axlight.com/posts/super-performant-global-state-with-react-context-and-hooks/)
- [Redux-less context-based useSelector hook that has same performance as React-Redux](https://blog.axlight.com/posts/benchmark-react-tracked/)
- [Four different approaches to non-Redux global state libraries](https://blog.axlight.com/posts/four-different-approaches-to-non-redux-global-state-libraries/)
- [What is state usage tracking? A novel approach to intuitive and performant global state with React hooks and Proxy](https://blog.axlight.com/posts/what-is-state-usage-tracking-a-novel-approach-to-intuitive-and-performant-api-with-react-hooks-and-proxy/)
- [How to use react-tracked: React hooks-oriented Todo List example](https://blog.axlight.com/posts/how-to-use-react-tracked-react-hooks-oriented-todo-list-example/)
- [Effortless render optimization with state usage tracking with React hooks](https://blog.axlight.com/posts/effortless-render-optimization-with-state-usage-tracking-with-react-hooks/)
- [4 options to prevent extra rerenders with React context](https://blog.axlight.com/posts/4-options-to-prevent-extra-rerenders-with-react-context/)
