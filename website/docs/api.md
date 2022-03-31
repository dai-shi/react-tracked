---
id: api
title: API
sidebar_label: API
---

There are two main functions exported from the library,
`createContainer` and `createTrackedSelector`.

`createTrackedSelector` is a building block function
which takes a `useSelector` hook and creates a `useTrackedSelector` hook.

`createContainer` is a higher level function for React Context-like usage,
which creates a provider and other hooks.

## createTrackedSelector

This is a function to create a hook with state usage tracking.
It takes one argument `useSelector`, which is provided by
[react-redux](https://react-redux.js.org/api/hooks) or
any other hooks with the same signature and behavior.

The created hook `useTrackedSelector` (or whatever named)
is a hook that returns `state` wrapped by Proxies for usage tracking.
It behaves the same as [useTrackedState](#usetrackedstate) from `createContainer`.

```javascript
import { useSelector } from 'react-redux'; // or any similar library
import { createTrackedSelector } from 'react-tracked';

const useTrackedSelector = createTrackedSelector(useSelector);

const Component = () => {
  const state = useTrackedSelector();
  // ...
};
```

## createContainer

It takes two arguments, the first argument is `useValue`,
which is a hook that returns a tuple `[state, update]`.
Typically, it's with useReducer or useState,
but it can be any custom hooks based on them.

The second argument is `options`.

```ts
type Options = {
  defaultState?: State;
  defaultUpdate?: Update;
  stateContextName?: string;
  updateContextName?: string;
  concurrentMode?: boolean;
}
```

- `defaultState` and `defaultUpdate` are to specify context default values in case you want something without Provider.
- `stateContextName` and `updateContextName` are to specify context display names.
- `concurrentMode` is to enable using `useContextUpdate` from `use-context-selector` for concurrent features, available since React 18.

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
The `state` is wrapped by Proxies for usage tracking.

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
"setState" for useState, or any "update" function.

```javascript
const Component = () => {
  const dispatch = useUpdate();
  // ...
};
```

### useTrackedState

The `useTrackedState` hook returned by createContainer is for `state` from `useValue`;
This is wrapped by Proxies as same as `useTracked`.
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

## memo

There is a utility function exported from the library.

This should be used instead of `React.memo` if props
include objects being tracked. Otherwise, usage tracking may not
work correctly because a memoized component doesn't always render
when a parent component renders.

```javascript
import { memo } from 'react-tracked';

const ChildComponent = memo(({ num1, str1, obj1, obj2 }) => {
  // ...
});
```

## getUntrackedObject

There are some cases when we need to get an original object
instead of a tracked object.
Although it's not a recommended pattern,
the library exports a function as an escape hatch.

```javascript
import { getUntrackedObject } from 'react-tracked';

const Component = () => {
  const state = useTrackedState();
  const dispatch = useUpdate();
  const onClick = () => {
    // this leaks a proxy outside render
    dispatch({ type: 'FOO', value: state.foo });

    // this works as expected
    dispatch({ type: 'FOO', value: getUntrackedObject(state.foo) });
  };
  // ...
};
```
