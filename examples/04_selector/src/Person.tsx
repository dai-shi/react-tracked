import * as React from 'react';

import { useSelector, useDispatch } from 'react-tracked';

import { State, Dispatch } from './state';

const Person = () => {
  const person = useSelector<State, State['person']>(state => state.person);
  const dispatch = useDispatch<Dispatch>();
  return (
    <div>
      {Math.random()}
      <div>
        First Name:
        <input
          value={person.firstName}
          onChange={(event) => {
            const firstName = event.target.value;
            dispatch({ firstName, type: 'setFirstName' });
          }}
        />
      </div>
      <div>
        Last Name:
        <input
          value={person.lastName}
          onChange={(event) => {
            const lastName = event.target.value;
            dispatch({ lastName, type: 'setLastName' });
          }}
        />
      </div>
      <div>
        Age:
        <input
          value={person.age}
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
