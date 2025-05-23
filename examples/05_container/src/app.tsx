/* eslint-disable react-hooks/react-compiler */

import { StrictMode } from 'react';

import { createContainer } from 'react-tracked';

import { useValue } from './state';
import Counter from './counter';

const container1 = createContainer(useValue, { concurrentMode: true });
const container2 = createContainer(useValue, { concurrentMode: true });

const App = () => (
  <StrictMode>
    <h1>First container</h1>
    <container1.Provider>
      <Counter useTracked={container1.useTracked} />
      <Counter useTracked={container1.useTracked} />
    </container1.Provider>
    <h1>Second container</h1>
    <container2.Provider>
      <Counter useTracked={container2.useTracked} />
      <Counter useTracked={container2.useTracked} />
    </container2.Provider>
  </StrictMode>
);

export default App;
