---
id: tutorial-01
title: Tutorial with createContainer - Person Name with useState
sidebar_label: Person Name (useState)
---

This tutorial shows tiny example code with useState.

## src/App.js

```typescript ts2js
import React from 'react';

import { Provider } from './store';
import EditPerson from './EditPerson';
import ShowPerson from './ShowPerson';

const App = () => (
  <Provider>
    <EditPerson />
    <ShowPerson />
  </Provider>
);

export default App;
```

This is the root component.

## src/store.js

```typescript ts2js
import { useState } from 'react';
import { createContainer } from 'react-tracked';

export type State = {
  firstName?: string;
  lastName?: string;
};

const useValue = () => useState<State>({});

export const {
  Provider,
  useTrackedState,
  useUpdate: useSetState,
} = createContainer(useValue);
```

The store is created by useState.
useUpdate is renamed to useSetState for exporting.

## src/EditPerson.js

```typescript ts2js
import React from 'react';

import { useSetState, useTrackedState } from './store';

const EditPerson = () => {
  const setState = useSetState();
  const state = useTrackedState();
  const setFirstName = (e) => {
    const firstName = e.target.value;
    setState(prev => ({ ...prev, firstName }));
  };
  const setLastName = (e) => {
    const lastName = e.target.value;
    setState(prev => ({ ...prev, lastName }));
  };
  return (
    <div>
      <div>
        First Name:
        <input value={state.firstName || ''} onChange={setFirstName} />
      </div>
      <div>
        Last Name:
        <input value={state.lastName || ''} onChange={setLastName} />
      </div>
    </div>
  );
};

export default EditPerson;
```

This component is to edit person object.

## src/ShowPerson.js

```typescript ts2js
import React, { useState } from 'react';

import { useDispatch, useTrackedState } from './store';
import { useFlasher } from './utils';

const ShowPerson = () => {
  const state = useTrackedState();
  const [onlyFirstName, setOnlyFirstName] = useState(false);
  return (
    <div ref={useFlasher()}>
      <button type="button" onClick={() => setOnlyFirstName(s => !s)}>
        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}
      </button>
      {onlyFirstName ? (
        <div>
          First Name: {state.firstName}
        </div>
      ) : (
        <div>
          Full Name: {state.firstName} {state.lastName}
        </div>
      )}
    </div>
  );
};

export default ShowPerson;
```

This is the ShowPerson component.
It shows only first name or full name.

## src/utils.js

```typescript ts2js
import { useRef, useEffect } from 'react';

export const useFlasher = () => {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.setAttribute(
      'style',
      'box-shadow: 0 0 2px 1px red; transition: box-shadow 100ms ease-out;'
    );
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.setAttribute('style', '');
    }, 300);
  });
  return ref;
};
```

This is a utility function to show which components render.

## CodeSandbox

You can try [working example](https://codesandbox.io/s/recursing-chatterjee-rlw9s).
