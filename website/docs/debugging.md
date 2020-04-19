---
id: debugging
title: Debugging
sidebar_label: Debugging
---

import useBaseUrl from '@docusaurus/useBaseUrl';

React Tracked uses native React state and context,
and the debugging method is basically the same as pure React.

## React DevTools

React officially provides its DevTools
[[1]](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
[[2]](https://github.com/facebook/react/tree/master/packages/react-devtools).

Basically, you can use the tool just like a pure React app.
One note with React Tracked is that a state object stays
in the Provider component.

For example, if you create a container like this,

```js
const useValue = () => useReducer(reducer, initialState);
export const { Provider, useTracked } = createContainer(useValue);
```

your state will be in Provider / Value / Reducer.

<img alt="screenshot 1" src={useBaseUrl('img/devtools_screen1.png')} />

## useTrackedState (AffectedDebugValue)

The very specific usage of the DevTools is for `useTrackedState`.
In the development mode, the tracked path list of a state
can be investigated with `AffectedDebugValue`.

Find it under TrackedState / TrackedState / AffectedDebugValue / DebugValue.

<img alt="screenshot 2" src={useBaseUrl('img/devtools_screen2.png')} />

## useSelector

If you are using `useSelector`, you can use `useDebugValue` on your end.
For example, the following is to show a selected value in the DevTools.

```javascript
const selectPerson = state => state.person;
const Person = () => {
  const person = useSelector(selectPerson);
  useDebugValue(person);
  ...
};
```

## Naive logging

If you prefer console.log style debugging,
here's a recipe for that.

```javascript
const reducer = ...;
const initialState = ...;

const useValue = () => {
  const [state, dispatch] = useReducer(reducer, null, init);
  useEffect(() => {
    console.log('state', state);
  }, [state]);
  const dispatchWithLogging = useCallback((action) => {
    console.log('action', action);
    dispatch(action);
  }, []);
  return [state, dispatchWithLogging];
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
