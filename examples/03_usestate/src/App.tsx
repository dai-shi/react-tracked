import * as React from 'react';
import { StrictMode } from 'react';

import { Provider } from './state';

import Counter from './Counter';
import Person from './Person';

const App: React.FC = () => (
  <StrictMode>
    <Provider>
      <h1>Counter</h1>
      <Counter />
      <Counter />
      <h1>Person</h1>
      <Person />
      <Person />
    </Provider>
  </StrictMode>
);

export default App;
