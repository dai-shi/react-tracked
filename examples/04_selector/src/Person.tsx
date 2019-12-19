import React from 'react';

import { useSelector, useDispatch } from './state';

let numRendered = 0;

const Person: React.FC = () => {
  const person = useSelector((state) => state.person);
  const dispatch = useDispatch();
  return (
    <div>
      numRendered: {++numRendered}
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
