import * as React from 'react';
import { StrictMode } from 'react';

import { createContainer } from 'react-tracked';

import { useValue, initialState } from './state';
import Counter from './Counter';

const container1 = createContainer(useValue);
const container2 = createContainer(useValue);

const App = () => (
  <StrictMode>
    <h1>First container</h1>
    <container1.Provider initialState={initialState}>
      <Counter useTracked={container1.useTracked} />
      <Counter useTracked={container1.useTracked} />
    </container1.Provider>
    <h1>Second container</h1>
    <container2.Provider initialState={initialState}>
      <Counter useTracked={container2.useTracked} />
      <Counter useTracked={container2.useTracked} />
    </container2.Provider>
  </StrictMode>
);

export default App;
