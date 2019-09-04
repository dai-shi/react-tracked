import * as React from 'react';

import { useTracked } from './state';

const Counter: React.FC<{ firstName: string }> = ({ firstName }) => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      {Math.random()}
      {firstName}
      <div>
        <span>Count: {state.count}</span>
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      </div>
    </div>
  );
};

const Person = () => {
  const [state, dispatch] = useTracked();
  return (
    <div>
      {Math.random()}
      <Counter firstName={state.person.firstName} />
      <div>
        First Name:
        <input
          value={state.person.firstName}
          onChange={(event) => {
            const firstName = event.target.value;
            dispatch({ firstName, type: 'setFirstName' });
          }}
        />
      </div>
      <div>
        Last Name:
        <input
          value={state.person.lastName}
          onChange={(event) => {
            const lastName = event.target.value;
            dispatch({ lastName, type: 'setLastName' });
          }}
        />
      </div>
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
