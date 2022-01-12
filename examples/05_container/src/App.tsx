import React, { StrictMode } from 'react';

import { createContainer } from 'react-tracked';

import { useValue } from './state';
import Counter from './Counter';

const container1 = createContainer(useValue, { concurrentMode: true });
const container2 = createContainer(useValue, { concurrentMode: true });

const App: React.FC = () => (
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
