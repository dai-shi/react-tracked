import * as React from 'react';
import { StrictMode } from 'react';

import { Provider } from './state';

import MainApp from './components/App';

const App = () => (
  <StrictMode>
    <Provider>
      <MainApp />
    </Provider>
  </StrictMode>
);

export default App;
