import React from 'react';

import { Provider } from './store';
import TodoList from './TodoList';

const App = () => (
  <Provider>
    <TodoList />
  </Provider>
);

export default App;
