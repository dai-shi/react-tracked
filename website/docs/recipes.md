---
id: recipes
title: Recipes
sidebar_label: Recipes
---

React Tracked provides a primitive API,
and there are various ways to use it for apps.

## Recipes for createContainer

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
  const actions = useMemo(() => (
    { increment1, increment2 },
  ), [increment1, increment2]);
  return [count, actions];
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

## Recipes for useTracked and useTrackedState

The `useTracked` and `useTrackedState` hooks are useful as is,
but new hooks can also be created based on them.

### useTrackedSelector

Selector interface is useful to share selection logic.
You can create a selector hook with state usage tracking very easily.

```javascript
const useTrackedSelector = selector => selector(useTrackedState());
```

Note: This is different from `useSelector` which has no tracking support
and triggers re-render based on the ref equality of selected value.

### useTrackedByName (based on useState)

Sometimes, you might want to select a state by its property name.
Here's a custom hook to return a tuple `[value, setValue]` selected by a name.

```javascript
const useTrackedByName = (name) => {
  const [state, setState] = useTracked();
  const update = useCallback((newVal) => {
    setState(oldVal => ({
      ...oldVal,
      [name]: typeof newVal === 'function' ? newVal(oldVal[name]) : newVal,
    }));
  }, [name]);
  return [state[name], update];
};
```

### useTrackedWithImmer (based on useState)

Updating a property deep in a state object is troublesome.
Here's a custom hook to use [immer](https://github.com/immerjs/immer) for setState.

```javascript
import produce from 'immer';

const useTrackedWithImmer = () => {
  const [state, setState] = useTracked();
  const update = useCallback((updater) => {
    setState(oldVal => produce(oldVal, updater));
  }, []);
  return [state, update];
};
```

Note: This can also be done at `createContainer`.
