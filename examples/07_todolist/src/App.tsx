import React, { StrictMode } from 'react';

import { Provider } from './state';

import MainApp from './components/App';

const App: React.FC = () => (
  <StrictMode>
    <Provider>
      <MainApp />
    </Provider>
  </StrictMode>
);

export default App;
