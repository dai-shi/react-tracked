[![logo](./website/static/img/react-tracked-logo.svg)](https://react-tracked.js.org)

# React Tracked

[![CI](https://img.shields.io/github/workflow/status/dai-shi/react-tracked/CI)](https://github.com/dai-shi/react-tracked/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/react-tracked)](https://www.npmjs.com/package/react-tracked)
[![size](https://img.shields.io/bundlephobia/minzip/react-tracked)](https://bundlephobia.com/result?p=react-tracked)
[![discord](https://img.shields.io/discord/627656437971288081)](https://discord.gg/MrQdmzd)

State usage tracking with Proxies. Optimize re-renders for useState/useReducer, React Redux, Zustand and others.

Documentation site: https://react-tracked.js.org

## Introduction

Preventing re-renders is one of performance issues in React.
Smaller apps wouldn't usually suffer from such a performance issue,
but once apps have a central global state that would be used in
many components. The performance issue would become a problem.
For example, Redux is usually used for a single global state,
and React-Redux provides a selector interface to solve the performance issue.
Selectors are useful to structure state accessor,
however, using selectors only for performance wouldn't be the best fit.
Selectors for performance require understanding object reference
equality which is non-trival for beginners and
experts would still have difficulties for complex structures.

React Tracked is a library to provide so-called "state usage tracking."
It's a technique to track property access of a state object,
and only triggers re-renders if the accessed property is changed.
Technically, it uses Proxies underneath, and it works not only for
the root level of the object but also for deep nested objects.

Prior to v1.6.0, React Tracked is a library to replace React Context
use cases for global state. React hook useContext triggers re-renders
whenever a small part of state object is changed, and it would cause
performance issues pretty easily. React Tracked provides an API
that is very similar to useContext-style global state.

Since v1.6.0, it provides another building-block API
which is capable to create a "state usage tracking" hooks
from any selector interface hooks.
It can be used with React-Redux useSelector, and any other libraries
that provide useSelector-like hooks.

## Install

```bash
npm install react-tracked
```

## Usage

There are two main APIs `createContainer` and `createTrackedSelector`.
Both take a hook as an input and return a hook (or a container including a hook).

There could be various use cases. Here are some typical ones.

### createContainer / useState

#### Define a `useValue` custom hook

```js
import { useState } from 'react';

const useValue = () => useState({
  count: 0,
  text: 'hello',
});
```

This can be useReducer or any hook that returns a tuple `[state, dispatch]`.

#### Create a container

```js
import { createContainer } from 'react-tracked';

const { Provider, useTracked } = createContainer(useValue);
```

#### useTracked in a component

```jsx
const Counter = () => {
  const [state, setState] = useTracked();
  const increment = () => {
    setState((prev) => ({
      ...prev,
      count: prev.count + 1,
    });
  };
  return (
    <div>
      <span>Count: {state.count}</span>
      <button type="button" onClick={increment}>+1</button>
    </div>
  );
};
```

The `useTracked` hook returns a tuple that `useValue` returns,
except that the first is the state wrapped by proxies and
the second part is a wrapped function for a reason.

Thanks to proxies, the property access in render is tracked and
this component will re-render only if `state.count` is changed.

#### Wrap your App with Provider

```jsx
const App = () => (
  <Provider>
    <Counter />
    <TextBox />
  </Provider>
);
```

### createTrackedSelector / react-redux

#### Create `useTrackedSelector` from `useSelector`

```js
import { useSelector, useDispatch } from 'react-redux';
import { createTrackedSelector } from 'react-tracked';

const useTrackedSelector = createTrackedSelector(useSelector);
```

#### useTrackedSelector in a component

```jsx
const Counter = () => {
  const state = useTrackedSelector();
  const dispatch = useDispatch();
  return (
    <div>
      <span>Count: {state.count}</span>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
    </div>
  );
};
```

### createTrackedSelector / zustand

#### Create useStore

```js
import create from 'zustand';

const useStore = create(() => ({ count: 0 }));
```

#### Create `useTrackedStore` from `useStore`

```js
import { createTrackedSelector } from 'react-tracked';

const useTrackedStore = createTrackedSelector(useStore);
```

#### useStore in a component

```jsx
const Counter = () => {
  const state = useTrackedStore();
  const increment = () => {
    useStore.setState(prev => ({ count: prev.count + 1 }));
  };
  return (
    <div>
      <span>Count: {state.count}</span>
      <button type="button" onClick={increment}>+1</button>
    </div>
  );
};
```

## API

[docs/api](./website/docs/api.md)

## Recipes

[docs/recipes](./website/docs/recipes.md)

## Caveats

[docs/caveats](./website/docs/caveats.md)

## Related projects

[docs/comparison](./website/docs/comparison.md)

<https://github.com/dai-shi/lets-compare-global-state-with-react-hooks>

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:01_minimal
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
[09](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/09_reactmemo)
[10](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/10_untracked)
[11](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/11_form)
[12](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/12_async)
[13](https://codesandbox.io/s/github/dai-shi/react-tracked/tree/master/examples/13_saga)

## Benchmarks

See [this](https://github.com/dai-shi/react-tracked/issues/1#issuecomment-519509857) for details.

## Blogs

- [Super performant global state with React context and hooks](https://blog.axlight.com/posts/super-performant-global-state-with-react-context-and-hooks/)
- [Redux-less context-based useSelector hook that has same performance as React-Redux](https://blog.axlight.com/posts/benchmark-react-tracked/)
- [Four different approaches to non-Redux global state libraries](https://blog.axlight.com/posts/four-different-approaches-to-non-redux-global-state-libraries/)
- [What is state usage tracking? A novel approach to intuitive and performant global state with React hooks and Proxy](https://blog.axlight.com/posts/what-is-state-usage-tracking-a-novel-approach-to-intuitive-and-performant-api-with-react-hooks-and-proxy/)
- [How to use react-tracked: React hooks-oriented Todo List example](https://blog.axlight.com/posts/how-to-use-react-tracked-react-hooks-oriented-todo-list-example/)
- [Effortless render optimization with state usage tracking with React hooks](https://blog.axlight.com/posts/effortless-render-optimization-with-state-usage-tracking-with-react-hooks/)
- [4 options to prevent extra rerenders with React context](https://blog.axlight.com/posts/4-options-to-prevent-extra-rerenders-with-react-context/)
- [React Tracked Documentation Website with Docusaurus v2](https://blog.axlight.com/posts/react-tracked-documentation-website-with-docusaurus-v2/)
