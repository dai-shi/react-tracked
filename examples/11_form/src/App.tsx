import React, { StrictMode } from 'react';

import PersonForm from './PersonForm';

const App: React.FC = () => (
  <StrictMode>
    <PersonForm />
    <div>
      <a href="https://codesandbox.io/s/react-form-library-stress-test-4luf3">Stress Test</a>
    </div>
  </StrictMode>
);

export default App;
