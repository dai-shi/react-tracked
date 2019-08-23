import * as React from 'react';
import {
  useReducer,
  useRef,
  useEffect,
} from 'react';

import { createContainer } from 'react-tracked';

const initialState = {
  firstName: 'Harry',
  familyName: 'Potter',
};

type State = typeof initialState;
type Action =
  | { type: 'setFirstName'; firstName: string }
  | { type: 'setFamilyName'; familyName: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.firstName };
    case 'setFamilyName':
      return { ...state, familyName: action.familyName };
    default:
      throw new Error('unexpected action type');
  }
};

const {
  Provider,
  useTracked,
} = createContainer((initState: State) => useReducer(reducer, initState));

const PersonFirstName: React.FC = () => {
  const [state, dispatch] = useTracked();
  const renders = useRef(1);
  useEffect(() => {
    renders.current += 1;
  });
  return (
    <div>
      First Name:
      <input
        value={state.firstName}
        onChange={(event) => {
          dispatch({ type: 'setFirstName', firstName: event.target.value });
        }}
      />
      (renders:{renders.current})
    </div>
  );
};

const PersonFamilyName: React.FC = () => {
  const [state, dispatch] = useTracked();
  const renders = useRef(1);
  useEffect(() => {
    renders.current += 1;
  });
  return (
    <div>
      Family Name:
      <input
        value={state.familyName}
        onChange={(event) => {
          dispatch({ type: 'setFamilyName', familyName: event.target.value });
        }}
      />
      (renders:{renders.current})
    </div>
  );
};

const ReactTracked: React.FC = () => {
  return (
    <Provider initialState={initialState}>
      <PersonFirstName />
      <PersonFamilyName />
    </Provider>
  );
};

export default ReactTracked;
