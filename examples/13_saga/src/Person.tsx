import React from 'react';

import { useTrackedState, useDispatch } from './store';

type Props = {
  id: string;
};

const Person = ({ id }: Props) => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  return (
    <div>
      First Name: {state.firstName}
      {Number(id) > 0 && (
        <button
          type="button"
          onClick={() => dispatch({ type: 'FETCH_USER', id: Number(id) })}
        >
          Fetch User
        </button>
      )}
      {state.firstName && (
        <button
          type="button"
          onClick={() => dispatch({ type: 'CLEAR_USER_NAME' })}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Person;
