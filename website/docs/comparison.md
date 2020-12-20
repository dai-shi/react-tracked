---
id: comparison
title: Comparison with other projects
sidebar_label: Comparison
---

There are several projects to provide global state management.
Let's compare with other projects.

## Notes about similarities and differences

Here describes simiarities and differences.

### Pure React

As we saw in [Quick Start](quick-start.md),
the way we use React Tracked's createContainer is pretty much the same
as pure React with context and hooks.

The difference is our effortless render optimization with `useTracked`.

### React Redux

Rect Redux provides [useSelector](https://react-redux.js.org/api/hooks#useselector) and it can be used to improve performance.

React Tracked can add automatic optimization with Proxies in two ways.

1. createTrackedSelector to create a hook for React Redux with state usage tracking
2. useSelectorWithTracking hook for selector with usage tracking

### Reactive React Redux

[Reactive React Redux](https://github.com/dai-shi/reactive-react-redux)
originally proposed `useTrackedState` hook in advance of React Tracked.

It also uses bleeding edge techniques to experiment for React Redux ecosystem.

### MobX React

[MobX](https://github.com/mobxjs/mobx) utilizes Proxies,
so the technique in the implementation is similar.
The easiness of the usage is similar too.

However, MobX is based on mutable states.
Whereas React Tracked is based on immutable states like Pure React and React Redux.

### Vue.js

[Vue](https://github.com/vuejs/vue) has nothing to do with React,
but it utilizes Proxies.
The spirit of the effortless render optimization
can be similar to the easiness of Vue.

## Benchmarks

We have done some benchmark tests.

<img alt="benchmark result" src="https://user-images.githubusercontent.com/490574/62705335-28f34300-ba28-11e9-84ea-8f785c445ff4.png" width="600" />

See [this](https://github.com/dai-shi/react-tracked/issues/1#issuecomment-519509857) for details.
