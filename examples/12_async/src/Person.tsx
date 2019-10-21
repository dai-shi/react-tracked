import React from 'react';

import { useTrackedState, useDispatch } from './store';

const Person: React.FC = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  return (
    <div>
      {Math.random()}
      <div>
        First Name:
        {state.firstName}
      </div>
      <div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'FETCH_PERSON', id: 3 })}
        >
          Fetch user 3
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'DELAYED_CLEAR' })}
        >
          Clear after 500ms
        </button>
      </div>
    </div>
  );
};

export default Person;
