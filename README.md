[![logo](./website/static/img/react-tracked-logo.svg)](https://react-tracked.js.org)

# React Tracked

[![CI](https://img.shields.io/github/workflow/status/dai-shi/react-tracked/CI)](https://github.com/dai-shi/react-tracked/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/react-tracked)](https://www.npmjs.com/package/react-tracked)
[![size](https://img.shields.io/bundlephobia/minzip/react-tracked)](https://bundlephobia.com/result?p=react-tracked)
[![discord](https://img.shields.io/discord/627656437971288081)](https://discord.gg/MrQdmzd)

Simple and fast global state with React Context. Eliminate unnecessary re-renders without hassle.

Documentation site: https://react-tracked.js.org

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
