import * as React from 'react';

import { useTracked } from './state';

const Person = () => {
  const [state, setState] = useTracked();
  return (
    <div>
      {Math.random()}
      <div>
        First Name:
        <input
          value={state.person.firstName}
          onChange={(event) => {
            const firstName = event.target.value;
            setState(s => ({
              ...s,
              person: {
                ...s.person,
                firstName,
              },
            }));
          }}
        />
      </div>
      <div>
        Last Name:
        <input
          value={state.person.lastName}
          onChange={(event) => {
            const lastName = event.target.value;
            setState(s => ({
              ...s,
              person: {
                ...s.person,
                lastName,
              },
            }));
          }}
        />
      </div>
      <div>
        Age:
        <input
          value={state.person.age}
          onChange={(event) => {
            const age = Number(event.target.value) || 0;
            setState(s => ({
              ...s,
              person: {
                ...s.person,
                age,
              },
            }));
          }}
        />
      </div>
    </div>
  );
};

export default Person;
