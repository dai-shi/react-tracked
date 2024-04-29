import { StrictMode } from 'react';

import { Provider } from './state';

import Counter from './counter';
import Person from './person';

const App = () => (
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
