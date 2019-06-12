import * as React from 'react';
import { StrictMode } from 'react';

import { TrackedProvider } from 'react-tracked';

import { useValue } from './state';

import Counter from './Counter';
import Person from './Person';

const App = () => (
  <StrictMode>
    <TrackedProvider useValue={useValue}>
      <h1>Counter</h1>
      <Counter />
      <Counter />
      <h1>Person</h1>
      <Person />
      <Person />
    </TrackedProvider>
  </StrictMode>
);

export default App;
