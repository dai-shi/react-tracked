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

You should use `useTrackedState` only once in a component
if you need referential equality of objects in the state.

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

You need to use a special `memo` provided by this library.

```javascript
import { memo } from 'react-tracked';

const Child = memo(({ foo }) => {
  // ...
};
```

## Proxied state might behave unexpectedly outside render

Proxies are basically transparent, and it should behave like normal objects.
However, there can be edge cases where it behaves unexpectedly.
For example, if you console.log a proxied value,
it will display a proxy wrapping an object.
Notice, it will be kept tracking outside render,
so any prorerty access will mark as used to trigger re-render on updates.

useTrackedState will unwrap a Proxy before wrapping with a new Proxy,
hence, it will work fine in usual use cases.
There's only one known pitfall: If you wrap proxied state with your own Proxy
outside the control of useTrackedState,
it might lead memory leaks, because useTrackedState
wouldn't know how to unwrap your own Proxy.

To work around such edge cases, the first option is to use primitive values.

```javascript
const state = useTrackedState();
const dispatch = useUpdate();
dispatch({ type: 'FOO', value: state.fooObj }); // Instead of using objects,
dispatch({ type: 'FOO', value: state.fooStr }); // Use primitives.
```

The second option is to use `getUntrackedObject`.

```javascript
import { getUntrackedObject } from 'react-tracked';

dispatch({ type: 'FOO', value: getUntrackedObject(state.fooObj) });
```

You could implement a special dispatch function to do this automatically.
Check out [examples/10_untracked/src/store.ts](https://github.com/dai-shi/react-tracked/blob/master/examples/10_untracked/src/store.ts) for a concrate example.
