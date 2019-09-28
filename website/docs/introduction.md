---
id: introduction
title: Introduction
sidebar_label: Introduction
---

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
