import React, { useState } from 'react';

import { useTracked } from './state';

let numRendered = 0;

const Person: React.FC = () => {
  const [mode, setMode] = useState<'first' | 'last'>('first');
  const [state, dispatch] = useTracked();
  return (
    <div>
      numRendered: {++numRendered}
      {mode === 'first' && (
        <div>
          First Name:
          <input
            value={state.person.firstName}
            onChange={(event) => {
              const firstName = event.target.value;
              dispatch({ firstName, type: 'setFirstName' });
            }}
          />
          <button type="button" onClick={() => setMode('last')}>toggle</button>
        </div>
      )}
      {mode === 'last' && (
        <div>
          Last Name:
          <input
            value={state.person.lastName}
            onChange={(event) => {
              const lastName = event.target.value;
              dispatch({ lastName, type: 'setLastName' });
            }}
          />
          <button type="button" onClick={() => setMode('first')}>toggle</button>
        </div>
      )}
      <div>
        Age:
        <input
          value={state.person.age}
          onChange={(event) => {
            const age = Number(event.target.value) || 0;
            dispatch({ age, type: 'setAge' });
          }}
        />
      </div>
    </div>
  );
};

export default Person;
