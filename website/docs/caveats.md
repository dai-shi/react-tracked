---
id: caveats
title: Caveats
sidebar_label: Caveats
---

Proxy and state usage tracking may not work 100% as expected.
There are some limitations and workarounds.

## Proxied states are referentially equal only in per-hook basis

```javascript
const state1 = useTrackedState();
const state2 = useTrackedState();
// state1 and state2 is not referentially equal
// even if the underlying state is referentially equal.
```

You should use `useTrackedState` only once in a component.

## An object referential change doesn't trigger re-render if an property of the object is accessed in previous render

```javascript
const state = useTrackedState();
const { foo } = state;
return <Child key={foo.id} foo={foo} />;

const Child = React.memo(({ foo }) => {
  // ...
};
// if foo doesn't change, Child won't render, so foo.id is only marked as used.
// it won't trigger Child to re-render even if foo is changed.
```

You need to explicitly notify an object as used in a memoized component.

```javascript
import { trackMemo } from 'react-tracked';

const Child = React.memo(({ foo }) => {
  trackMemo(foo);
  // ...
};
```

## Proxied state shouldn't be used outside of render

```javascript
const state = useTrackedState();
const dispatch = useUpdate();
dispatch({ type: 'FOO', value: state.foo }); // This may lead unexpected behavior if state.foo is an object
dispatch({ type: 'FOO', value: state.fooStr }); // This is OK if state.fooStr is a string
```

You should use primitive values for `dispatch`, `setState` and others.
