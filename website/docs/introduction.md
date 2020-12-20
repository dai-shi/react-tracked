---
id: introduction
title: Introduction
sidebar_label: Introduction
---

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
