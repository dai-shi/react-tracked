---
id: tutorial-redux-01
title: Tutorial with react-redux - Person Name
sidebar_label: Person Name (redux)
---

This tutorial shows tiny example code with react-redux.
There are two variants.
The first one is with useSelector.
The second one is with useTrackedSelector.

## With useSelector

```typescript ts2js
import * as React from "react";
import { useState } from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

const initialState = {
  firstName: "React",
  lastName: "Tracked"
};

type State = typeof initialState;

type Action =
  | { type: "setFirstName"; firstName: string }
  | { type: "setLastName"; lastName: string };

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "setFirstName":
      return { ...state, firstName: action.firstName };
    case "setLastName":
      return { ...state, lastName: action.lastName };
    default:
      return state;
  }
};

const store = createStore(reducer);

const EditPerson: React.FC = () => {
  const dispatch = useDispatch();
  const firstName = useSelector((state: State) => state.firstName);
  const lastName = useSelector((state: State) => state.lastName);
  const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value;
    dispatch({ type: "setFirstName", firstName });
  };
  const setLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value;
    dispatch({ type: "setLastName", lastName });
  };
  return (
    <div>
      <div>
        First Name:
        <input value={firstName} onChange={setFirstName} />
      </div>
      <div>
        Last Name:
        <input value={lastName} onChange={setLastName} />
      </div>
    </div>
  );
};

const ShowPerson: React.FC = () => {
  const [onlyFirstName, setOnlyFirstName] = useState(false);
  const firstName = useSelector((state: State) => state.firstName);
  const lastName = useSelector((state: State) =>
    onlyFirstName ? null : state.lastName
  );
  return (
    <div>
      <button type="button" onClick={() => setOnlyFirstName((s) => !s)}>
        {onlyFirstName ? "Showing only first name" : "Showing full name"}
      </button>
      {onlyFirstName ? (
        <div>First Name: {firstName}</div>
      ) : (
        <div>
          Full Name: {firstName} {lastName}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <EditPerson />
      <ShowPerson />
    </Provider>
  );
};

export default App;
```

It's a bit tricky to make a selector conditional.

[CodeSandbox](https://codesandbox.io/s/react-typescript-forked-r9kw1)

## With useTrackedSelector

```typescript ts2js
import * as React from "react";
import { useState } from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createTrackedSelector } from "react-tracked";

const initialState = {
  firstName: "React",
  lastName: "Tracked"
};

type State = typeof initialState;

type Action =
  | { type: "setFirstName"; firstName: string }
  | { type: "setLastName"; lastName: string };

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "setFirstName":
      return { ...state, firstName: action.firstName };
    case "setLastName":
      return { ...state, lastName: action.lastName };
    default:
      return state;
  }
};

const store = createStore(reducer);

const useTrackedSelector = createTrackedSelector<State>(useSelector);

const EditPerson: React.FC = () => {
  const dispatch = useDispatch();
  const state = useTrackedSelector();
  const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value;
    dispatch({ type: "setFirstName", firstName });
  };
  const setLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value;
    dispatch({ type: "setLastName", lastName });
  };
  return (
    <div>
      <div>
        First Name:
        <input value={state.firstName} onChange={setFirstName} />
      </div>
      <div>
        Last Name:
        <input value={state.lastName} onChange={setLastName} />
      </div>
    </div>
  );
};

const ShowPerson: React.FC = () => {
  const state = useTrackedSelector();
  const [onlyFirstName, setOnlyFirstName] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOnlyFirstName((s) => !s)}>
        {onlyFirstName ? "Showing only first name" : "Showing full name"}
      </button>
      {onlyFirstName ? (
        <div>First Name: {state.firstName}</div>
      ) : (
        <div>
          Full Name: {state.firstName} {state.lastName}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <EditPerson />
      <ShowPerson />
    </Provider>
  );
};

export default App;
```

This works just the same without the tricky selector.

[CodeSandbox](https://codesandbox.io/s/react-typescript-forked-n2olx)
