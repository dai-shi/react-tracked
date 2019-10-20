import * as React from 'react';

import { Provider } from './store';
import Main from './Main';

const App: React.FC = () => (
  <Provider>
    <Main />
  </Provider>
);

export default App;
