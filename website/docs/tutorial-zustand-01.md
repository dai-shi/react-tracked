---
id: tutorial-zustand-01
title: Tutorial with zustand - Person Name
sidebar_label: Person Name (zustand)
---

This tutorial shows tiny example code with zustand.
There are two variants.
The first one is with useStore.
The second one is with useTrackedStore.

## With useStore

```typescript ts2js
import * as React from "react";
import { useState } from "react";
import create from "zustand";

type State = {
  firstName: string;
  lastName: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
};

const useStore = create<State>((set) => ({
  firstName: "React",
  lastName: "Tracked",
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName })
}));

const EditPerson = () => {
  const firstName = useStore((state) => state.firstName);
  const lastName = useStore((state) => state.lastName);
  const setFirstName = useStore((state) => state.setFirstName);
  const setLastName = useStore((state) => state.setLastName);
  return (
    <div>
      <div>
        First Name:
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        Last Name:
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
    </div>
  );
};

const ShowPerson = () => {
  const [onlyFirstName, setOnlyFirstName] = useState(false);
  const firstName = useStore((state) => state.firstName);
  const lastName = useStore((state) => (onlyFirstName ? null : state.lastName));
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

const App = () => {
  return (
    <>
      <EditPerson />
      <ShowPerson />
    </>
  );
};

export default App;
```

It's a bit tricky to make a selector conditional.

[CodeSandbox](https://codesandbox.io/s/react-typescript-forked-y9bqu)

## With useTrackedStore

```typescript ts2js
import * as React from "react";
import { useState } from "react";
import create from "zustand";
import { createTrackedSelector } from "react-tracked";

type State = {
  firstName: string;
  lastName: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
};

const useStore = create<State>((set) => ({
  firstName: "React",
  lastName: "Tracked",
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName })
}));

const useTrackedStore = createTrackedSelector(useStore);

const EditPerson = () => {
  const state = useTrackedStore();
  return (
    <div>
      <div>
        First Name:
        <input
          value={state.firstName}
          onChange={(e) => state.setFirstName(e.target.value)}
        />
      </div>
      <div>
        Last Name:
        <input
          value={state.lastName}
          onChange={(e) => state.setLastName(e.target.value)}
        />
      </div>
    </div>
  );
};

const ShowPerson = () => {
  const state = useTrackedStore();
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

const App = () => {
  return (
    <>
      <EditPerson />
      <ShowPerson />
    </>
  );
};

export default App;
```

This works just the same without the tricky selector.

[CodeSandbox](https://codesandbox.io/s/react-typescript-forked-drjcl)
