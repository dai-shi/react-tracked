---
id: api
title: API
sidebar_label: API
---

There's only one function exported from the library.
This `createContainer` creates a provider and other hooks.

## createContainer

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
