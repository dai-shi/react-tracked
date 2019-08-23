import * as React from 'react';
import { StrictMode } from 'react';

import { Provider } from 'react-tracked';

import { initialState, useValue } from './state';

import MainApp from './components/App';

const App = () => (
  <StrictMode>
    <Provider useValue={useValue} initialState={initialState}>
      <MainApp />
    </Provider>
  </StrictMode>
);

export default App;
