import React, { StrictMode } from 'react';

import { createContainer } from 'react-tracked';

import { useValue } from './state';
import Counter from './Counter';

const container1 = createContainer(useValue);
const container2 = createContainer(useValue);

const App: React.FC = () => (
  <StrictMode>
    <h1>First container</h1>
    <container1.Provider>
      <div>
        <Counter useTracked={container1.useTracked} />
        <Counter useTracked={container1.useTracked} />
      </div>
    </container1.Provider>
    <h1>Second container</h1>
    <container2.Provider>
      <div>
        <Counter useTracked={container2.useTracked} />
        <Counter useTracked={container2.useTracked} />
      </div>
    </container2.Provider>
  </StrictMode>
);

export default App;
